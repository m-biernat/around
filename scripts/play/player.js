// This is responsible for player object.

const playerSize = 25;

var player = {

    create: function() 
    {
        player = game.add.sprite(game.world.centerX - (playerSize / 2), 
        ((game.height - planet.height) / 2) - playerSize, "player");

        player.width = playerSize;
        player.height = playerSize;
        player.anchor.setTo(.5,.5);

        player.speed = 1;
        player.currentAngle = -90;
        player.maneuverForce = 1.5;
        player.orbitOffset = outerOrbitOffset / 2;
        player.orbitDirection = 0;
    }

}
