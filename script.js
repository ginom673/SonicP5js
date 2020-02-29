// ---------- NOTES ----------
// it seems that the image position represents the bottom-left corner of the image

// ANIMATION
// gif is 13 FPS
// prep is frames 1-6 (6 frames)
// jump is frames 7-16 (10 frames)
// land is frames 17-21 (5 frames)
// we assume the peak of our jump is horizontally halfway between the source and destination,
// and that the peak of our jump is 50% of dy above the highest point

// with these numbers, this means our jump should take 10/13 of a second
// if we want half the jump to be going up and half to be going down, each half takes 10/26 of a second

// FIND AND REPLACE ALL
// in glitch.com you can find and replace text using CTRL+ALT+F

// for some reason, the jump animation plays in the middle of when you jump (if you get lucky)

// ---------- IDEAS ----------

// make players take their turns AT THE SAME TIME! 
// make the player choices invisible on the screen... aka rather than moving up and down with some selector, they just press 6 to do command 6
// write some code which allows the players to be repositioned with a button press or something for debugging purposes
// if we reposition the gif, it may restart... minor concern though
// however, we may decide to make a "movement animation", such that we dont instantly teleport between locations, and instead get a gradual movement to the location

//var loadImg1;
//var loadImg2;
var idleImg1;
var idleImg2;

var jumpImg1;
var jumpImg2;

var maxHP = 500;
var currentHP1 = maxHP;
var currentHP2 = maxHP;

var HPBarLength = 500;
var HPBarStartX1 = 40;
var HPBarStartX2 = 1310;

var playerTurn = "P1";

var platformXYs = {};

var p1Jumping = false;
var p2Jumping = false;

var gameFPS = 13;
var gameSPF = 1/gameFPS;
var jumpAnimLength = 21;

var secondsLeft = 10;
var alignSeconds = 70;

// platformXYs.platformName[0] gives the x coordinate for player 1 for this platform
// platformXYs.platformName[1] gives the y coordinate for player 1 for this platform
// platformXYs.platformName[2] gives the x coordinate for player 2 for this platform
// platformXYs.platformName[3] gives the y coordinate for player 2 for this platform
//platformXYs['ground'] = [450, 293, 1280, 293];
platformXYs.ground = [450, 325, 1360, 325];
platformXYs.yellow = [580, 225, 710, 225];
platformXYs.red = [800, 125, 920, 125];
platformXYs.blue = [1020, 225, 1160, 225];

// the game sets the sprites position to (450, 325)

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
  
  // myObj['property']
  // myObj.property 
  
  //myObj['ground'][0] // [50, 250]
  //myObj['ground'][0][1] // 250
  
  createCanvas(1850,1000);
  background(0);
  textStyle(BOLD);
  textSize(32);
  //loadImg1 = loadImage("https://cdn.glitch.com/3c8bb0ef-34b4-4b1b-8044-7b2c1b6c0326%2FFighter_P1_Idle.gif?v=1579979781888");
  //loadImg2 = loadImage("https://cdn.glitch.com/3c8bb0ef-34b4-4b1b-8044-7b2c1b6c0326%2FFighter_P2_Idle.gif?v=1579979790415");
  idleImg1 = createImg("https://cdn.glitch.com/3c8bb0ef-34b4-4b1b-8044-7b2c1b6c0326%2FP1_Idle.gif?v=1580578684764");
  idleImg2 = createImg("https://cdn.glitch.com/3c8bb0ef-34b4-4b1b-8044-7b2c1b6c0326%2FP2_Idle.gif?v=1580578684764");
  
  jumpImg1 = createImg("https://cdn.glitch.com/3c8bb0ef-34b4-4b1b-8044-7b2c1b6c0326%2FFighter_P1_Jump.gif?v=1580860847142");
  jumpImg2 = createImg("https://cdn.glitch.com/3c8bb0ef-34b4-4b1b-8044-7b2c1b6c0326%2FFighter_P2_Jump.gif?v=1580861430655");
  jumpImg1.remove();
  jumpImg2.remove();
  
  // UNUSED CODE TO FORCE BROWSER ZOOM TO 90%
  // NOTE: this does not work!
  //https://stackoverflow.com/questions/21093570/force-page-zoom-at-100-with-js
  /*
  var scale = 'scale(0.9)';
  document.body.style.webkitTransform =  scale;    // Chrome, Opera, Safari
  document.body.style.msTransform =   scale;       // IE 9
  document.body.style.transform = scale;     // General
  */
  
  setInterval(updateClock, 1000);
  
}

