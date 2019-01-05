// This is responsible for loading all assets and setting active state to menu.

var loadState = {
    
    preload: function() {
        game.load.image("player", "assets/player.png");
        game.load.image("planet", "assets/planet.png");
    },

    create: function() {
        game.state.start('menu');
    }

}
