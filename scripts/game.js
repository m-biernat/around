// This file contains game container, config and states.

var gameConfig = {
    width: 600,
    height: 600,
    renderer: Phaser.CANVAS,
    parent: 'game'
}

var game = new Phaser.Game(gameConfig);

game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('lose', loseState);

game.state.start('load');
