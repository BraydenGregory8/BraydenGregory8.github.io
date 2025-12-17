var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    function createSawBlade(x, y) {
      var hitZoneSize = 25;
      var damageFromObstacle = 10;
      var sawBladeHitZone = game.createObstacle(
        hitZoneSize,
        damageFromObstacle
      );
      sawBladeHitZone.x = x;
      sawBladeHitZone.y = y;
      game.addGameItem(sawBladeHitZone);
      var obstacleImage = draw.bitmap("img/sawblade.png");
      sawBladeHitZone.addChild(obstacleImage);
      obstacleImage.x = -24;
      obstacleImage.y = -27;
    }
    createSawBlade(800, 200);
    createSawBlade(900, 270);
    createSawBlade(870, 250);
    function createEnemy(x, y) {
      var enemy = game.createGameItem("enemy", 25);
      var redSquare = draw.rect(50, 50, "purple");
      redSquare.x = -25;
      redSquare.y = -25;
      enemy.addChild(redSquare);
      enemy.x = x;
      enemy.y = y;
      game.addGameItem(enemy);
      enemy.rotationalVelocity = 200;
      enemy.velocityX = -1;
      enemy.onPlayerCollision = function () {
        game.changeIntegrity(-50);
      };
      enemy.onProjectileCollision = function () {
        game.increaseScore(100);
        enemy.shrink();
      };
    }
    createEnemy(400, groundY - 60);
    createEnemy(800, groundY - 60);
    createEnemy(1200, groundY - 60);

    function createReward(x, y) {
      var reward = game.createGameItem("reward", 25);
      var rose = draw.rect(50, 50, "gold");
      rose.x = -25;
      rose.y = -25;
      reward.addChild(rose);
      reward.x = x;
      reward.y = y;
      game.addGameItem(reward);
      reward.rotationalVelocity = 200;
      reward.velocityX = -0.8;
      reward.onPlayerCollision = function () {
        game.changeIntegrity(+50);
      };
      reward.onProjectileCollision = function () {
        game.increaseScore(100);
        reward.shrink();
      };
    }
    createReward(500, groundY - 60);
    
    function createMarker(x, y) {
      var reward = game.createGameItem("reward", 25);
      var lyre = draw.rect(50, 50, "green");
      lyre.x = -25;
      lyre.y = -25;
      reward.addChild(lyre);
      reward.x = x;
      reward.y = y;
      game.addGameItem(reward);
      reward.rotationalVelocity = 0.6;
      reward.velocityX = -0.5;
      reward.onPlayerCollision = function () {
        startLevel();
      };
      reward.onProjectileCollision = function () {
        startLevel();
        
      };
    }
    
    

    function startLevel() {
      // TODO 13 goes below here
      var level = levelData[currentLevel];
      var levelObjects = level.gameItems;
      for(var i = 0 ; i < levelObjects.length; i++){
        var eachObject = levelObjects[i];
        eachObject.X
        eachObject.Y;
        if(eachObject.type === "sawBlade"){
          createSawBlade(eachObject.X, eachObject.Y);
        } else if (eachObject.type === "enemy") {
          createEnemy(eachObject.X, eachObject.Y);
        } else if (eachObject.type === "reward") {
          createReward(eachObject.X, eachObject.Y);
        } else if (eachObject.type === "marker") {
          createMarker(eachObject.X, eachObject.Y);
        }
      }
      

      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
