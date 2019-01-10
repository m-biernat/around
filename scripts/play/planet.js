// 

const innerOrbitOffset = 0, outerOrbitOffset = 75;

var planet = {

    create: function() 
    {
        planet = game.add.sprite(game.world.centerX, game.world.centerY, "planet");

        // Between [200;350]
        planet.width = 250;
        planet.height = 250;
        planet.anchor.setTo(.5,.5);
        planet.tint = 0x4286f4;

        planet.gravity = 0.25;
    }

}

var generatePlanet = function() 
{
    // Sprite selection

    // Tint generation
    let tint = Math.random() * 0xffffff;

    // Size generation
    let radius = 0, minRadius = 200, maxRadius = 151;

    if (current.level <= 100) {
        radius = Math.floor((Math.random() * (50 + current.level)) + minRadius);
    }
    else {
        radius = Math.floor((Math.random() * maxRadius) + minRadius);
    }

    // Gravity based on size
    let gravity = radius * 0.001;

    console.log("Generate!");
    console.log("R: " + radius + " G: " + gravity);
    
    planet.tint = tint;
    planet.height = radius;
    planet.width = radius;
    planet.gravity = gravity;
}