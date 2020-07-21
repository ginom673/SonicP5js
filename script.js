// ---------- TIPS ----------

// FIND AND REPLACE ALL
// in glitch.com you can find and replace text using CTRL+ALT+F


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

// EXAMPLE COOLDOWN TIMING
var lastPowerBlastTurn = 99999;
var currentTurn = -1; // once the game starts, currentTurn will be set to 0
var powerBlastCooldown = 3;
if (currentTurn - lastPowerBlastTurn >= powerBlastCooldown)
{
  // they can use powerblast
}

// ---------- IDEAS ----------

// write some code which allows the players to be repositioned with a button press or something for debugging purposes
// make sure the players can only attack each other with melee attacks if they are near each other


// ---------- BUGS ----------

// if we reposition the gif, it may restart from frame 1 instead of the frame where it moved ... minor concern though
// however, we may decide to make a "movement animation", such that we dont instantly teleport between locations, and instead get a gradual movement to the location

// for some reason, the positioning of the click for the button is a little off
// for some reason, the jump animation plays in the middle of when you jump (if you get lucky)
// if the jumping animation is constantly happening the background, such that when we press j, we may start the animation in the middle,
// ... IF that is true, a solution would potentially be resetting the gif every time we restart it

// icicle toss and fire throw deal different damage...?

// restart button doesnt load


/* GLOBAL VARIABLES */

// player 1 damage multiplier
var p1DmgMult = 1.0;

// idle images
var idleImg1;
var idleImg2;

// jump images
var jumpImg1;
var jumpImg2;

// buttons
var readyButton; // undefined
var restartButton;

// attack icons
var meleeIcon;
var rangedIcon;
var otherIcon;

// health attributes
var maxHP = 500;
var currentHP1 = maxHP;
var currentHP2 = maxHP;
var HPBarLength = 500;
var HPBarStartX1 = 40;
var HPBarStartX2 = 1310;
var healthPercent1 = 1.0;
var healthPercent2 = 1.0;

// whose turn it is
var playerTurn = "P1";

// player positions for each platform
// platformXYs is an object where each property is a list of coordinates
// platformXYs.platformName[0] gives the x coordinate for player 1 for this platform
// platformXYs.platformName[1] gives the y coordinate for player 1 for this platform
// platformXYs.platformName[2] gives the x coordinate for player 2 for this platform
// platformXYs.platformName[3] gives the y coordinate for player 2 for this platform
var platformXYs = {};

// alternatively you can set properties like this
//platformXYs['ground'] = [450, 293, 1280, 293];
// you can also set the properties when you create the object
platformXYs.ground = [450, 325, 1360, 325];
platformXYs.yellow = [580, 225, 710, 225];
platformXYs.red = [800, 125, 920, 125];
platformXYs.blue = [1020, 225, 1160, 225];

// player starting positions
var player1X = platformXYs.ground[0];
var player1Y = platformXYs.ground[1];
var player2X = platformXYs.ground[2];
var player2Y = platformXYs.ground[3];

// tracks the platform each player is on, to determine if their attacks can strike each other
var currentPlatform = "ground";

// sets if the player is jumping
var p1Jumping = false;
var p2Jumping = false;

// FPS for animations
var gameFPS = 13;
var gameSPF = 1/gameFPS;
var jumpAnimLength = 21;

// timer seconds
var maxSeconds = 10;
var secondsLeft = maxSeconds;
var alignSeconds = 70;

// showTimer determines if the timer is ticking down from 10 to 0, meaning we are awaiting player decisions
// if its false, we are simply not ticking the timer RIGHT NOW
var showTimer = false;

// gameStarted determines if the game has started
// and for now, is basically used to determine if the ready button should be displayed or not
var gameStarted = false;

// middle UI xvalue
var midUIMidX = (500 + 1350) / 2;

// Ready button variables
var buttonX = midUIMidX - alignSeconds + 30;
var buttonY = 800;
var buttonWidth = 179;
var buttonHeight = 72;
var readyBtnIsActive;

// Play Again button variables
var buttonX2 = midUIMidX - alignSeconds;
var buttonY2 = 800;
var buttonWidth2 = 228;
var buttonHeight2 = 72;
var restartBtnIsActive = false;

