/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects
// 1. The Factory Function
function GameObject(id) {
  var gameItem = {};
  
  // Use jQuery to extract initial CSS values
  gameItem.id = id;
  gameItem.x = parseFloat($(id).css("left"));
  gameItem.y = parseFloat($(id).css("top"));
  gameItem.width = $(id).width();
  gameItem.height = $(id).height();
  
  // Initialize speeds (can be updated later)
  gameItem.speedX = 0;
  gameItem.speedY = 0;
  
  return gameItem;
}

// 2. Initializing your game objects
var paddleLeft = GameObject("#paddle-left");
var paddleRight = GameObject("#paddle-right");
var ball = GameObject("#ball");

// 3. Example: Setting initial speeds for the ball
ball.speedX = 2;
ball.speedY = 2;


  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('eventType', handleEvent);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    

  }
  
  /* 
  Called in response to events.
  */
  function handleEvent(event) {

  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
