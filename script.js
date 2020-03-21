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


// if the jumping animation is constnatly happening the background, such that when we press j, we may start the animation in the middle,
// ... IF that is true, a solution would potentially be resetting the gif every time we restart it



//var loadImg1;
//var loadImg2;
var idleImg1;
var idleImg2;

var jumpImg1;
var jumpImg2;

var readyButton;

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

var healthPercent1 = 1.0;
var healthPercent2 = 1.0;

var timerActive = false;

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

// this represents the text displaying the "status" of each player's decision
p1ChoiceText = "Awaiting P1's Decision...";
p2ChoiceText = "Awaiting P2's Decision...";

var showTimer = false;


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
  
  readyButton = createImg("https://cdn.glitch.com/3c8bb0ef-34b4-4b1b-8044-7b2c1b6c0326%2Fbutton_ready.png?v=1584811005955");
  readyButton.remove();
  
  // UNUSED CODE TO FORCE BROWSER ZOOM TO 90%
  // NOTE: this does not work!
  //https://stackoverflow.com/questions/21093570/force-page-zoom-at-100-with-js
  /*
  var scale = 'scale(0.9)';
  document.body.style.webkitTransform =  scale;    // Chrome, Opera, Safari
  document.body.style.msTransform =   scale;       // IE 9
  document.body.style.transform = scale;     // General
  */
  
  
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

function startTimer()
{
  setInterval(updateClock, 1000);
  timerActive = true;
}