// will be set to Ranged, Melee, Other, or Movement
var p1MoveType;
var p2MoveType;

// can be set to a specific move
var p1Choice;
var p2Choice;

// this represents the text displaying the "status" of each player's decision
var p1ChoiceText = "Awaiting P1's Decision...";
var p2ChoiceText = "Awaiting P2's Decision...";

// function call interval for timer that may or may not eget cancelled/restarted
var timerInterval;

// controls how we display text box commands
var startY = 650;
var endY = 950;
var numCommands = 6;
var textBoxHeight = endY - startY;
var textInterval = textBoxHeight / (numCommands - 1);

/* SETUP (called at the beginning) */
function setup()
{  
  
  // set screen and text
  createCanvas(1850,1000);
  background(0);
  textStyle(BOLD);
  textSize(32);
  
  // load idle images
  idleImg1 = createImg("https://cdn.glitch.com/3c8bb0ef-34b4-4b1b-8044-7b2c1b6c0326%2FP1_Idle.gif?v=1580578684764");
  idleImg2 = createImg("https://cdn.glitch.com/3c8bb0ef-34b4-4b1b-8044-7b2c1b6c0326%2FP2_Idle.gif?v=1580578684764");
  
  // load jump images, and make sure they do not display
  jumpImg1 = createImg("https://cdn.glitch.com/3c8bb0ef-34b4-4b1b-8044-7b2c1b6c0326%2FFighter_P1_Jump.gif?v=1580860847142");
  jumpImg2 = createImg("https://cdn.glitch.com/3c8bb0ef-34b4-4b1b-8044-7b2c1b6c0326%2FFighter_P2_Jump.gif?v=1580861430655");
  jumpImg1.remove();
  jumpImg2.remove();
  
  // load ready button image
  readyButton = createImg("https://cdn.glitch.com/3c8bb0ef-34b4-4b1b-8044-7b2c1b6c0326%2Fbutton_ready.png?v=1584811005955");  
  readyButton.position(midUIMidX - alignSeconds + 30, 800);
  
  // player's command icons:
  
  // p1 fire throw
  drawRangedIcon();
  rangedIcon.position(240, 640);
  // p1 power blast
  drawRangedIcon();
  rangedIcon.position(260, 700);
  // p1 sword strike
  drawMeleeIcon();
  meleeIcon.position(270, 760);
  // p1 fiery counter
  drawMeleeIcon();
  meleeIcon.position(280, 820);
  // p1 steam up
  drawOtherIcon();
  otherIcon.position(220, 880);
  // p1 heat shield
  drawOtherIcon();
  otherIcon.position(245, 940);
  
  // p2 icicle toss
  drawRangedIcon();
  rangedIcon.position(1640, 640);
  // p2 iceberg crush
  drawMeleeIcon();
  meleeIcon.position(1590, 705);
  // p2 ice breath
  drawRangedIcon();
  rangedIcon.position(1640, 760);
  // p2 icy reflect
  drawRangedIcon();
  rangedIcon.position(1640, 825);
  // p2 frozen mystery
  drawOtherIcon();
  otherIcon.position(1560, 885);
  // p2 ice wall
  drawOtherIcon();
  otherIcon.position(1680, 945);    
}

// Create images
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

// makes player jump
// NOTE: currently unused
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
}

