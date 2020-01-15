// ---------- IDEAS ----------

// make players take their turns AT THE SAME TIME! 
// make the player choices invisible on the screen... aka rather than moving up and down with some selector, they just press 6 to do command 6


var fighterImg;
var fighterImg2;

var maxHP = 500;
var currentHP1 = maxHP;
var currentHP2 = maxHP;

var HPBarLength = 500;
var HPBarStartX1 = 40;
var HPBarStartX2 = 1310;

var playerTurn = "P1";

var player1X = g1x;
var player1Y = g1y;
var player2X = g2x;
var player2Y = g2y;

// objects for the ground and platforms
var platformXYs = {};

// called at the beginning
function setup()
{
  
  var platformXYs = {};
  
  platformXYs['ground'] = [[450, 320], [1300, 320]];
  platformXYs['yellow'] = [[580, 220], [950, 220]];
  platformXYs['red'] = [[820, 120], [900, 120]];
  platformXYs['blue'] = [[1040, 220], [1180, 220]];
  
  //console.log(myObj);
  //myObj['ground'][0] // [50, 250]
  //myObj['ground'][0][1] // 250
  
  createCanvas(1850,1000);
  background(0);
  textStyle(BOLD);
  textSize(32);
  fighterImg = loadImage("https://cdn.glitch.com/3c8bb0ef-34b4-4b1b-8044-7b2c1b6c0326%2Foldschool%20sonic%20removebg.png?v=1578441223317");
  fighterImg2 = loadImage("https://cdn.glitch.com/3c8bb0ef-34b4-4b1b-8044-7b2c1b6c0326%2Foldschool%20sonic%20removebg.png?v=1578441223317");
}

// constantly called to update the screen 
function draw()
{
  
  // draws stage
  fill("lime");
  rect(425, 400, 1000, 20);
  fill("green");
  arc(925, 420, 1000, 250, 0, PI);
  fill("yellow");
  rect(575, 300, 250, 20);
  fill("red");
  rect(800, 200, 250, 20);
  fill("blue");
  rect(1025, 300, 250, 20);
  
  // draws P1's health bar
  fill("lightgreen");
  rect(HPBarStartX1, 40, HPBarLength, 20);
  
  // draws P2's health bar
  fill("lightgreen");
  rect(HPBarStartX2, 40, HPBarLength, 20);
  
  health1();
  health2();
  
  // draw fighter
  image(fighterImg, 1180, 220, 66, 82);
  image(fighterImg2, player2X, player2Y, 66, 82);
  
  // draws P1's UI
  fill(255, 90, 90);
  rect(0, 600, 500, 400);
  
  // draws P2's UI
  fill(90, 90, 255);
  rect(1350, 600, 500, 400);
  
  // draws P1's commands
  /*
  fill(200, 0, 0);  
  text('Text Here', 20, 640);
  */
  
  // draws P2's commands
  fill(0, 0, 200);
  text('Text There', 1370, 640);
  
  
  fill(200, 0, 0);
  for (var i = 0; i < numCommands; i++)
  {
      text('Text Here', 20, 640 + (i * textInterval));
  }
  
}
var startY = 650;
var endY = 950;
var numCommands = 6;
var textBoxHeight = endY - startY;
var textInterval = textBoxHeight / (numCommands - 1);


// coordinates for the centers of the platforms
// p1 is yellow, p2 is red, p3 is blue
var p1x = 650;
var p1y = 220;
var p2x = 875;
var p2y = 120;
var p3x = 1100;
var p3y = 220;
var g1x = 450;
var g1y = 320;
var g2x = 1300;
var g2y = 320;

// health bar for player 1
function health1() 
{
  
  var healthPercent1 = 1.0;
  
  var damageBarLength = HPBarLength * (1 - healthPercent1);
  
  var damageBarStartX1 = (HPBarStartX1 + HPBarLength) - damageBarLength;
  
  fill("red");
  rect(damageBarStartX1, 40, damageBarLength, 20);
  
  
}
// health bar for player 2
function health2()
{
  var healthPercent2 = 1.0;
  
  var damageBarLength = HPBarLength * (1 - healthPercent2);
  
  var damageBarStartX2 = (HPBarStartX2 + HPBarLength) - damageBarLength;
  
  fill("red");
  rect(damageBarStartX2, 40, damageBarLength, 20);
}

function moveTo() 
{
  
}

var currentPlatform = "ground";

function keyPressed()
{
  
  var platformNames = platformXYs.keys();
  
  for (var )
  
  
  if (keyCode === RIGHT_ARROW)
    {
      moveTo();
    }
}