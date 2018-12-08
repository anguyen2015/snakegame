/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Config Settings

var snakeX = 2;         // Length of Snake head
var snakeY = 2;         // Length of Snake tail
var height = 30;        // Game Canvas Height
var width = 30;         // Game Canvas Width 
var interval = 100;     // Interval Loops 
var increment = 4;

// Game Variables
var length = 0;
var tailX = [snakeX];   // Head of the Snake
var tailY = [snakeY];   // Tail of the Snake
var fX;
var fY;
var running = false;
var gameOver = false;
var direction = -1; // up = 0, down = -1, left = 1, right = 2
var int;            // Global Variable used to control the interval
var score = 0;
var username = 0;
var hiddenScore = document.getElementById("dbScore");
var hiddenUsername = document.getElementById("dbUsername");


// Function that initiates the run sequence of the snake game
function run(){
  init();
  int = setInterval(gameLoop, interval);
}
// Game Setup
function init(){
  createMap();
  createSnake();
  createFruit();
}


// Creates the canvas map for snake based on the height and width
// provided in the config settings above.
// The "canvas" is actually an html table and the perimeter cells are 
// labeled as the wall, and inner cells are labeled as blank

function createMap(){
  document.write("<table>");

  for( var y = 0; y < height; y++){
    document.write("<tr>");
    for( var x = 0; x < width; x++){
      if(x == 0 || x == width -1 || y == 0 || y == height -1){
        document.write("<td class='wall' id='"+ x + "-" + y +"'></td>");
      }else{
        document.write("<td class='blank' id='"+ x + "-" + y +"'></td>");
      }
    }
    document.write("</tr>");
  }

  document.write("</table>");

}
// Function that is initialized to draw the snake
function createSnake(){
  set(snakeX, snakeY, "snake");
}
// Returns the position of the snake on the map
// This function is overloaded.
function get(x,y){
  return document.getElementById(x+"-"+y); // Head + Body + Tail
}
// Sets the position of the snake on the map
function set(x,y,value){
  if(x != null && y != null)
    get(x,y).setAttribute("class", value);
}
// Random Number Generator to generate a random location for the fruit to spawn
function rand(min,max){
  return Math.floor(Math.random() * (max - min) + min);
}
// Returns the class of the cell of a position in the table
// This function is overloaded!
function getType(x,y){
  return get(x,y).getAttribute("class");
}
// Creates a fruit if it does not exist.
function createFruit(){
  var found = false;
  while(!found && (length < (width-2)*(height-2)+1)){ // If there is no fruit the length of the snake                                                                           
    var fruitX = rand(1,width-1);                     // is still within the map. Spawn a fruit.
    var fruitY = rand(1,height-1);
    if(getType(fruitX, fruitY) == "blank")              // If the fruit spawned on a blank cell
      found = true;                                     // Flip the flag to show a fruit exist.
  }
  set(fruitX, fruitY, "fruit");                         // Sets the fruit on the map
  fX = fruitX;
  fY = fruitY;
}

window.addEventListener("keypress", function key(){
  // The snake cannot move in an opposite direction that it is moving in
  // Hence, the keybindings must not trigger if the user presses a keystroke
  // opposite of the moving direction
  
  var key = event.keyCode;
  //Binds W key to UP (Key 87 W Key, 119 Numpad UP)
  if(direction != -1 && (key == 119 || key == 87))
    direction = 0;

  // Binds S Key DOWN (Key 83 S Key, 115 Numpad DOWN)
  else if(direction != 0 && (key == 115 || key == 83))
    direction = -1;

  //Binds A Key LEFT (Key 65 A Key, 97 Number LEFT)
  else if(direction != 2 && (key == 97 || key == 65))
    direction = 1;

  //if key is D set direction right
  else if(direction != 1 && (key == 100 || key == 68))
    direction = 2;
// Checks to see if the game is still running
  if(!running)
    running = true;
});

function gameLoop(){
  if(running && !gameOver){
    update();
  }else if(gameOver){
    clearInterval(int);
    username = prompt(" You died! \n Your Score was: " + score + 
            " \n Please enter your name and press Submit to send your score!"
        , "Harry Potter");
    document.getElementById("username").innerHTML = "Username: "+ username;
    hiddenUsername.value = username;
  }
}
// Function that updates the game as it progresses.
// This function updates the game cells by location of key objects.
function update(){
  set(fX, fY, "fruit");                             // Sets Fruit position
  updateTail();                                     // Calls Unique function that deals with updating the head and tail position
  set(tailX[length], tailY[length], "blank");       // Sets the position of the head and tail on "blank" class cells
  
  if(direction == 0)                                //If a portion of the snake body is moving up
    snakeY--;                                         // Subtract 1 from the Y Axis
  else if(direction == -1)                            // Snake moving DOWN
    snakeY++;
  else if(direction == 1)                             // Snake moving LEFT
    snakeX--;
  else if(direction == 2)                             // Snake moving RIGHT
    snakeX++;
  set(snakeX, snakeY, "snake");                        // Sets the positions of the body of the snake
  
  for(var i = tailX.length-1; i >=0; i--){              // Collision Detection
    if(snakeX == tailX[i] && snakeY == tailY[i]){       // If head and tail collide
      gameOver = true;
      break;
    }
  }
  if(snakeX == 0 || snakeX == width-1 || snakeY == 0 || snakeY == height-1) // If head and body collide
    gameOver = true;
  else if(snakeX == fX && snakeY == fY){            // If the snake eats a fruit
    score+=4;                                       // Update the score
    createFruit();                                  // Draw a new fruit
    length+=increment;                              // Increase the length of the snake
  }
  document.getElementById("score").innerHTML = "Score: "+ score;
  hiddenScore.value = score;
}
// Update the head and tail position of the snake
function updateTail(){
  for(var i = length; i > 0; i--){
    tailX[i] = tailX[i-1];     // Shifts the 1st position in the head and replaces it with the 2nd
    tailY[i] = tailY[i-1];     // Shifts the 1st position in the tail and replaces it with the 2nd
  }
  tailX[0] = snakeX;           // Sets the former head second position as a body position
  tailY[0] = snakeY;           // Sets the former tail second position as a body position
}

run();