function updateClock()
{
  if(secondsLeft > 0)
    {
      secondsLeft = secondsLeft - 1;    
    }  
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
  strokeWeight(0);
  fill(200, 0, 0);
  textSize(32);
  for (var i = 0; i < numCommands; i++)
  {
    
      if(i == 0)
        {
          text('Fire Throw', 40, 640 + (i * textInterval));
        }
      if(i == 1)
        {
          text('Power Blast', 40, 640 + (i * textInterval));
        }
      if(i == 2)
        {
          text('Sword Strike', 40, 640 + (i * textInterval));
        }
      if(i == 3)
        {
          text('Fiery Counter', 40, 640 + (i * textInterval));
        }
      if(i == 4)
        {
          text('Steam Up', 40, 640 + (i * textInterval));
        }
      if(i == 5)
        {
          text('Heat Shield', 40, 640 + (i * textInterval));
        }
  }
  for (var i = 0; i < numCommands; i++)
  {
      if(i == 0)
        {
          text('1', 10, 640 + (i * textInterval));
        }
      else if(i == 1)
        {
          text('2', 10, 640 + (i * textInterval));
        }
      else if(i == 2)
        {
          text('3', 10, 640 + (i * textInterval));
        }
      else if(i == 3)
        {
          text('4', 10, 640 + (i * textInterval));
        }
      else if(i == 4)
        {
          text('5', 10, 640 + (i * textInterval));
        }
      else if(i == 5)
        {
          text('6', 10, 640 + (i * textInterval));
        }
  }
    
  // draws P2's commands
  fill(0, 0, 200);
  textSize(32);
  textAlign(RIGHT);
  for (var i = 0; i < numCommands; i++)
  {
    if(i == 0)
        {
          text('Icicle Toss', 1800, 640 + (i * textInterval));
        }
      if(i == 1)
        {
          text('Iceberg Crush', 1800, 640 + (i * textInterval));
        }
      if(i == 2)
        {
          text('Ice Breath', 1800, 640 + (i * textInterval));
        }
      if(i == 3)
        {
          text('Icy Reflect', 1800, 640 + (i * textInterval));
        }
      if(i == 4)
        {
          text('Frozen Mystery', 1800, 640 + (i * textInterval));
        }
      if(i == 5)
        {
          text('Ice Wall', 1800, 640 + (i * textInterval));
        }
  }
  for (var i = 0; i < numCommands; i++)
  {
      if(i == 0)
        {
          text('7', 1830, 640 + (i * textInterval));
        }
      else if(i == 1)
        {
          text('8', 1830, 640 + (i * textInterval));
        }
      else if(i == 2)
        {
          text('9', 1830, 640 + (i * textInterval));
        }
      else if(i == 3)
        {
          text('0', 1830, 640 + (i * textInterval));
        }
      else if(i == 4)
        {
          text('-', 1830, 640 + (i * textInterval));
        }
      else if(i == 5)
        {
          text('=', 1830, 640 + (i * textInterval));
        }
  }
  textAlign(LEFT);
  strokeWeight(1);
  
  // draws Middle UI text
  var midUIMidX = (500 + 1350) / 2;
  if(showTimer)
  {
    textSize(130);    

    if (secondsLeft <= 5)
      {
        fill(255, 100, 100);
      }
    else
      {
        fill(255, 255, 0);  
      }

    if(secondsLeft <= 9)
      {
        text(secondsLeft, midUIMidX - alignSeconds + 30, 850);
      }
    else
      {
        text(secondsLeft, midUIMidX - alignSeconds, 850);
      }

    textSize(32);
    fill(255, 255, 255);
    text("You have...", midUIMidX - 70, 740);
    text("seconds to make your decision!", midUIMidX - 240, 900);

    fill("hotpink");
    text(p1ChoiceText, 520, 650);
    // p1 command text here

    fill("skyblue");  
    textAlign(RIGHT);
    var rightCommandShift = 400;
    text(p2ChoiceText, midUIMidX + rightCommandShift, 650);
    // p2 command text here

    textAlign(LEFT);
  }
  
  
  // Labels for wasd/ijkl movement keys
  textAlign(CENTER);
  textFont('Georgia');
  
  // W(P1)
  fill("red");
  rect(325, 660, 50, 50);
  fill("black");
  text("W", 350, 695);
  
  // A(P1)
  fill("yellow");
  rect(275, 710, 50, 50);
  fill("black");
  text("A", 300, 745);
  
  // S(P1)
  fill("lime");
  rect(325, 710, 50, 50);
  fill("black");
  text("S", 350, 745);
  
  // D(P1)
  fill("blue");
  rect(375, 710, 50, 50);
  fill("black");
  text("D", 400, 745);
  
  stroke("white");
  
  // I(P2)
  fill("darkred");
  rect(1425, 660, 50, 50);
  fill("white");
  text("I", 1450, 695);
  
  // J(P2)
  fill(200, 200, 0);
  rect(1375, 710, 50, 50);
  fill("white");
  text("J", 1400, 745);
  
  // K(P2)
  fill("green");
  rect(1425, 710, 50, 50);
  fill("white");
  text("K", 1450, 745);
  
  // L(P2)
  fill("darkblue");
  rect(1475, 710, 50, 50);
  fill("white");
  text("L", 1500, 745);
  
  
  // reset font attributes
  textAlign(LEFT);
  textFont('Arial');
  stroke("black");
  
  drawReadyButton();
  //readyButton.position(0,0);
  readyButton.position(midUIMidX - alignSeconds + 30, 800);
}
var startY = 650;
var endY = 950;
var numCommands = 6;
var textBoxHeight = endY - startY;
var textInterval = textBoxHeight / (numCommands - 1);

// draws the "Ready!" button
function drawReadyButton()
{
  readyButton = createImg("https://cdn.glitch.com/3c8bb0ef-34b4-4b1b-8044-7b2c1b6c0326%2Fbutton_ready.png?v=1584811005955");
}

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
  healthPercent1 = currentHP1 / maxHP;
  var damageBarLength = HPBarLength * (1 - healthPercent1);  
  var damageBarStartX1 = (HPBarStartX1 + HPBarLength) - damageBarLength;  
  fill("red");
  rect(damageBarStartX1, 40, damageBarLength, 20);
  
  
}
// health bar for player 2
function health2()
{ 
  healthPercent2 = currentHP2 / maxHP;
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
  if(keyCode == 72 && !p1Jumping)
  {
    jump();
  }
  
}

