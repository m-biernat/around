// This file contains menu state.

var menuState = {

    create: function() {
        this.background = game.add.sprite(0, 0, "background");

        this.planet = game.add.sprite(game.world.centerX, game.world.centerY, "planets");
        this.planet.anchor.setTo(.5, .5);
        this.planet.tint = 0x7f1010;
        this.planet.scale.setTo(.5);
        this.planet.alpha = 0;

        game.add.tween(this.planet).to( { alpha: 1 }, 1500, "Linear", true);

        this.logo = game.add.sprite(game.world.centerX, game.world.centerY * 0.8, "logo");
        this.logo.anchor.setTo(.5, .5);
        this.logo.scale.setTo(.5);
        this.logo.alpha = 0;

        game.add.tween(this.logo).to( { alpha: 1 }, 1500, "Linear", true);

        this.playText = game.add.text(game.world.centerX, game.world.centerY * 1.6, 
            "Press [SPACEBAR] to start!", { fill: '#FFF', font: "bold 26px Roboto" });
        this.playText.anchor.setTo(.5);
        this.playText.alpha = 0;

        this.tween = game.add.tween(this.playText).to( { alpha: 1 }, 1000, "Linear", true, 500, -1);
        this.tween.yoyo(true, 2000);

        this.playKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.playKey.onDown.add(this.startGame, this);
    },

    startGame: function() {
        game.state.start('play');
    }

}
