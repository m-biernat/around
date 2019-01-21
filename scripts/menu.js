// This file contains menu state.

var menuState = {

    create: function() {
        this.background = game.add.sprite(0, 0, "background");

        this.gameTitleText = game.add.text(game.world.centerX, game.world.centerY * 0.7, 
            "AROUND", { fill: "#FFF", font: "bold 58px Arial" });
        this.gameTitleText.anchor.setTo(.5);

        this.playText = game.add.text(game.world.centerX, game.world.centerY * 1.5, 
            "Press [SPACEBAR] to start!", { fill: '#FFF' });
        this.playText.anchor.setTo(.5);
        this.playText.alpha = 0;

        this.tween = game.add.tween(this.playText).to( { alpha: 1 }, 1000, "Linear", true, 0, -1);
        this.tween.yoyo(true, 2000);

        this.playKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.playKey.onDown.add(this.startGame, this);
    },

    startGame: function() {
        game.state.start('play');
    }

}
