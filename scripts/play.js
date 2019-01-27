// This contains play state which is responsible for gameplay.

var current = {
    level: 1,
    score: 0,
    ammo: 1
}

var playState = {

    create: function()
    {    
        this.background = game.add.sprite(0, 0, "background");

        this.physics.startSystem(Phaser.Physics.ARCADE);

        // First planet creation
        createPlanet();
        generatePlanet();

        // Player creation
        createPlayer();

        asteroids = game.add.physicsGroup();
        createAsteroids();
        generateAsteroids();

        // UI
        this.levelLabel = game.add.text(game.world.centerX * 0.2, game.world.centerY * 1.75, 
            "LEVEL", { fill: '#fff', font: "18px Roboto" });
        this.levelLabel.anchor.setTo(.5);

        this.levelText = game.add.text(game.world.centerX * 0.2, game.world.centerY * 1.85, 
            "999", { fill: '#fff', font: "bold 26px Roboto" });
        this.levelText.anchor.setTo(.5);

        this.scoreLabel = game.add.text(game.world.centerX * 1.8 , game.world.centerY * 1.75, 
            "SCORE", { fill: '#fff', font: "18px Roboto" });
        this.scoreLabel.anchor.setTo(.5);

        this.scoreText = game.add.text(game.world.centerX * 1.8 , game.world.centerY * 1.85, 
            "999999", { fill: '#fff', font: "bold 26px Roboto" });
        this.scoreText.anchor.setTo(.5);

        // Keybinds
        this.plusKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.plusKey.onDown.add(this.incOrbit, this);

        this.minusKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.minusKey.onDown.add(this.decOrbit, this);

        this.fireKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.fireKey.onDown.add(this.fire, this);
    },

    update: function() 
    {
        movePlayer();

        game.physics.arcade.overlap(player, asteroids, this.playerHit);
        game.physics.arcade.overlap(player.weapon.bullets, asteroids, this.asteroidHit);

        let pos = asteroids.positionArr[asteroids.nextPosition];

        if (pos - 1 < player.angle && pos + 1 > player.angle )
        {
            current.score += current.level;
            asteroids.nextPosition++;

            if(asteroids.nextPosition == asteroids.positionArr.length)
                asteroids.nextPosition = 0;
            else
                if (pos == asteroids.positionArr[asteroids.nextPosition])
                {
                    current.score += current.level;
                    asteroids.nextPosition++;
                }
        }
        
        if (player.angle == -91) 
        {
            current.level++;
            current.ammo = 1;

            game.camera.flash(0x232d3e, 250);

            generatePlanet();
            generateAsteroids();      
        }

        this.levelText.setText(current.level);
        this.scoreText.setText(current.score);
    },

    incOrbit: function() {
        player.orbitDirection = player.maneuverForce; 
    },

    decOrbit: function() {
        player.orbitDirection = -player.maneuverForce;
    },

    fire: function() {
        if (current.ammo > 0)
        {
            player.weapon.fireAngle = player.angle + 90;
            player.weapon.fire();
            current.ammo--;
        }
    },

    playerHit: function() {
        game.state.start('lose');
    },

    asteroidHit: function(player, obstacle) {
        current.score += current.level;
        obstacle.kill();
    },

    /*
    render: function() 
    {
        game.debug.body(player);
        game.debug.physicsGroup(asteroids); 
    }
    */

}
