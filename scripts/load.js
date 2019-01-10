// This is responsible for loading all assets and setting active state to menu.

var loadState = {
    
    preload: function() {
        game.load.image("player", "assets/player.png");
        game.load.spritesheet("planets", "assets/planets.png", 500, 500, 5);
        game.load.image("planet", "assets/planet.png");
    },

    create: function() {
        game.state.start('menu');
    }

}
