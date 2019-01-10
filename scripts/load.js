// This is responsible for loading all assets and setting active state to menu.

const planetsCount = 2;

var loadState = {
    
    preload: function() {
        game.load.image("player", "assets/player.png");
        game.load.image("asteroid", "assets/asteroid.png");
        game.load.spritesheet("planets", "assets/planets.png", 500, 500, planetsCount);
    },

    create: function() {
        game.state.start('menu');
    }

}
