// This file contains menu state.

const C_PLAY_TEXT = "Press [SPACEBAR] to start!";

var menuState = {

    create: function() {
        this.playText = game.add.text(game.world.centerX, game.world.centerY * 1.5, 
            C_PLAY_TEXT, { fill: '#FFFFFF' });
        this.playText.anchor.setTo(.5,.5);

        this.playKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.playKey.onDown.add(this.startGame, this);
    },

    startGame: function() {
        game.state.start('play');
    }

}
