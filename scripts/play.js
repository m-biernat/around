// This contains play state which is responsible for gameplay.

var current = {
    level: 1,
    score: 0
}

var playState = {

    create: function()
    {
        this.background = game.add.sprite(0, 0, "background");

        // First planet creation
        planet.create();

        // Player creation
        player.create();

        asteroids = game.add.physicsGroup();
        createAsteroids();
        generateAsteroids();

        // Keybinds
        this.plusKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.plusKey.onDown.add(this.incOrbit, this);

        this.minusKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.minusKey.onDown.add(this.decOrbit, this);

        this.zeroKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
        this.zeroKey.onDown.add(this.fixOrbit, this);
    },

    update: function() 
    {
        if (player.orbitDirection != 0) {
            if (player.orbitOffset >= innerOrbitOffset 
                && player.orbitOffset <= outerOrbitOffset)
            {
                player.orbitOffset += (player.orbitDirection - planet.gravity);
            }

            if (player.orbitOffset < 0) {
                player.orbitOffset = 0;
                player.orbitDirection = 0;
            }
                
            if (player.orbitOffset > 75) {
                player.orbitOffset = 75;
                player.orbitDirection = 0;
            }
        }
        
        player.currentAngle = Phaser.Math.wrapAngle(player.currentAngle + player.speed);

        var radians = Phaser.Math.degToRad(player.currentAngle);

        var planetEdge = (planet.width + 15 + playerSize) / 2;
        var currentOrbit = planetEdge + player.orbitOffset;

        player.x = planet.x + currentOrbit * Math.cos(radians);
        player.y = planet.y + currentOrbit * Math.sin(radians);

        player.angle = player.currentAngle;
        
        if (player.angle == -91) {
            current.level++;
            console.log(current.level + " " + current.score);
            generatePlanet();

            generateAsteroids();
            //game.state.start('lose');
        }
    },

    incOrbit: function() {
        player.orbitDirection = player.maneuverForce;
    },

    decOrbit: function() {
        player.orbitDirection = -player.maneuverForce;
    },

    fixOrbit: function() {
        player.orbitDirection = 0;
    }

}
