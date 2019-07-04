/*
Things to work on. 

- If ball in bottom left corner quadrant (4th quadrent), then the AI robot will go to its default position. 
*/ 






var canvas = document.getElementById("screen")
var c = canvas.getContext("2d")

var player1X = 10;
var player1Y = 410;

var ballSpeedX = 3;
var ballSpeedY = 3;
var playerSpeed = 100;

var playerW = 25;
var playerH = 125;

var ballX = 712;
var ballY = 410;

var ballRad = 30;

var robotPoints = 0;
var playerPoints = 0;

var robotX = 1390;
var robotY = 410;
var robotSpeed = ballSpeedX / 2;
var robotW = 25;
var robotH = 125;

function drawPlayer() {
  c.fillColor = "Black"
  c.fillRect(player1X, player1Y, playerW, playerH)
}

function drawBall() {
  c.beginPath()
  c.fillColor = "Red"
  c.arc(ballX, ballY, ballRad, 0, Math.PI * 2)
  c.fill()
  c.stroke()
}


function checkCollisionPlayer() {
  if (ballX <= player1X + 35 + ballRad && ballY >= player1Y && ballY <= player1Y + playerH) {
    ballSpeedX = -ballSpeedX;
  }
}

function drawNet() {
  c.fillRect(712, 0, 20, 1410)
}

function drawRobotPaddle() {
  c.fillRect(robotX, robotY, robotW, robotH)
  c.fill()
}

function robotAI() {
  if (ballX >= 400) {
    if (ballY+robotH > robotY + robotH) {
      robotY += robotSpeed/5.5;
    }
    if (ballY < robotY) {
      robotY -= (robotSpeed/5);
    }
    if (ballX == 700 && ballY >= 547) {
      robotY = 400;
    }
    if (ballX >= 700 && ballX <= 1100 && ballY >= 500) {
      robotY = 400;
    }

  } else {
    robotY += 0;
  }
}



function checkCollisionRobotAI() {
  if (ballX >= robotX - 35 && ballY >= robotY && ballY <= robotY + robotH) {
    ballSpeedX = -ballSpeedX + 0.5;
  }
}

function writePoints() {
  c.font = "100px Ariel"
  c.fillText(robotPoints, 1100, 100)
  c.fillText(playerPoints, 300, 100)
}

function collisionForPoints() {
  if (ballX <= ballRad) {
    robotPoints += 1;
    ballX = 712;
    ballY = 410;
    ballSpeedX = ballSpeedY;
    ballSpeedY = ballSpeedX;
  }
  if (ballX >= canvas.width-ballRad) {
    playerPoints += 1;
    ballX = 712;
    ballY = 410; 
    ballSpeedX = ballSpeedY;
    ballSpeedY = ballSpeedX;
  }
}

function moveBall() {
  c.clearRect(0, 0, canvas.width, canvas.height)
  drawBall()
  drawPlayer()
  checkCollisionPlayer()
  drawNet()
  drawRobotPaddle()
  robotAI()
  checkCollisionRobotAI()
  writePoints()
  collisionForPoints()


  if (ballX >= canvas.width-ballRad || ballX < ballRad) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballY > canvas.height-ballRad || ballY < ballRad) {
    ballSpeedY = -ballSpeedY;
  }

  if (ballY == player1Y && ballX <= player1X+35) {
    ballX = 712;
    ballY = 410;
  }

  if (ballY == robotY && ballX >= robotX-35) {
    ballX = 712;
    ballY = 410;
  }

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  function playerMove(e) {
      if (e.keyCode == 87 || e.keyCode == 38) {
        player1Y -= playerSpeed;
      }
      if (e.keyCode == 83 || e.keyCode == 40) {
        player1Y += playerSpeed;
      }
  }

  document.onkeydown = playerMove;

  
}

c.font = "50px Ariel";
c.fillText("Press E to start game on easy mode.", 500, 500)
c.fillText("Press M to start game on medium mode", 500, 600)
c.fillText("Press H to start game on hard mode", 500, 700)
c.fillText("Press I to start game on Impossible", 500, 800)

function startGame(e) {
  if (e.keyCode == 69) {
    robotSpeed = 23;
    ballSpeedX = 4;
    ballSpeedY = 4;
    setInterval(moveBall, 10)
  }
  if (e.keyCode == 77) {
    robotSpeed = 49;
    ballSpeedX = 10;
    ballSpeedY = 10;
    setInterval(moveBall, 10)
  }
  if (e.keyCode == 72) {
    robotSpeed = 75;
    ballSpeedX = 15;
    ballSpeedY = 15;
    setInterval(moveBall, 10)
  }
  if (e.keyCode == 73) {
    robotSpeed = 1000;
    ballSpeedX = 50;
    ballSpeedY = 50;
    setInterval(moveBall, 10)
  }
}

document.onkeydown = startGame;

/*
I made a simple circle at the start.
i made it move by recreating the whole circle over and over again.
Then I tried making the real player paddle and it worked just fine.
I tried to make keys for that, but it was impossible! So I made the AI.
First off, I made it so that there is a difficulty setting. Then I made it so that depending on the difficulty, The ball would go faster and how reactive the AI bot is. for example, there is an impossible mode that no one will ever beat, the robot AI is super fast and the ball is super fast too! That is how it is done. And depending on the ball position, the robot AI would react to it by going to the same Y position as the ball, divided by 5 so that you can still beat the AI. And if the ball is in the fourth quadrant, then the robot AI will go to the center of its Y position. To make that clear, if the ball is in the fourth quadrant, aka the bottom left corner part, then the robots Y position will be in the center of the Y axis. So if the canvas height is equal to 800, then the robot AI will be at 400 because it is divided by 2. So the Height of this canvas is 820, then the robot AI will go to 400. But if the ball is still going forward and the robot AI goes up, then you will get a free point! And that is how this was made. Link in description for github.
 */