function createJumpImg1()
{
  jumpImg1 = createImg("https://cdn.glitch.com/3c8bb0ef-34b4-4b1b-8044-7b2c1b6c0326%2FFighter_P1_Jump.gif?v=1580860847142");
}

function createJumpImg2()
{
  jumpImg2 = createImg("https://cdn.glitch.com/3c8bb0ef-34b4-4b1b-8044-7b2c1b6c0326%2FFighter_P2_Jump.gif?v=1580861430655");
}

function createIdleImg1()
{
  idleImg1 = createImg("https://cdn.glitch.com/3c8bb0ef-34b4-4b1b-8044-7b2c1b6c0326%2FP1_Idle.gif?v=1580578684764");
}

function createIdleImg2()
{
  idleImg2 = createImg("https://cdn.glitch.com/3c8bb0ef-34b4-4b1b-8044-7b2c1b6c0326%2FP2_Idle.gif?v=1580578684764");
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

function jump()
{
  // here do idleImg1.remove()
  // and then position jumpImg1 in the right place
  idleImg1.remove()
  createJumpImg1();
  jumpImg1.position(player1X, player1Y);
  p1Jumping = true;
  setTimeout(function(){
    jumpImg1.remove();
    createIdleImg1();
    p1Jumping = false;
    idleImg1.position(player1X, player1Y);
  }, (21/13)*1000);
  //setInterval
}

function updateClock()
{
  secondsLeft = secondsLeft - 1;
}

// constantly called to update the screen 
function draw()
{
  
  // draws stage
  background(90, 70, 170);
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
  //image(loadImg1, player1X, player1Y, 128, 128);
  //image(loadImg2, player2X, player2Y, 128, 128);
  //image(idleImg1, player1X, player1Y, 128, 128);
  //image(idleImg2, player2X, player2Y, 64, 64);
  
  idleImg1.position(player1X, player1Y);
  idleImg2.position(player2X, player2Y);
  
  // draws P1's UI
  fill(255, 90, 90);  
  rect(0, 600, 500, 400);
  
  // draws P2's UI
  fill(90, 90, 255);
  rect(1350, 600, 500, 400);

  // draw middle UI box
  fill(50, 0, 50);
  rect(500, 600, 850, 400);
  
  // draws P1's commands
  fill(200, 0, 0);
  textSize(32);
  for (var i = 0; i < numCommands; i++)
  {
      text('Text Here', 20, 640 + (i * textInterval));
  }
    
  // draws P2's commands
  fill(0, 0, 200);
  textSize(32);
  for (var i = 0; i < numCommands; i++)
  {
      text('Text There', 1370, 640 + (i * textInterval));
  }
  
  // draws Middle UI text
  textSize(130);
  var midUIMidX = (500 + 1350) / 2;
  
  if(secondsLeft == 9)
    {
      alignSeconds = alignSeconds - 70;
    }
  else
    {
      alignSeconds = 70;
    }
  
  if (secondsLeft <= 5)
    {
      fill(255, 100, 100);
    }
  else
    {
      fill(255, 255, 0);  
    }
  
  //
  text(secondsLeft, midUIMidX - alignSeconds, 850);
  textSize(32);
  fill(255, 255, 255);
  text("You have...", midUIMidX - 70, 740);
  text("seconds to make your decision!", midUIMidX - 240, 900);
  
  
}
var startY = 650;
var endY = 950;
var numCommands = 6;
var textBoxHeight = endY - startY;
var textInterval = textBoxHeight / (numCommands - 1);

// called whenever we click anywhere in the game in order to log its coordinates
function reportClick()
{
  var x = event.clientX;
  var y = event.clientY; 
  var coor = "Click @ (" + x + ", " + y + ")";
  console.log(coor);
}

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

var currentPlatform = "ground";

function keyPressed()
{
  
  // console.log(keyCode);
  // the above line of code would give the ID of the key just pressed
  
  // if they press "j"
  if(keyCode == 74 && !p1Jumping)
  {
    jump();
  }
  
}

