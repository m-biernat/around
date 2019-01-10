// This file contains planet object and planet generation method.

const innerOrbitOffset = 0, outerOrbitOffset = 75;

var planet = {

    create: function() 
    {
        planet = game.add.sprite(game.world.centerX, game.world.centerY, "planets");

        planet.width = 250;
        planet.height = 250;
        planet.anchor.setTo(.5,.5);
        planet.tint = 0x4286f4;

        planet.gravity = 0.25;
    }

}

var generatePlanet = function() 
{
    // Frame selection from spritesheet
    let frame = Math.floor((Math.random() * (planetsCount + 1)));

    // Generating angle of rotation
    let angle = Math.floor((Math.random() * 361) - 180);

    // Generating tint value
    let tint = Math.random() * 0xffffff;

    // Size generation form [200;350]
    let radius = 0, minRadius = 200, maxRadius = 151;

    // [200;250] at start increasing every level to make wider range
    if (current.level <= 100)
        radius = Math.floor((Math.random() * (50 + current.level)) + minRadius);
    else
        radius = Math.floor((Math.random() * maxRadius) + minRadius);

    // Setting gravity based on radius
    let gravity = radius * 0.001;
    
    // Applying generated values to the planet
    planet.frame = frame;
    planet.angle = angle;
    planet.tint = tint;
    planet.height = radius;
    planet.width = radius;
    planet.gravity = gravity;
}