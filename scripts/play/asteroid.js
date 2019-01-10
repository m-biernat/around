// 

var asteroids;

var createAsteroid = function () 
{
    let asteroid = game.add.sprite(game.world.centerX, game.world.centerY, 'asteroid');
    asteroid.anchor.setTo(.5, .5);
    asteroids.add(asteroid);   
}

var generateAsteroids = function()
{
    // Determine number of asteroids
    let numOfAsteroids = 18;

    if (asteroids.countLiving() != numOfAsteroids) 
    {
        let spawnCount = numOfAsteroids - asteroids.countLiving();
        for (let i = 0; i < spawnCount; i++) 
        {    
            createAsteroid();
        }
        console.log(spawnCount);
    }

    // Generate spawn points for them
    let currentAngle = -90, nextAngle = 360 / numOfAsteroids * 2;

    var planetEdge = (planet.width + 15 + 20) / 2;

    for (let i = 0; i < numOfAsteroids; i++) 
    {
        if ( i % 2 == 0)
        currentAngle = Phaser.Math.wrapAngle(currentAngle + nextAngle);

        let radians = Phaser.Math.degToRad(currentAngle);
        
        let currentOrbit = planetEdge + Math.floor(Math.random() * 76);

        let spawnPointX = planet.x + currentOrbit * Math.cos(radians);
        let spawnPointY = planet.y + currentOrbit * Math.sin(radians);

        let asteroid = asteroids.getChildAt(i);
        asteroid.x = spawnPointX;
        asteroid.y = spawnPointY;
        asteroid.angle = currentAngle;
    }



    // Spawn them generating some parameters
    
}
