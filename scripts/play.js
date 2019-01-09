// This contains play state which is responsible for gameplay.

var gameSettings = {
    playerRadius: 25,
    playerSpeed: 1,
    maneuverForce: 1,
    innerOrbitOffset: 0,
    outerOrbitOffset: 75
}

var gameScore = 0;

var playState = {

    create: function()
    {
        // Starting planet creation
        this.planet = game.add.sprite(game.world.centerX, game.world.centerY, "planet");

        this.planet.width = 250;
        this.planet.height = 250;
        this.planet.anchor.setTo(.5,.5);
        this.planet.tint = 0x7F7F7F;

        this.planet.gravity = 0.2;

        // Player creation
        this.player = game.add.sprite(game.world.centerX - (gameSettings.playerRadius / 2), 
        ((game.height - this.planet.height) / 2) - gameSettings.playerRadius, "player");

        this.player.width = gameSettings.playerRadius;
        this.player.height = gameSettings.playerRadius;
        this.player.anchor.setTo(.5,.5);

        this.player.currentAngle = -90;
        this.player.orbitDirection = 0;
        this.player.orbitOffset = 0;

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
        this.player.currentAngle = Phaser.Math.wrapAngle(this.player.currentAngle + gameSettings.playerSpeed);

        var radians = Phaser.Math.degToRad(this.player.currentAngle);

        var planetEdge = (this.planet.width + 15 + gameSettings.playerRadius) / 2;
        var currentOrbit = planetEdge + this.player.orbitOffset;

        this.player.x = this.planet.x + currentOrbit * Math.cos(radians);
        this.player.y = this.planet.y + currentOrbit * Math.sin(radians);

        this.player.angle = this.player.currentAngle;

        if (this.player.orbitDirection != 0) {
            if (this.player.orbitOffset >= gameSettings.innerOrbitOffset 
                && this.player.orbitOffset <= gameSettings.outerOrbitOffset)
            {
                this.player.orbitOffset += (this.player.orbitDirection - this.planet.gravity);
            }

            if (this.player.orbitOffset < 0) {
                this.player.orbitOffset = 0;
                this.player.orbitDirection = 0;
            }
                
            if (this.player.orbitOffset > 75) {
                this.player.orbitOffset = 75;
                this.player.orbitDirection = 0;
            }
        }

        if (this.player.angle == -91) {
            gameScore++;
            console.log(gameScore);
            //game.state.start('lose');
        }
    },

    incOrbit: function() {
        this.player.orbitDirection = gameSettings.maneuverForce;
    },

    decOrbit: function() {
        this.player.orbitDirection = -gameSettings.maneuverForce;
    },

    fixOrbit: function() {
        this.player.orbitDirection = 0;
    }

}