// startTimer: starts off each turn,
// checks for win/loss conditions,
// and if no win/loss, awaits player decisions
function startTimer()
{
  
  // check if either player has won, or if it's a draw
  
  // check for draw first
  if (currentHP1 <= 0 && currentHP2 <= 0)
    {
      p1ChoiceText = "It's a Draw!";
      p2ChoiceText = "It's a Draw!";
      restartButton = createImg("https://cdn.glitch.com/3c8bb0ef-34b4-4b1b-8044-7b2c1b6c0326%2Fbutton_play-again.png?v=1586904545517");
      restartButton.position(midUIMidX - alignSeconds, 800);
      restartBtnIsActive = true;
    }
  // check if player 1 won
  else if (currentHP2 <= 0)
    {
      p1ChoiceText = "Player 1 has Won the Game!";
      p2ChoiceText = "Player 2 has Lost the Game!";
      restartButton = createImg("https://cdn.glitch.com/3c8bb0ef-34b4-4b1b-8044-7b2c1b6c0326%2Fbutton_play-again.png?v=1586904545517");
      restartButton.position(midUIMidX - alignSeconds, 800);
      restartBtnIsActive = true;
    }
  
  // check if player 2 won
  else if (currentHP1 <= 0)
    {
      p2ChoiceText = "Player 2 has Won the Game!";
      p1ChoiceText = "Player 1 has Lost the Game!";
      restartButton = createImg("https://cdn.glitch.com/3c8bb0ef-34b4-4b1b-8044-7b2c1b6c0326%2Fbutton_play-again.png?v=1586904545517");
      restartButton.position(midUIMidX - alignSeconds, 800);
      restartBtnIsActive = true;
    }
  
  // game is not over yet
  else
    {
      timerInterval = setInterval(updateTimer, 1000);
      showTimer = true;
      //currentTurn = currentTurn + 1;
      secondsLeft = maxSeconds;
      p1ChoiceText = "Awaiting P1's Decision...";
      p2ChoiceText = "Awaiting P2's Decision...";
      p1MoveType = undefined;
      p2MoveType = undefined;
      p1Choice = undefined;
      p2Choice = undefined;
    }
  
  
}

// updateTimer: ticks one second off of the active timer,
// and if the timer reaches 0, call stopTimer()
function updateTimer()
{
  if(secondsLeft > 0)
  {
    secondsLeft = secondsLeft - 1;    
  }  
  else
  {
    stopTimer();
  }
}

// stopTimer: called at the end of every turn
// to stop the timer from ticking,
// and also we interpret player commands and execute the turn, execute their choices
function stopTimer()
{
  showTimer = false;
  clearInterval(timerInterval);
  interpretCommands();
  setTimeout(startTimer, 5000);
}

/* DRAW (constantly called to update the screen) */ 
function draw()
{ 
  
  // wipes the entire game screen clean
  clear();
  
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
  
  // finishes health bars
  health1();
  health2();
  
  // positions player idle images
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
  
  // display timer and awaiting decision text
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
    
  }
  
  // display player choices
  if(gameStarted)
  {
    textAlign(CENTER);
    
    fill("hotpink");
    text(p1ChoiceText, midUIMidX, 640);
    // p1 command text here

    fill("skyblue");  
    var rightCommandShift = 400;
    text(p2ChoiceText, midUIMidX, 680);
    // p2 command text here
  } 

  textAlign(LEFT);  
  
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
  
  // draw ready button at start of game
  if(!gameStarted)
  {
    drawReadyButton();
  }
  
}

// draws the "Ready!" button
function drawReadyButton()
{
  if(readyButton == undefined)
  {
      readyButton = createImg("https://cdn.glitch.com/3c8bb0ef-34b4-4b1b-8044-7b2c1b6c0326%2Fbutton_ready.png?v=1584811005955");
      readyBtnIsActive = true;
  }  
}

// draws the Melee Icon
function drawMeleeIcon()
{
  meleeIcon = createImg("https://cdn.glitch.com/3c8bb0ef-34b4-4b1b-8044-7b2c1b6c0326%2Fmelee_icon.png?v=1585697930465");
}

// draws the Ranged Icon
function drawRangedIcon()
{
  rangedIcon = createImg("https://cdn.glitch.com/3c8bb0ef-34b4-4b1b-8044-7b2c1b6c0326%2Franged_icon.png?v=1585697945658");
}

// draws the Other Icon
function drawOtherIcon()
{
  otherIcon = createImg("https://cdn.glitch.com/3c8bb0ef-34b4-4b1b-8044-7b2c1b6c0326%2Fother_icon.png?v=1585697948579");
}

// called whenever we click anywhere in the game in order to log its coordinates
// this works just fine, but its not the convention we normally have for p5.js
// use mouseClicked instead
// see https://p5js.org/reference/#/p5/mouseClicked for more info
/*
function reportClick()
{
  var x = event.clientX;
  var y = event.clientY; 
  var coor = "Click @ (" + x + ", " + y + ")";
  console.log(coor);
}
*/

