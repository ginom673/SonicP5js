// ---------- IDEAS ----------

// make players take their turns AT THE SAME TIME! 
// make the player choices invisible on the screen... aka rather than moving up and down with some selector, they just press 6 to do command 6
// make gif animated
// write some code which allows the players to be repositioned with a button press or something for debugging purposes

var fighterImg;
var fighterImg2;

var maxHP = 500;
var currentHP1 = maxHP;
var currentHP2 = maxHP;

var HPBarLength = 500;
var HPBarStartX1 = 40;
var HPBarStartX2 = 1310;

var playerTurn = "P1";

var platformXYs = {};

// platformXYs.platformName[0] gives the x coordinate for player 1 for this platform
// platformXYs.platformName[1] gives the y coordinate for player 1 for this platform
// platformXYs.platformName[2] gives the x coordinate for player 2 for this platform
// platformXYs.platformName[3] gives the y coordinate for player 2 for this platform
//platformXYs['ground'] = [450, 293, 1280, 293];
platformXYs.ground = [450, 293, 1280, 293];
platformXYs.yellow = [580, 193, 710, 193];
platformXYs.red = [800, 93, 920, 93];
platformXYs.blue = [1020, 193, 1160, 193];

var player1X = platformXYs.ground[0];
var player1Y = platformXYs.ground[1];
var player2X = platformXYs.ground[2];
var player2Y = platformXYs.ground[3];

//for (var i = 0; i < myList.length; i++)


// objects for the ground and platforms

// called at the beginning
function setup()
{  
  
  //console.log(myObj);
  //myObj['ground'][0] // [50, 250]
  //myObj['ground'][0][1] // 250
  
  createCanvas(1850,1000);
  background(0);
  textStyle(BOLD);
  textSize(32);
  fighterImg = loadImage("https://cdn.glitch.com/3c8bb0ef-34b4-4b1b-8044-7b2c1b6c0326%2FFighter_P1_Idle.gif?v=1579979781888");
  fighterImg2 = loadImage("https://cdn.glitch.com/3c8bb0ef-34b4-4b1b-8044-7b2c1b6c0326%2FFighter_P2_Idle.gif?v=1579979790415");
}


// EXAMPLE OBJECT FUNCTIONS for fighters that we could maybe use later
/*
function createFighter(x, y)
{
  var fighter = {};
  fighter.x = x;
  fighter.y = y;
  fighter.hp = 500;
  fighter.max_hp = 500;
  //fighter.image = loadImage("blah blah blah");
  fighter.color = "red";
}

function recolorFighter(fighter, colorName)
{
  fighter.color = colorName;
}

function damage(fighter, amount)
{
  fighter.hp = fighter.hp = amount;
  // include logic to check if dead or something, hp <= 0
}
*/

// constantly called to update the screen 
function draw()
{
  
  // draws stage
  background(100, 50, 120);
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
  image(fighterImg, player1X, player1Y, 128, 128);
  image(fighterImg2, player2X, player2Y, 128, 128);
  
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
/*
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
*/
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
  
  
  var platformNames = Object.keys(platformXYs); // ['ground', 'yellow', 'blue', 'red'];
  // platformNames[2]
  
  var myList = [50, 20, -10];
  console.log(myList[0])
  
  // for loop has three main parts:
  // for (index initialization; condition statement; update statement)
  
  
  // i 
  // platformNames.length      4
  
  /*
  for (var i = platformNames.length - 1; i > -1; i--)
    {
      console.log(platformNames[i]);
    }
  */
  
  for (var i = 0; i < platformNames.length; i++)
    {
      console.log(platformNames[i]);
    }
  
  if (keyCode === RIGHT_ARROW)
    {
      moveTo();
    }
}