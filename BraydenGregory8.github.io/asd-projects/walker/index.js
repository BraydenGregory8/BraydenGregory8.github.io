/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  // refactoring magic numbers
  const KEY = {
  ENTER: 13,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};


   
  // Game Item Objects
const walker = {
  x : 0,
  y : 0,
  speedX : 0,
  speedY : 0
}

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)

  /* 
  This section is where you set up event listeners for user input.
  For example, if you wanted to handle a click event on the document, you would replace 'eventType' with 'click', and if you wanted to execute a function named 'handleClick', you would replace 'handleEvent' with 'handleClick'.

  Note: You can have multiple event listeners for different types of events.
  */
  $(document).on('keydown', handleKeyDown); 
  $(document).on('keyup', handleKeyUp);                          

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem()
    wallCollisons()
    redrawGameItem()
  }   
  
  /* 
  This section is where you set up the event handlers for user input.
  For example, if you wanted to make an event handler for a click event, you should rename this function to 'handleClick', then write the code that should execute when the click event occurs.
  
  Note: You can have multiple event handlers for different types of events.
  */
  function handleKeyDown(event) {
// console.log(event.which);
if (event.which === KEY.LEFT) {
  console.log("left pressed")
walker.speedX = -5
} else if (event.which === KEY.UP) {
  console.log("up pressed");
  walker.speedY = -5
} else if (event.which === KEY.RIGHT) {
  console.log("right pressed");
  walker.speedX = 5
} else if (event.which === KEY.DOWN) {
  console.log("down pressed");
  walker.speedY = 5
}

  }
  function handleKeyUp(event){
   if (event.which === KEY.LEFT || event.which=== KEY.RIGHT) {
     walker.speedX = 0;
  }
  
  // Check if the released key is the Right Arrow or 'd'
  if (event.which === KEY.UP || event.which === KEY.DOWN) {
    
      walker.speedY = 0;
  }
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
  function repositionGameItem() {
  // Add the horizontal speed to the x-position
   walker.x += walker.speedX;
  
  // Add the vertical speed to the y-position
  walker.y += walker.speedY;
}
function redrawGameItem(){
  // Set the vertical (y) position
  $("#walker").css("top", walker.y )
    // Set the horizontal (x) position
    $("#walker").css("left", walker.x )
    
    console.log("Walker position:", walker.x, walker.y);
  }
 function wallCollisons() {
  if (walker.x + 50 > $("#board").width()||walker.x < 0) {
        walker.x -= walker.speedX; 
    }
   
    if ( walker.y + 50 > $("#board").height() ||walker.y < 0) {
        walker.y -= walker.speedY;
    }
    
 }
 // Select the walker element and add a click event listener
$("#walker").on("click", function() {
    // Generate a random hex color using the provided logic
    var randomColor = "#000000".replace(/0/g, function () { 
        return (~~(Math.random() * 16)).toString(16); 
    });

    // Use jQuery's .css() function to change the color
    $(this).css("background-color", randomColor);
});



}


