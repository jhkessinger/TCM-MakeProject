// Loading canvas through index file
var c = document.getElementById("canvas");
var pullImage = c.getContext("2d");

// Loading images
var baseball = new Image();
var playerTop = new Image();
var playerBottom = new Image();
var stadium = new Image();
var titleScreen = new Image();

baseball.src = "Images/baseball.png";
playerTop.src = "Images/playerTop.png";
playerBottom.src = "Images/playerBottom.png";
stadium.src = "Images/stadium.png";
titleScreen.src = "Images/titleScreen.png";

// Loading audio clips
var air = new Audio();
var pointscored = new Audio();
var lose = new Audio();

air.src = "Sounds/air.mp3";
pointscored.src = "Sounds/pointscored.mp3";
lose.src = "Sounds/lose.mp3";

// These are variables for the ball location and movement
var ballX = 225; // Starting x-coordinate
var ballY = 370; // Starting y-coordinate
var ballDY = 0; // Created for upward movement of ball // Set to zero so the ball does not initially jump
var gravity = 0.1;
var constant;

// Variable for the gap size between the players' gloves
var gap = 120;

// Points variable created for our scoreboard
var points = 0;

// Used in button building
let mainMenuButton;
let startButton;

// Boolean variables used to incorporate our buttons
var gameState = true;
var gameBegin = false;

// Building of buttons
function setup() {
  mainMenuButton = createButton("Main Menu");
  mainMenuButton.position(460, 400);
  mainMenuButton.mousePressed(mainMenu);
  mainMenuButton.hide();
  startButton = createButton("Start");
  startButton.position(485, 360);
  startButton.mousePressed(startGame);
  startButton.hide();
}

// Function created to incorporate the "Start" button
function startGame() {
  gameBegin = true;
}

// Function created to incorporate the "Main Menu" button
// Essentially reloads the server
function mainMenu() {
  location.reload();
}

// Defines the move variable for the ball to move up
// Sound is played each time a key is pressed
function moveUp() {
  ballDY = 3.5;
  air.play();
}

// Array created to set location of moving players
var player = [];

player[0] = {
  x: c.width,
  y: 0,
};

// Main game engine
function drawGame() {
  if (gameBegin === true) {
    startButton.hide();
    if (gameState === true) {
      pullImage.drawImage(stadium, 0, 0);

      // Adds an event handler to an element, calls the event and gives the function
      document.addEventListener("keydown", moveUp); // Any key works to move the ball upwards

      // This for loop is to track the players' location and add new players
      for (var i = 0; i < player.length; i++) {
        constant = playerTop.height + gap; // Incorporating the gap between the gloves
        pullImage.drawImage(playerTop, player[i].x, player[i].y);
        pullImage.drawImage(playerBottom, player[i].x, player[i].y + constant); // Adding the gap leaves space

        player[i].x--;
        // *** We strived to incorporate this code as it was our goal to randomize the distance between each set of players
        // *** Even though we were not success in building this code, we want to show you what we were thinking
        // var rand_coord = Math.floor(Math.random() * (900 - 600 + 1) + 600);
        // console.log("rand_coord: " + rand_coord);

        // if (player[i].x == rand_coord) {
        //   player.push({
        //     x: c.width,
        //     y: Math.floor(Math.random() * playerTop.height) - playerTop.height,
        //   });
        // }

        // Determines the specific x-coordinate of the canvas that the players must cross
        // before drawing a new set of players
        if (player[i].x == 700) {
          player.push({
            x: c.width,
            // Prevents the players from being drawn offscreen
            y: Math.floor(Math.random() * playerTop.height) - playerTop.height,
          });
        }

        // Collision detection
        // If ball height or width touches either the player or the bottom of the canvas then game over
        if (
          (ballX + baseball.width >= player[i].x &&
            ballX <= player[i].x + playerTop.width &&
            (ballY <= player[i].y + playerTop.height ||
              ballY + baseball.height >= player[i].y + constant)) ||
          ballY + baseball.height >= c.height
        ) {
          mainMenuButton.show();
          lose.play();
          gameState = false;
        }

        // Determines the x-coordinate of the canvas that the players must pass before adding
        // additional points to the scoreboard
        if (player[i].x == 175) {
          points = points + 10; // Score increases by 10 when ball passes through each gap
          pointscored.play();
        }
      }

      // Drawing the actual baseball with its intial x & y coordinates
      pullImage.drawImage(baseball, ballX, ballY);

      // Created for downward acceleration
      ballY -= ballDY -= gravity;

      // Created to show a changing scoreboard throughout each game
      pullImage.fillStyle = "#FFF"; // White color
      pullImage.font = "30px BadaBoomBB"; // Font size & Font type
      pullImage.fillText("Score : " + points + " feet", 10, c.height - 20); // Draws the scoreboard with a set location on the canvas
    }

    // This draws the game over menu
    if (gameState === false) {
      pullImage.drawImage(stadium, 0, 0);
      pullImage.fillStyle = "#ee0000";
      pullImage.font = "60px BadaBoomBB";
      pullImage.fillText("GAME OVER", 320, 100);
      pullImage.fillText("Score: " + points + " feet", 335, 360);
    }
  }

  // This draws the main menu when the player loads into the server
  if (gameBegin === false) {
    pullImage.drawImage(titleScreen, 0, 0);
    startButton.show();
  }
}

// This p5 function draws our main game engine
function draw() {
  drawGame();
}
