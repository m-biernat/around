// 

var asteroids;

var createAsteroids = function () 
{
    let spawnCount = 16;
    for (let i = 0; i < spawnCount; i++) 
    {    
        let asteroid = game.add.sprite(game.world.centerX, game.world.centerY, 'asteroid');
        asteroid.anchor.setTo(.5, .5);
        asteroid.visible = false;
        asteroids.add(asteroid);
    }
}

var generateAsteroids = function()
{
    // Determine number of asteroids
    let numOfAsteroids = 0;

    if (current.level <= 50)
        numOfAsteroids = 5 + Math.floor(current.level / 5); 
    else
        numOfAsteroids = 16;

    // Redistribute them around planet
    let currentAngle = -80, nextAngle = 40;
    let positions = generatePositions(numOfAsteroids);
    let currentAsteroid = 0;

    for (let i = 0; i < 16; i++) 
    {
        if (i % 2 == 0)
            currentAngle = Phaser.Math.wrapAngle(currentAngle + nextAngle);

        if(positions[currentAsteroid] == i) {
            let angleOffset = Math.floor((Math.random() * 3) - 1);
            let radians = Phaser.Math.degToRad(currentAngle + angleOffset);
            
            let asteroid = asteroids.getChildAt(currentAsteroid);

            let currentOffset = (planet.width + 15 + 20) / 2 + 
            Math.floor(Math.random() * (outerOrbitOffset + 1));

            let spawnPointX = planet.x + currentOffset * Math.cos(radians);
            let spawnPointY = planet.y + currentOffset * Math.sin(radians);

            let angle = Math.floor((Math.random() * 361) - 180);

            let tint = Math.random() * 0xffffff;

            radius = Math.floor((Math.random() * 5) + 18);
            
            asteroid.x = spawnPointX;
            asteroid.y = spawnPointY;
            asteroid.height = radius;
            asteroid.width = radius;
            asteroid.angle = angle;
            asteroid.tint = tint;
            asteroid.visible = true;

            currentAsteroid++;
        }
    }
}

var generatePositions = function(numOfAsteroids){
    let weightArray = Array.from({length: 16}, () => Math.random());
    
    let indexArray = [];
  
    if (numOfAsteroids < 9)
      for(let i = 0; i < numOfAsteroids; i++)
        indexArray[i] = indexOfMax(weightArray, 2);
    else
      for(let i = 0; i < numOfAsteroids; i++)
        indexArray[i] = indexOfMax(weightArray, 1);
  
    indexArray.sort((a, b) => a - b);
    return indexArray;
}

var indexOfMax = function(arr, inc) {
    let max = arr[0];
    let maxIndex = 0;

    for (let i = 0; i < arr.length; i += inc) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }
    
    arr[maxIndex] = 0;
    return maxIndex;
}