// mouseClicked: handles a mouse click event
// and essentially checks if the mouse clicked on a button
function mouseClicked()
{
  // ready button
  if(mouseX > buttonX && mouseX < buttonX + buttonWidth && mouseY > buttonY && mouseY < buttonY + buttonHeight && !restartBtnIsActive)
  {
    showTimer = true;
    gameStarted = true;
    readyButton.remove();
    readyButton = undefined;
    readyBtnIsActive = false;
    startTimer();
  }  
  
  // restart game button
  else if(mouseX > buttonX2 && mouseX < buttonX2 + buttonWidth2 && mouseY > buttonY2 && mouseY < buttonY2 + buttonHeight2 && !readyBtnIsActive)
  {
    resetGame();
  }
}


// resetGame: resets game when restart game button is pressed
function resetGame()
{
  if (restartButton != undefined)
  {
    restartButton.remove();    
  }
  
  restartBtnIsActive = false;
  showTimer = false;
  drawReadyButton();
  readyButton.position(midUIMidX - alignSeconds + 30, 800);
  readyBtnIsActive = true;
  currentHP1 = maxHP;
  currentHP2 = maxHP;
  gameStarted = false;
  player1X = platformXYs.ground[0];
  player1Y = platformXYs.ground[1];
  player2X = platformXYs.ground[2];
  player2Y = platformXYs.ground[3];
  p1Choice = undefined;
  p2Choice = undefined;
  p1DmgMult = 1.0;
  clearInterval(timerInterval);  
}

// sets up health bar for player 1
function health1() 
{
  healthPercent1 = currentHP1 / maxHP;
  var damageBarLength = HPBarLength * (1 - healthPercent1);  
  var damageBarStartX1 = (HPBarStartX1 + HPBarLength) - damageBarLength;  
  fill("red");
  rect(damageBarStartX1, 40, damageBarLength, 20);
}

// sets up health bar for player 2
function health2()
{ 
  healthPercent2 = currentHP2 / maxHP;
  var damageBarLength = HPBarLength * (1 - healthPercent2);  
  var damageBarStartX2 = (HPBarStartX2 + HPBarLength) - damageBarLength;  
  fill("red");
  rect(damageBarStartX2, 40, damageBarLength, 20);
}

// handles a key being pressed
// NOTE: unused
/*
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
*/

// keyReleased: handles a key being released.
// This usually sets the playerChoice and playerChoiceText variables (for player 1 or 2 respectively)
function keyReleased()
{
  
  // if the game hasn't started, or timer is inactive, return, so we ignore their key presses
  if(!gameStarted || !showTimer)
  {
    return;
  }
  
  // player 1 commands
  if (keyCode == 49)
    {
      p1Choice = 1;
      p1ChoiceText = "Player 1 Has Decided!";
      p1MoveType = "ranged";
      //damage(2, 100);
    }
  else if (keyCode == 50)
    {
      p1Choice = 2;
      
      p1ChoiceText = "Player 1 Has Decided!";
      p1MoveType = "ranged";
    }
  else if (keyCode == 51)
    {
      p1Choice = 3;
      p1ChoiceText = "Player 1 Has Decided!";
      p1MoveType = "melee";
    }
  else if (keyCode == 52)
    {
      p1Choice = 4;
      p1ChoiceText = "Player 1 Has Decided!";
      p1MoveType = "melee";
    }
  else if (keyCode == 53)
    {
      p1Choice = 5;
      p1ChoiceText = "Player 1 Has Decided!";
      p1MoveType = "other";
    }
  else if (keyCode == 54)
    {
      p1Choice = 6;
      p1ChoiceText = "Player 1 Has Decided!";
      p1MoveType = "other";
    }
  else if (keyCode == 87)
    {
      p1Choice = "W";
      p1ChoiceText = "Player 1 Has Decided!";
      p1MoveType = "movement";
    }
  else if (keyCode == 65)
    {
      p1Choice = "A";
      p1ChoiceText = "Player 1 Has Decided!";
      p1MoveType = "movement";
    }
  else if (keyCode == 83)
    {
      p1Choice = "S";
      p1ChoiceText = "Player 1 Has Decided!";
      p1MoveType = "movement";
    }
  else if (keyCode == 68)
    {
      p1Choice = "D";
      p1ChoiceText = "Player 1 Has Decided!";
      p1MoveType = "movement";
    }
 
  
  // player 2 commands
  if (keyCode == 55)
    {
      p2ChoiceText = "Player 2 Has Decided!";
      p2Choice = 1;
      p2MoveType = "ranged";
    }
  else if (keyCode == 56)
    {
      p2ChoiceText = "Player 2 Has Decided!";
      p2Choice = 2;
      p2MoveType = "melee";
    }
  else if (keyCode == 57)
    {
      p2ChoiceText = "Player 2 Has Decided!";
      p2Choice = 3;
      p2MoveType = "ranged";
    }
  else if (keyCode == 48)
    {
      p2ChoiceText = "Player 2 Has Decided!";
      p2Choice = 4;
      p2MoveType = "ranged";
    }
  else if (keyCode == 189)
    {
      p2ChoiceText = "Player 2 Has Decided!";
      p2Choice = 5;
      p2MoveType = "other";
    }
  else if (keyCode == 187)
    {
      p1ChoiceText = "Player 2 Has Decided!";
      p2Choice = 6;
      p2MoveType = "other";
    }
  else if (keyCode == 73)
    {
      p2Choice = "I";
      p2ChoiceText = "Player 2 Has Decided!";
      p2MoveType = "movement";
    }
  else if (keyCode == 74)
    {
      p2Choice = "J";
      p2ChoiceText = "Player 2 Has Decided!";
      p2MoveType = "movement";
    }
  else if (keyCode == 75)
    {
      p2Choice = "K";
      p2ChoiceText = "Player 2 Has Decided!";
      p2MoveType = "movement";
    }
  else if (keyCode == 76)
    {
      p2Choice = "L";
      p2ChoiceText = "Player 2 Has Decided!";
      p2MoveType = "movement";
    }
 
}

