// This is responsible for player object.

const playerSize = 25;

var player;

function createPlayer() 
{
    player = game.add.sprite(game.world.centerX - (playerSize / 2), 
    ((game.height - planet.height) / 2) - playerSize, "player");
    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.width = playerSize;
    player.height = playerSize;
    player.anchor.setTo(.5,.5);

    player.speed = 1;
    player.currentAngle = -90;
    player.maneuverForce = 3.25;
    player.orbitOffset = outerOrbitOffset / 2;
    player.orbitDirection = 0;
}

function movePlayer() 
{
    if (player.orbitDirection != 0) {
        if (player.orbitOffset >= innerOrbitOffset 
            && player.orbitOffset <= outerOrbitOffset)
        {
            player.orbitOffset += player.orbitDirection > 0 ? 
            (player.orbitDirection - planet.gravity):
            (player.orbitDirection + planet.gravity);
        }

        if (player.orbitOffset < 0) {
            player.orbitOffset = 0;
            player.orbitDirection = 0;
        }
            
        if (player.orbitOffset > 75) {
            player.orbitOffset = 75;
            player.orbitDirection = 0;
        }
    }
    
    player.currentAngle = Phaser.Math.wrapAngle(player.currentAngle + player.speed);

    let radians = Phaser.Math.degToRad(player.currentAngle);

    let planetEdge = (planet.width + 15 + playerSize) / 2;
    let currentOrbit = planetEdge + player.orbitOffset;

    player.x = planet.x + currentOrbit * Math.cos(radians);
    player.y = planet.y + currentOrbit * Math.sin(radians);

    player.angle = player.currentAngle;
}