function keyReleased()
{
  
  // player 1 commands
  if (keyCode == 49)
    {
      p1ChoiceText = "Player 1 uses Fire Throw!";
      damage(2, 100);
    }
  else if (keyCode == 50)
    {
      p1ChoiceText = "Player 1 uses Power Blast!";
    }
  else if (keyCode == 51)
    {
      p1ChoiceText = "Player 1 uses Sword Strike!";
    }
  else if (keyCode == 52)
    {
      p1ChoiceText = "Player 1 uses Fiery Counter!";
    }
  else if (keyCode == 53)
    {
      p1ChoiceText = "Player 1 uses Steam Up!";
    }
  else if (keyCode == 54)
    {
      p1ChoiceText = "Player 1 uses Heat Shield!";
    }
  else if (keyCode == 87)
    {
      p1ChoiceText = "Player 1 moves to the Red Platform!";
      player1X = platformXYs.red[0];
      player1Y = platformXYs.red[1];
    }
  else if (keyCode == 65)
    {
      p1ChoiceText = "Player 1 moves to the Yellow Platform!";
      player1X = platformXYs.yellow[0];
      player1Y = platformXYs.yellow[1];
    }
  else if (keyCode == 83)
    {
      p1ChoiceText = "Player 1 moves to the Ground!";
      player1X = platformXYs.ground[0];
      player1Y = platformXYs.ground[1];
    }
  else if (keyCode == 68)
    {
      p1ChoiceText = "Player 1 moves to the Blue Platform!";
      player1X = platformXYs.blue[0];
      player1Y = platformXYs.blue[1];
    }
  else
    {
      p1ChoiceText = "Awaiting P1's Decision...";
    }
  
  // player 2 commands
  if (keyCode == 55)
    {
      p2ChoiceText = "Player 2 uses Icicle Toss!";
    }
  else if (keyCode == 56)
    {
      p2ChoiceText = "Player 2 uses Iceberg Crush!";
    }
  else if (keyCode == 57)
    {
      p2ChoiceText = "Player 2 uses Ice Breath!";
    }
  else if (keyCode == 48)
    {
      p2ChoiceText = "Player 2 uses Icy Reflect!";
    }
  else if (keyCode == 189)
    {
      p2ChoiceText = "Player 2 uses Frozen Mystery!";
    }
  else if (keyCode == 187)
    {
      p2ChoiceText = "Player 2 uses Ice Wall!";
    }
  else if (keyCode == 73)
    {
      p2ChoiceText = "Player 2 moves to the Red Platform!";
      player2X = platformXYs.red[2];
      player2Y = platformXYs.red[3];
    }
  else if (keyCode == 74)
    {
      p2ChoiceText = "Player 2 moves to the Yellow Platform!";
      player2X = platformXYs.yellow[2];
      player2Y = platformXYs.yellow[3];
    }
  else if (keyCode == 75)
    {
      p2ChoiceText = "Player 2 moves to the Ground!";
      player2X = platformXYs.ground[2];
      player2Y = platformXYs.ground[3];
    }
  else if (keyCode == 76)
    {
      p2ChoiceText = "Player 2 moves to the Blue Platform!";
      player2X = platformXYs.blue[2];
      player2Y = platformXYs.blue[3];
    }
  else
    {
      p2ChoiceText = "Awaiting P2's Decision...";
    }
}

// damages the given player by a given amount
function damage(playerID, damageAmount)
{
  if (playerID == 1)
    {
      currentHP1 = currentHP1 - damageAmount;
      
      // if this damage caused us to fall below 0 HP, instead set our HP to 0
      if (currentHP1 < 0)
        {
          currentHP1 = 0;
        }
      
    }
  else
    {
      currentHP2 = currentHP2 - damageAmount;
      
      // if this damage caused us to fall below 0 HP, instead set our HP to 0
      if (currentHP2 < 0)
        {
          currentHP2 = 0;
        }
    }
}

