// This file contains lose state that is activated after player death.

const REPLAY_TEXT = "Press [SPACEBAR] to restart!";

var loseState = {

    create: function() {
        this.background = game.add.sprite(0, 0, "background");

        this.gameOverText = game.add.text(game.world.centerX, game.world.centerY * .5, 
            "Game Over!", { fill: "#FFF", font: "bold 48px Arial" });
        this.gameOverText.anchor.setTo(.5);

        this.scoreText = game.add.text(game.world.centerX, game.world.centerY * .8, 
            "Score", { fill: "#FFF", font: "24px Arial" });
        this.scoreText.anchor.setTo(.5);

        this.lastScoreText = game.add.text(game.world.centerX * .8, game.world.centerY, 
            "LAST:", { fill: "#FFF", font: "22px Arial" });
        this.lastScoreText.anchor.setTo(.5);

        this.lastScore = game.add.text(game.world.centerX * 1.1, game.world.centerY, 
            "999999", { fill: "#FFF", font: "bold 28px Arial" });
        this.lastScore.anchor.setTo(.5);

        this.highScoreText = game.add.text(game.world.centerX * .8, game.world.centerY * 1.2, 
            "HIGH:", { fill: "#FFF", font: "22px Arial" });
        this.highScoreText.anchor.setTo(.5);

        this.highScore = game.add.text(game.world.centerX * 1.1, game.world.centerY * 1.2, 
            "999999", { fill: "#FFF", font: "bold 28px Arial" });
        this.highScore.anchor.setTo(.5);

        this.gameScore();

        this.replayText = game.add.text(game.world.centerX, game.world.centerY * 1.5, 
            REPLAY_TEXT, { fill: '#FFF', font: "bold 26px Arial" });
        this.replayText.anchor.setTo(.5);
        this.replayText.alpha = 0;

        this.tween = game.add.tween(this.replayText).to( { alpha: 1 }, 1000, "Linear", true, 0, -1);
        this.tween.yoyo(true, 2000);

        this.replayKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.replayKey.onDown.add(this.restartGame, this);
    },

    restartGame: function() {
        current.level = 1;
        current.score = 0;
        current.ammo = 1;
        game.state.start('play');
    },

    gameScore: function() {
        if (current.score > highScore)
        {
            highScore = current.score;
            window.localStorage.setItem('highScore', highScore);
            this.scoreText.setText("NEW RECORD!");
            this.scoreText.addColor("#ffd700", 0);
            this.highScore.addColor("#ffd700", 0);
        }
        this.lastScore.setText(current.score)
        this.highScore.setText(highScore);
    }

}
