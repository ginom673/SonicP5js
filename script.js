// NOTE: we currently have issues with sonic following the slope
// this is mainly dealing with the code inside main-game.js 
// the code with the comment "calculate sonic's position along slope"
// there is an issue with calculating dx
// what we currently have seems wrong
// dx should be based on how much sonic's x value changed between now and the last frame
// this lets us then calculate how much his y should change (dy) given the slope
// we probably have to do some trig here to figure out how much his x changed given the angle of the slope
// this also may have to do with any code involving vx (and maybe vy I guess) ... we may have to restrucutre how some of the key processing works
// so that its not just directly changing vx
// but perhaps has a separate speedX property which says how much sonic would move along a flat line

// NOTE (10.15.22): I suspect there is an issue with the math behind our line/rectangle collisions or something low-level like that
// because sonic just seems to collide with the bottom line of a tile for no reason
// maybe it does some weird stuff around corners?

// preload is called at beginning of project to load assets
// preload is before setup which is before draw
function preload()
{
  soundFormats('wav');
  deathNoise = loadSound("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FDeath_Noise.wav?v=1614451645973");
  jumpSound = loadSound("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FJump.wav?v=1615058718554");
  breakNoise = loadSound("https://cdn.glitch.com/ea9bc5ca-f0db-4943-a3bc-98bfee9731e7%2FSonic_Break.wav?v=1620498192001");
  spindashSound = loadSound("https://cdn.glitch.com/ea9bc5ca-f0db-4943-a3bc-98bfee9731e7%2FSpindash_Roll.wav?v=1633200214366");
  spindashSound.setVolume(0.1);
  goalRingSound = loadSound("https://cdn.glitch.com/ea9bc5ca-f0db-4943-a3bc-98bfee9731e7%2FGiant_Ring_Enter.wav?v=1633200668684");
  ringGetSound = loadSound("https://cdn.glitch.com/ea9bc5ca-f0db-4943-a3bc-98bfee9731e7%2FRing_Get.wav?v=1631917855174");
  transformSound = loadSound("https://cdn.glitch.global/ea9bc5ca-f0db-4943-a3bc-98bfee9731e7/S3K_9F.wav?v=1654970477900");
  bg = loadImage("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGreen_Hill_Zone_Background.png?v=1612035845018");
  sonicHUD = loadFont("https://cdn.glitch.global/ea9bc5ca-f0db-4943-a3bc-98bfee9731e7/sonic-hud-globalspaced-1-1.ttf?v=1658872555294");
}

// setup is called at beginning of project (AFTER preload though) for additional setup
// setup is after preload, before draw
function setup()
{
  
  // set up screen dimensions
  createCanvas(screenWidth,screenHeight);
  
  // set up main game assets
  setupGame();
  
  // set up drawing mode assets
  setupDrawing();
  
  // initialize the tile hitbox data
  initTileData();
  
}

// draw is called constantly to render everything on screen
// typically it seems that the order we fall is - update, draw, autoscroll
function draw()
{
  
  if(clearConsole == true)
  {

  }
  
  if (drawingMode == true)
  {
    drawDrawing();
  }
  else
  {
    drawGame();
  }
  
  var slopeLine = new Line2D( new Point(14, 429), new Point(142, 557));
  var midpoint = new Point(132, 559.5);
  // alert(line_intersects_point(slopeLine, midpoint));
  
  // generate an error
  // throw new Error();
  
}

// handles the mouse being pressed down
function mousePressed()
{
  if (drawingMode == true)
  {
    mousePressedDrawing();
  }
  else
  {
    //mousePressedGame();
  }
}

// handles the mouse being pressed down
function mouseReleased()
{
  if (drawingMode == true)
  {
    mouseReleasedDrawing();
  }
  else
  {
    //mouseReleasedGame();
  }
}

function keyPressed()
{
  if (drawingMode == false)
  {
    keyPressedGame();
  }
  else
  {
    //keyPressedDrawing();
  }
}
function keyReleased()
{
  if (drawingMode == false)
  {
    keyReleasedGame();
  }
  else
  {
    keyReleasedDrawing();
  }
}