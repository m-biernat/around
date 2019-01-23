// This is responsible for loading all assets and setting active state to menu.

const planetsCount = 4;
const asteroidsCount = 2;

var highScore;

var loadState = {
    
    preload: function() {
        game.load.image("background", "assets/background.png");
        game.load.image("logo", "assets/logo.png");

        game.load.image("player", "assets/player.png");
        game.load.spritesheet("engine", "assets/engine.png", 250, 250, 3);
        game.load.image("bullet", "assets/bullet.png");
        game.load.spritesheet("asteroids", "assets/asteroids.png", 80, 80, asteroidsCount);
        game.load.spritesheet("planets", "assets/planets.png", 500, 500, planetsCount);
        
        highScore = window.localStorage.getItem('highScore');
        if (!highScore) highScore = 0;
    },

    create: function() {
        game.state.start('menu');
    }

}
