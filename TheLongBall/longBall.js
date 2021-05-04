var c = document.getElementById("canvas");
var pullImage = c.getContext("2d");

// Loading images
var baseball = new Image();
var playerTop = new Image();
var playerBottom = new Image();
var stadium = new Image();

// Need to find the actual png images
baseball.src = "Images/baseball.png";
playerTop.src = "Images/playerTop.png";
playerBottom.src = "Images/playerBottom.png";
stadium.src = "Images/stadium.png";

// Loading audio clips

var air = new Audio();
var pointscored = new Audio();

air.src = "Sounds/air.mp3";
pointscored.src = "Sounds/pointscored.mp3";

// these are variables for the ball, fielders, and movement
var ballX = 225;
var ballY = 370; //starting points

function draw() {
  pullImage.drawImage(stadium, 0, 0);

  pullImage.drawImage(baseball, ballX, ballY);
  requestAnimationFrame(draw);
}

draw();
