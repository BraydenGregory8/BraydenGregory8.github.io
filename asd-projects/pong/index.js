/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const BOARD_WIDTH = $("#board").width();
const BOARD_HEIGHT = $("#board").height();
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var score1 = 0;
var score2 = 0;

  var key = {
 w: 87,
 s: 83,
 up: 38,
 down: 40

  }
  
  
  // Game Item Objects
// 1. The Factory Function
function GameItem(id) {
  var item = {};
  
  // Link the HTML ID
  item.id = id;
  
  // Extract numerical values from CSS using jQuery
  item.x = parseFloat($(id).css("left"));
  item.y = parseFloat($(id).css("top"));
  item.width = $(id).width();
  item.height = $(id).height();
  
  // Initialize speeds (can be set to 0 or randomized later)
  item.speedX = 0;
  item.speedY = 0;
  
  return item;
}

// 2. Initialization
var ball = GameItem("#ball");
var paddleLeft = GameItem("#paddleLeft");
var paddleRight = GameItem("#paddleRight");

// 3. Set starting speeds manually
ball.speedX = 5;
ball.speedY = 5;


  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
                        
  $(document).on('keydown', handleEvent); // Listen for keys being pressed
  $(document).on('keyup', handleEvent);   // Listen for keys being released
  startBall();
  
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    // Update ball position data
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Draw the ball in the new location
    $(ball.id).css("left", ball.x);
    $(ball.id).css("top", ball.y);
  moveObject(ball);
  moveObject(paddleLeft);
  moveObject(paddleRight);
 wallCollision(ball);
  wallCollision(paddleLeft);
  wallCollision(paddleRight);
  if (doCollide(ball, paddleLeft)) {
    ball.speedX *= -1; // Reverse horizontal direction
    ball.x = paddleLeft.x + paddleLeft.width; // Snap ball to front of paddle
  }

  if (doCollide(ball, paddleRight)) {
    ball.speedX *= -1; // Reverse horizontal direction
    ball.x = paddleRight.x - ball.width; // Snap ball to front of paddle
  }
  }
  
  /* 
  Called in response to events.
  */

  function handleEvent(event) {
    var keycode = event.which;
    var type = event.type; // This will be 'keydown' or 'keyup'

    if (type === 'keydown') {
      // Left Paddle
      if (keycode === key.w) { paddleLeft.speedY = -5; }      // W
      else if (keycode === key.s) { paddleLeft.speedY = 5; }  // S

      // Right Paddle
      if (keycode === key.up) { paddleRight.speedY = -5; }     // Up
      else if (keycode === key.down) { paddleRight.speedY = 5; } // Down
    } 
    else if (type === 'keyup') {
      // Stop Left Paddle
      if (keycode === key.w || keycode === key.s) { paddleLeft.speedY = 0; }
      
      // Stop Right Paddle
      if (keycode === key.up || keycode === key.down) { paddleRight.speedY = 0; }
    }
  }

  

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);
    alert("Game Over")
    // turn off event handlers
    $(document).off();
  }

    function startBall() {
    // 1. Center the ball on the board
    
    ball.x = 390; 
    ball.y = 190;
    
    // 2. Generate random starting speeds
    // speedX will be between 2-5 or -2 to -5
    ball.speedX = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    // speedY can be any random speed between -5 and 5
    ball.speedY = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
   checkScore(score1,score2) 
  }

function moveObject(obj) {
  // Update the data positions based on speed
  obj.x += obj.speedX;
  obj.y += obj.speedY;

  // Use the ID stored in the object to update the CSS
  $(obj.id).css("left", obj.x);
  $(obj.id).css("top", obj.y);
} ball.x = BOARD_WIDTH / 2;
  ball.y = BOARD_HEIGHT / 2;
  ball.speedX = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
  ball.speedY = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
function wallCollision(obj) {
  // Top Wall (Y is 0)
  if (obj.y < 0) {
    obj.y = 0;
    // If it's the ball, make it bounce!
    if (obj.id === "#ball") { obj.speedY *= -1; }
  } 
  // Bottom Wall (Y + height reaches BOARD_HEIGHT)
  else if (obj.y + obj.height > BOARD_HEIGHT) {
    obj.y = BOARD_HEIGHT - obj.height;
    if (obj.id === "#ball") { obj.speedY *= -1; }
  }

  // Left and Right walls (Mainly for the ball)
  if (obj.x < 0) {
    // Ball hit left wall: Player 2 scores!
    obj.x = 0;
    if (obj.id === "#ball") { 
      // You could call a score function here
      startBall(); 
    }
  } 


  else if (obj.x + obj.width > BOARD_WIDTH) {
    // Ball hit right wall: Player 1 scores!
    obj.x = BOARD_WIDTH - obj.width;
    if (obj.id === "#ball") { 
      // You could call a score function here
      startBall(); 
    }
  }
}

function wallCollision(obj) {
  // Top and Bottom Wall Bounce
  if (obj.y < 0) {
    obj.y = 0;
    if (obj.id === "#ball") { obj.speedY *= -1; }
  } 
  else if (obj.y + obj.height > BOARD_HEIGHT) {
    obj.y = BOARD_HEIGHT - obj.height;
    if (obj.id === "#ball") { obj.speedY *= -1; }
  }

  // LEFT WALL - Player 2 Scores
  if (obj.x < 0) {
    score2++;                        // Update memory
    $("#score2").text(score2);       // Update HTML
    startBall();                     // Reset ball
  } 
  // RIGHT WALL - Player 1 Scores
  else if (obj.x + obj.width > BOARD_WIDTH) {
    score1++;                        // Update memory
    $("#score1").text(score1);       // Update HTML
    startBall();                     // Reset ball
  }
  
}
function doCollide(obj1, obj2) {
  // Calculate edges of object 1
  obj1.left = obj1.x;
  obj1.right = obj1.x + obj1.width;
  obj1.top = obj1.y;
  obj1.bottom = obj1.y + obj1.height;

  // Calculate edges of object 2
  obj2.left = obj2.x;
  obj2.right = obj2.x + obj2.width;
  obj2.top = obj2.y;
  obj2.bottom = obj2.y + obj2.height;

  // Check for overlap
  if (obj1.right > obj2.left &&
      obj1.left < obj2.right &&
      obj1.bottom > obj2.top &&
      obj1.top < obj2.bottom) {
    return true;
  } else {
    return false;
  }
}

function checkScore(score1, score2) {
  const pointsToWin = 10; 
  if (score1 >= pointsToWin || score2 >= pointsToWin) {
    endGame();
  }
}


}
