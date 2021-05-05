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
var ballDY = 0; //delta y
var gravity = 0.15;
var constant;
var gap = 120; //variable for distance between gloves
var points = 0; //start at zero score

// Defines the move variable for the ball to move up
document.addEventListener("keydown", moveUp); //any key works

// Adds an event handler to an element, calls the event and gives the function
function moveUp() {
  ballDY = 4;
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
    constant = playerTop.height + gap; //to include the gap variable created earlier
    pullImage.drawImage(playerTop, player[i].x, player[i].y);
    pullImage.drawImage(playerBottom, player[i].x, player[i].y + constant); //adding the gap leaves space

    player[i].x--;

    if (player[i].x == 650) {
      //variable for coordinate when new player is drawn
      player.push({
        //draws a new player; can change
        x: c.width, //difficulty with the xyz variable
        y: Math.floor(Math.random() * playerTop.height) - playerTop.height,
      });
    }

    // Collision detection
    if (
      (ballX + baseball.width >= player[i].x &&
        ballX <= player[i].x + playerTop.width &&
        (ballY <= player[i].y + playerTop.height ||
          ballY + baseball.height >= player[i].y + constant)) ||
      ballY + baseball.height >= c.height //long code that basically says if ball height or width touches player, game over
    ) {
      location.reload(); // Page will refresh & game will start over
    }

    if (player[i].x == 175) {
      //points go when x goes through the gap; had to move it forward because the player build is too wide
      points = points + 10; //adds score as you play
      pointscored.play(); //adds audio when you score
    }
  }

  pullImage.drawImage(baseball, ballX, ballY);

  ballY -= ballDY -= gravity;

  pullImage.fillStyle = "#FFF"; //white
  pullImage.font = "30px BadaBoomBB"; //change this to cool font
  pullImage.fillText("Score : " + points + " feet", 10, c.height - 20);

  requestAnimationFrame(draw); //similar to a for loop but draws animations more smoothly
}

draw();
