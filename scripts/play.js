// This contains play state which is responsible for gameplay.

var gameSettings = {
    playerRadius: 25,
    planetRadius: 250,
    playerSpeed: 1,
    planetGravity: 0.9,
    jumpForce: [10, 8]
}

var playState = {

    create: function() {
        this.planet = game.add.sprite(game.world.centerX, game.world.centerY, "planet");

        this.planet.width = gameSettings.planetRadius;
        this.planet.height = gameSettings.planetRadius;
        this.planet.anchor.setTo(.5,.5);

        this.planet.tint = 0x7F7F7F;

        this.player = game.add.sprite(game.world.centerX - (gameSettings.playerRadius / 2), 
        ((game.height - gameSettings.planetRadius) / 2) - gameSettings.playerRadius, "player");

        this.player.width = gameSettings.playerRadius;
        this.player.height = gameSettings.playerRadius;
        this.player.anchor.setTo(.5,.5);

        this.player.currentAngle = -90;
        this.player.jumpOffset = 0;
        this.player.jumps = 0;
        this.player.jumpForce = 0;

        this.jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.jumpKey.onDown.add(this.jump, this);
    },

    update: function() {
        if (this.player.jumps > 0) {
            this.player.jumpOffset += this.player.jumpForce;
            this.player.jumpForce -= gameSettings.planetGravity;

            if (this.player.jumpOffset < 0) {
                this.player.jumpOffset = 0;
                this.player.jumps = 0;
                this.player.jumpForce = 0;
            }
        }

        this.player.currentAngle = Phaser.Math.wrapAngle(this.player.currentAngle + gameSettings.playerSpeed);

        var radians = Phaser.Math.degToRad(this.player.currentAngle);

        var distanceFromCenter = (gameSettings.planetRadius + gameSettings.playerRadius) / 2 + this.player.jumpOffset;

        this.player.x = this.planet.x + distanceFromCenter * Math.cos(radians);
        this.player.y = this.planet.y + distanceFromCenter * Math.sin(radians);

        this.player.angle = this.player.currentAngle;

        if (this.player.x < 100) {
            game.state.start('lose');
        }
    },

    jump: function() {
        if (this.player.jumps < 2) {
            this.player.jumps ++;
            this.player.jumpForce = gameSettings.jumpForce[this.player.jumps - 1];
        }
    }

}
