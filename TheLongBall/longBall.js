// Loading canvas through index file
var c = document.getElementById("canvas");
var pullImage = c.getContext("2d");

// Loading images
var baseball = new Image();
var playerTop = new Image();
var playerBottom = new Image();
var stadium = new Image();

baseball.src = "Images/baseball.png";
playerTop.src = "Images/playerTop.png";
playerBottom.src = "Images/playerBottom.png";
stadium.src = "Images/stadium.png";

// Loading audio clips
var air = new Audio();
var pointscored = new Audio();

air.src = "Sounds/air.mp3";
pointscored.src = "Sounds/pointscored.mp3";

// These are variables for the ball, players, and movement
var ballX = 225; // Starting x-coordinate
var ballY = 370; // Starting y-coordinate
var gravity = 2;
var constant;
var gap = 100;

// Defines the move variable for the ball to move up
document.addEventListener("keydown", moveUp); //any key works

// Adds an event handler to an element, calls the event and gives the function
function moveUp() {
  ballY -= 35;
  air.play();
}

// Player coordinates
var player = [];

player[0] = {
  x: c.width,
  y: 0,
};

function draw() {
  pullImage.drawImage(stadium, 0, 0);

  for (var i = 0; i < player.length; i++) {
    constant = playerTop.height + gap;
    pullImage.drawImage(playerTop, player[i].x, player[i].y);
    pullImage.drawImage(playerBottom, player[i].x, player[i].y + constant);

    player[i].x--;

    if (player[i].x == 125) {
      player.push({
        x: c.width,
        y: Math.floor(Math.random() * playerTop.height) - playerTop.height,
      });
    }

    // Collision detection
    if (
      (ballX + baseball.width >= player[i].x &&
        ballX <= player[i].x + playerTop.width &&
        (ballY <= player[i].y + playerTop.height ||
          ballY + baseball.height >= player[i].y + constant)) ||
      ballY + baseball.height >= c.height
    ) {
      location.reload(); // Page will refresh & game will start over
    }
  }

  pullImage.drawImage(baseball, ballX, ballY);

  ballY += gravity;

  requestAnimationFrame(draw); //similar to a for loop but draws animations more smoothly
}

draw();
