var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function (game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1,
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY-50 },
                { "type": "sawblade", "x": 600, "y": groundY-50 },
                { "type": "sawblade", "x": 900, "y": groundY-50 },
                { "type": "reward", "x": 2000, "y": groundY - 60 },

            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        var hitZoneSize = 25;
        var damageFromObstacle = 10;
        var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);

// sawblade
        sawBladeHitZone.x = 400;
        sawBladeHitZone.y = 250;
        game.addGameItem(sawBladeHitZone);
        var obstacleImage = draw.bitmap('img/sawblade.png');
        obstacleImage.x = -25;
        obstacleImage.y = -25;
        sawBladeHitZone.addChild(obstacleImage);



        function createEnemy(x, y) {

            var astro = game.createGameItem('enemy', 25);
            var redHitBox = draw.bitmap("img/astronaught.png");
            redHitBox.x = -55;
            redHitBox.y = -55;
            astro.addChild(redHitBox);
            astro.x = x;
            astro.y = y;
            game.addGameItem(astro);
            astro.velocityX = -1;
            

            astro.onPlayerCollision = function () {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-10);
                astro.fadeOut();
            };
            astro.onProjectileCollision = function () {
                console.log("Halle has hit enemy")
                game.increaseScore(100);



            };





        }
        function createSawBlade(xpos, ypos) {
            var Hitbox = game.createObstacle(hitZoneSize, damageFromObstacle);
            Hitbox.x = xpos;
            Hitbox.y = ypos;
            game.addGameItem(Hitbox);
            var Image = draw.bitmap("img/sawblade.png");
            Image.x = -25;
            Image.y = -25;
            Hitbox.addChild(Image);

        }
 //
        function createRocket(x, y) {
            var hitBox = game.createObstacle(20, 50);
            hitBox.x = x;
            hitBox.y = y;
            game.addGameItem(hitBox);
            var Image = draw.bitmap("img/Rocketleft.png");
            Image.x = -25;
            Image.y = -25;

            hitBox.addChild(Image);
        }
        ////// Code for reward
        function createReward(x,y)
        {
        var gameobject = game.createGameItem('reward', 25);
        var yellowhitbox = draw.bitmap("img/bell.png");
        gameobject.x = x;
        gameobject.y = y;
        gameobject.addChild(yellowhitbox);
        yellowhitbox.x = -25;
        yellowhitbox.y = -25;
        game.addGameItem(gameobject);
        gameobject.velocityX = -1;
        

        gameobject.onPlayerCollision = function () {
            game.increaseScore(999999);
            gameobject.shrink();
        };
    }





        /// code for enemy
        var enemy = game.createGameItem('enemy', 25);
        var redSquare = draw.rect(50, 50, 'red');
        redSquare.x = -25;
        redSquare.y = -25;
        enemy.addChild(redSquare);
        enemy.x = 900;
        enemy.y = groundY - 50;
        game.addGameItem(enemy);
        enemy.velocityX = -1;
        enemy.rotationalVelocity = 10;

        enemy.onPlayerCollision = function () {
            console.log('The enemy has hit Halle');
            game.changeIntegrity(-10);
            enemy.fadeOut();
        };
        enemy.onProjectileCollision = function () {
            console.log("Halle has hit enemy")
            game.increaseScore(100);



        };
// brain tumor
        for (var i = 0; i < levelData.gameItems.length; i++) {
            var whereAt = levelData.gameItems[i];
             var whereAtX =whereAt.x; 
            var whereAtY = whereAt.y;
            var whereAtType = whereAt.type;
            if (whereAtType === "sawblade")
            {
                createSawBlade(whereAtX,whereAtY);
            }
            else if (whereAtType === "reward")
            {
                createReward(whereAtX,whereAtY);
            }
        }


        createSawBlade(300, groundY - 50);
        createSawBlade(1000, groundY - 50);
        createSawBlade(1500, groundY - 50);
        createSawBlade(2000, groundY - 30);
        createRocket(2400, groundY - 50);
        createEnemy(2900, groundY - 50);
        
        createReward(500, groundY - 50);



        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if ((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
