// This is responsible for generating asteroids.

const spawnCount = 12;

var asteroids;

// Creates and setups all astroid at center of the screen and hides them
function createAsteroids() 
{
    for (let i = 0; i < spawnCount; i++) 
    {    
        let asteroid = game.add.sprite(game.world.centerX, game.world.centerY, 'asteroid');
        asteroid.anchor.setTo(.5, .5);
        asteroid.kill();
        asteroids.add(asteroid);
    }
    asteroids.count = 4;
    asteroids.nextPosition = 0;
}

// "Generates" asteroids by changing their parameters
function generateAsteroids()
{
    // Increease number of asteroids
    if (current.level % 3 == 0 && asteroids.count < spawnCount)
        asteroids.count++;

    // Redistribute them around planet
    let currentAngle = -70, nextAngle = 40;
    let positions = generatePositions();

    let currentAsteroid = 0, offsetArr = [];

    for (let i = 0; i < 16; i++) 
    {
        if (i % 2 == 0)
            currentAngle = Phaser.Math.wrapAngle(currentAngle + nextAngle);

        if(positions[currentAsteroid] == i) {
            let asteroid = asteroids.getChildAt(currentAsteroid);

            let angleOffset = Math.floor((Math.random() * 3) - 1);
            let radians = Phaser.Math.degToRad(currentAngle + angleOffset);

            let radius = Math.floor((Math.random() * 11) + 15);

            let planetEdge = (planet.width + 15 + radius) / 2;
            let orbitOffset = Math.floor(Math.random() * (outerOrbitOffset + 1));

            offsetArr.push([currentAngle, orbitOffset, currentAngle + angleOffset]);

            if (currentAsteroid > 0 
                && (currentAngle  == offsetArr[currentAsteroid - 1][0]))
            {
                let prevOffset = offsetArr[currentAsteroid - 1][1];

                let diff = Math.abs(prevOffset - orbitOffset);

                if (diff < radius)
                    orbitOffset = prevOffset + radius;

                if (prevOffset < 15 && orbitOffset > outerOrbitOffset - 15)
                    orbitOffset = outerOrbitOffset;

                if (orbitOffset < 15 && prevOffset > outerOrbitOffset - 15)
                    orbitOffset = innerOrbitOffset;

                if (prevOffset > 20 && prevOffset < outerOrbitOffset - 20 && diff < radius)
                    orbitOffset = prevOffset + radius / 2;
            }

            let currentOffset = planetEdge + orbitOffset;

            let spawnPointX = planet.x + currentOffset * Math.cos(radians);
            let spawnPointY = planet.y + currentOffset * Math.sin(radians);

            let angle = Math.floor((Math.random() * 361) - 180);

            let tint = (Math.random() * 0x181818) + 0x9e9e9e;
            
            asteroid.x = spawnPointX;
            asteroid.y = spawnPointY;
            asteroid.height = radius;
            asteroid.width = radius;
            asteroid.angle = angle;
            asteroid.tint = tint;
            asteroid.revive();

            currentAsteroid++;
        }
    }

    asteroids.positionArr = offsetArr.map(function(elem){ return elem[2] });
}

function generatePositions()
{
    let arr = [];

    if (asteroids.count < 9)
        for (let i = 0; i < 8; i++)
            arr[i] = i * 2;
    else
        for (let i = 0; i < 16; i++)
            arr[i] = i;

    // Fisher–Yates Shuffle
    let i = arr.length, j = 0, temp;
    
    while (i--) 
    {
        j = Math.floor(Math.random() * (i+1));

        // Swap randomly chosen element with current element
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    arr = arr.slice(0, asteroids.count);

    arr.sort((a, b) => a - b);
    return arr;
}
