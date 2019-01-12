// This contains play state which is responsible for gameplay.

var current = {
    level: 1,
    score: 0
}

var playState = {

    create: function()
    {    
        this.background = game.add.sprite(0, 0, "background");

        this.physics.startSystem(Phaser.Physics.ARCADE);

        // First planet creation
        createPlanet()

        // Player creation
        createPlayer();

        asteroids = game.add.physicsGroup();
        createAsteroids();
        generateAsteroids();

        this.levelText = game.add.text(game.world.centerX * 0.2, game.world.centerY * 1.8, 
            "LEVEL", { fill: '#FFFFFF' });
        this.levelText.anchor.setTo(.5, .5);

        this.scoreText = game.add.text(game.world.centerX * 1.8 , game.world.centerY * 1.8, 
            "SCORE", { fill: '#FFFFFF' });
        this.scoreText.anchor.setTo(.5, .5);

        // Keybinds
        this.plusKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.plusKey.onDown.add(this.incOrbit, this);

        this.minusKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.minusKey.onDown.add(this.decOrbit, this);
    },

    update: function() 
    {
        movePlayer();

        game.physics.arcade.collide(player, asteroids, function() { game.state.start('lose'); });

        if (player.angle == asteroids.positionArr[asteroids.nextPosition])
        {
            current.score += current.level;

            asteroids.nextPosition++;

            if(asteroids.nextPosition == asteroids.positionArr.length)
                asteroids.nextPosition = 0;
        }
        
        if (player.angle == -91) 
        {      
            console.log(current.level * asteroids.positionArr.length);
            
            current.level++;
            
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

    /*
    render: function() 
    {
        game.debug.body(player);
        game.debug.physicsGroup(asteroids); 
    }
    */

}
