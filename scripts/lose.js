// This file contains lose state that is activated after player death.

const C_REPLAY_TEXT = "Press [SPACEBAR] to restart!";

var loseState = {

    create: function() {
        this.background = game.add.sprite(0, 0, "background");

        this.replayText = game.add.text(game.world.centerX, game.world.centerY * 1.5, 
            C_REPLAY_TEXT, { fill: '#FFFFFF' });
        this.replayText.anchor.setTo(.5,.5);

        this.replayKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.replayKey.onDown.add(this.restartGame, this);
    },

    restartGame: function() {
        game.state.start('play');
    }

}
