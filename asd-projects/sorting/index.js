/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////

// TODO 2: Implement bubbleSort
async function bubbleSort(array) {
  // iterate over the array from i = 0 to i = length - 1
  for (let i = 0; i < array.length - 1; i++) {
    // iterate over the array from j = length - 1 to j = i + 1
    for (let j = array.length - 1; j > i; j--) {
      // Compare the .value property of the elements
      if (array[j].value < array[j - 1].value) {
        // Swap the elements using the swap function created earlier
        swap(array, j, j - 1);
        
        // Update the visual counter and pause for the animation
        updateCounter(bubbleCounter);
        await sleep();
      }
    }
  }
}

// TODO 3: Implement quickSort


// TODOs 4 & 5: Implement partition


// TODO 1: Implement swap
function swap(array, i, j) {
  // Step 1: Swap elements using a temporary variable
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;

  // Step 2: Call the helper function to visualize the swap
  drawSwap(array, i, j);
}


///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
///////////////////////////////////////////////////////////////////////

//////////////////////////// HELPER FUNCTIONS /////////////////////////

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function sleep(){
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j){
    let element1 = array[i];
    let element2 = array[j];

    let temp = parseFloat($(element1.id).css("top")) + "px";

    $(element1.id).css("top", parseFloat($(element2.id).css("top")) + "px");
    $(element2.id).css("top", temp);
}

// This function updates the specified counter
function updateCounter(counter){
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}