// damage: damages the given player by a given amount
function damage(targetedPlayer, damageAmount, playerSource)
{
  if (playerSource == 1)
    {
      damageAmount = damageAmount * p1DmgMult;
    }
  
  if (targetedPlayer == 1)
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

// interpretCommands: interpret the existing user playerChoice variables to see what command they gave, if any
// then, execute that command
function interpretCommands()
{
  
  // change all of the function calls to damage
  // to instead record this into a variable
  // damageToPlayer1 = 0;
  // ...
  // damage(1, 50, 2) --> this line of code says player 2 is attempting to damage player 1 with 50 damage
  // ... INSTEAD OF DOING THAT
  // lets change damageToPlayer1 = 50;
  // ...
  // and THEN, at the end of all this if/else stuff
  // we determine if either player tried to counter
  // if so, inflict the counter damage to the damaged target
  // otherwise, inflict damageToPlayer1 (or damageToPlayer2) to that player directly
  
  // NOTE: counters are considered melee attacks
  
  var dmgToP1 = 0;
  var dmgToP2 = 0;
  
  var p1Countering = false;
  var p2Countering = false;
  
  
  // player 1 commands
  if (p1Choice == 1 && showTimer == false)
    {
      p1ChoiceText = "Player 1 uses Fire Throw!";
      console.log("P1: ", p1MoveType);
      console.log("P2: ", p2MoveType);
      var fireThrow = Math.floor(Math.random() * 6);
      
      if (fireThrow == 1)
        {
          //damage(2, 50, 1);
          dmgToP2 = 50;
          setTimeout(function(){
            p1ChoiceText = "It hit one time!";
          }, 2000);
        }
      else if (fireThrow == 2)
        {
          //damage(2, 100, 1);
          dmgToP2 = 100;
          setTimeout(function(){
            p1ChoiceText = "It hit two times!";
          }, 2000);
        }
      else if (fireThrow == 3)
        {
          //damage(2, 150, 1);
          dmgToP2 = 150;
          setTimeout(function(){
            p1ChoiceText = "It hit three times!";
          }, 2000);
        }
      else if (fireThrow == 4)
        {
          //damage(2, 200, 1);
          dmgToP2 = 200;
          setTimeout(function(){
            p1ChoiceText = "It hit four times!";
          }, 2000);
        }
      else if (fireThrow == 5)
        {
          //damage(2, 250, 1);
          dmgToP2 = 250
          setTimeout(function(){
            p1ChoiceText = "It hit five times!";
          }, 2000);
        }
      else
        {
          //damage(2, 0, 1);
          setTimeout(function(){
            p1ChoiceText = "Player 2 dodged it!";
          }, 2000);
        }
    }
  else if (p1Choice == 2 && showTimer == false)
    {
      p1ChoiceText = "Player 1 uses Power Blast!";
      console.log("P1: ", p1MoveType);
      console.log("P2: ", p2MoveType);
      //damage(2, 200, 1);
      dmgToP2 = 200;
    }
  else if (p1Choice == 3 && showTimer == false)
    {
      p1ChoiceText = "Player 1 uses Sword Strike!";
      console.log("P1: ", p1MoveType);
      console.log("P2: ", p2MoveType);
      //damage(2, 150, 1);
      dmgToP2 = 150;
    }
  else if (p1Choice == 4 && showTimer == false)
    {
      p1ChoiceText = "Player 1 uses Fiery Counter!";
      console.log("P1: ", p1MoveType);
      console.log("P2: ", p2MoveType);
      
      p1Countering = true;
      
      /*
      if (p2MoveType == "melee")
        {
          //damage(2, 150, 1);
          dmgToP2 = 150;
          setTimeout(function(){
            p1ChoiceText = "Player 1 Successfully Countered!";
          }, 2000);
        }
      else
        {
          setTimeout(function(){
            p1ChoiceText = "Player 1's Counter Failed!";
          }, 2000);
        }
      */
    }
  else if (p1Choice == 5 && showTimer == false)
    {
      p1ChoiceText = "Player 1 uses Steam Up!";
      console.log("P1: ", p1MoveType);
      console.log("P2: ", p2MoveType);
      p1DmgMult = p1DmgMult * 1.5;
    }
  else if (p1Choice == 6 && showTimer == false)
    {
      p1ChoiceText = "Player 1 uses Heat Shield!";
      console.log("P1: ", p1MoveType);
      console.log("P2: ", p2MoveType);
    }
  else if (p1Choice == "W" && showTimer == false)
    {
      p1ChoiceText = "Player 1 moves to the Red Platform!";
      console.log("P1: ", p1MoveType);
      console.log("P2: ", p2MoveType);
      player1X = platformXYs.red[0];
      player1Y = platformXYs.red[1];
    }
  else if (p1Choice == "A" && showTimer == false)
    {
      p1ChoiceText = "Player 1 moves to the Yellow Platform!";
      console.log("P1: ", p1MoveType);
      console.log("P2: ", p2MoveType);
      player1X = platformXYs.yellow[0];
      player1Y = platformXYs.yellow[1];
    }
  else if (p1Choice == "S" && showTimer == false)
    {
      p1ChoiceText = "Player 1 moves to the Ground!";
      console.log("P1: ", p1MoveType);
      console.log("P2: ", p2MoveType);
      player1X = platformXYs.ground[0];
      player1Y = platformXYs.ground[1];
    }
  else if (p1Choice == "D" && showTimer == false)
    {
      p1ChoiceText = "Player 1 moves to the Blue Platform!";
      console.log("P1: ", p1MoveType);
      console.log("P2: ", p2MoveType);
      player1X = platformXYs.blue[0];
      player1Y = platformXYs.blue[1];
    }
  else
    {
      p1ChoiceText = "Player 1 did not decide!";
      console.log("P1: ", p1MoveType);
      console.log("P2: ", p2MoveType);
    }
  
  // player 2 commands
  if (p2Choice == 1 && showTimer == false)
    {
      p2ChoiceText = "Player 2 uses Icicle Toss!";
      console.log("P1: ", p1MoveType);
      console.log("P2: ", p2MoveType);
      var icicleToss = Math.floor(Math.random() * 6);
      
      if (icicleToss == 1)
        {
          //damage(1, 50, 2);
          dmgToP1 = 50;
          setTimeout(function(){
            p2ChoiceText = "It hit one time!";
          }, 2000);
        }
      else if (icicleToss == 2)
        {
          //damage(1, 100, 2);
          dmgToP1 = 100;
          setTimeout(function(){
            p2ChoiceText = "It hit two times!";
          }, 2000);
        }
      else if (icicleToss == 3)
        {
          //damage(1, 150, 2);
          dmgToP1 = 150;
          setTimeout(function(){
            p2ChoiceText = "It hit three times!";
          }, 2000);
        }
      else if (icicleToss == 4)
        {
          //damage(1, 200, 2);
          dmgToP1 = 200;
          setTimeout(function(){
            p2ChoiceText = "It hit four times!";
          }, 2000);
        }
      else if (icicleToss == 5)
        {
          //damage(1, 250, 2);
          dmgToP1 = 250;
          setTimeout(function(){
            p2ChoiceText = "It hit five times!";
          }, 2000);
        }
      else
        {
          setTimeout(function(){
            p2ChoiceText = "Player 1 dodged it!";
          }, 2000);
        }
    }
  else if (p2Choice == 2 && showTimer == false)
    {
      p2ChoiceText = "Player 2 uses Iceberg Crush!";
      dmgToP1 = 150;
      console.log("P1: ", p1MoveType);
      console.log("P2: ", p2MoveType);
    }
  else if (p2Choice == 3 && showTimer == false)
    {
      p2ChoiceText = "Player 2 uses Ice Breath!";
      console.log("P1: ", p1MoveType);
      console.log("P2: ", p2MoveType);
    }
  else if (p2Choice == 4 && showTimer == false)
    {
      p2ChoiceText = "Player 2 uses Icy Reflect!";
      console.log("P1: ", p1MoveType);
      console.log("P2: ", p2MoveType);
      
      p2Countering = true;
      
      /*
      if (p1MoveType == "ranged")
        {
          //damage(1, 150, 2);
          dmgToP1 = 150;
          setTimeout(function(){
            p2ChoiceText = "Player 2 Successfully Reflected!";
          }, 2000);
        }
      else
        {
          setTimeout(function(){
            p2ChoiceText = "Player 2's Reflect Failed!";
          }, 2000);
        }
      */
    }
  else if (p2Choice == 5 && showTimer == false)
    {
      p2ChoiceText = "Player 2 uses Frozen Mystery!";
      console.log("P1: ", p1MoveType);
      console.log("P2: ", p2MoveType);
    }
  else if (p2Choice == 6 && showTimer == false)
    {
      p2ChoiceText = "Player 2 uses Ice Wall!";
      console.log("P1: ", p1MoveType);
      console.log("P2: ", p2MoveType);
    }
  else if (p2Choice == "I" && showTimer == false)
    {
      p2ChoiceText = "Player 2 moves to the Red Platform!";
      console.log("P1: ", p1MoveType);
      console.log("P2: ", p2MoveType);
      player2X = platformXYs.red[2];
      player2Y = platformXYs.red[3];
    }
  else if (p2Choice == "J" && showTimer == false)
    {
      p2ChoiceText = "Player 2 moves to the Yellow Platform!";
      console.log("P1: ", p1MoveType);
      console.log("P2: ", p2MoveType);
      player2X = platformXYs.yellow[2];
      player2Y = platformXYs.yellow[3];
    }
  else if (p2Choice == "K" && showTimer == false)
    {
      p2ChoiceText = "Player 2 moves to the Ground!";
      console.log("P1: ", p1MoveType);
      console.log("P2: ", p2MoveType);
      player2X = platformXYs.ground[2];
      player2Y = platformXYs.ground[3];
    }
  else if (p2Choice == "L" && showTimer == false)
    {
      p2ChoiceText = "Player 2 moves to the Blue Platform!";
      console.log("P1: ", p1MoveType);
      console.log("P2: ", p2MoveType);
      player2X = platformXYs.blue[2];
      player2Y = platformXYs.blue[3];
    }
  else
    {
      p2ChoiceText = "Player 2 did not decide!";
      console.log("P1: ", p1MoveType);
      console.log("P2: ", p2MoveType);
    }
  
  
  // NOTE: we likely need to change how the multi hit moves report multi hits with countering
  
  // Countering
  if (p1Countering && !p2Countering && p2MoveType == "melee")
    {
      dmgToP2 = dmgToP1;
      dmgToP1 = 0;
    }
  else if (p2Countering && !p1Countering && p1MoveType == "ranged")
    {
      dmgToP1 = dmgToP2;
      dmgToP2 = 0;
    }
  
}


