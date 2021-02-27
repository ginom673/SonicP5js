// GLOBAL VARIABLES

// developerMode determines whether or not we display hitboxes and statistics
var developerMode = true;

// image object for Sonic's idle stance
var sonicImgNormal;

// y position of ground
var groundY = 484;

// gravity effect
var gravity = 0.4;

// image variable for background
var background1;
var bg;

// screen dimensions
var screenWidth = 1200;
var screenHeight = 640;

// platform list
var platforms = [];

// platform autoscrolling rate
var autoscrollRate = 5;

// max falling speed
var maxFallSpeed = 15;

// max flying speed
var maxFlySpeed = -15;

// motobug enemy
var motobug;

// finish line
var finishLine;

// sounds
var deathNoise;

// Character class
class Character
{  
  
  // Character constructor
  // constructor(x, y, w, h, hx, hy, hw, hh, onGround, 
  constructor(x, y, vx, vy, onGround, imgName, w, h, hx, hy, hw, hh, isGif)
  {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.onGround = onGround;
    this.isGif = isGif;
    this.hx = hx;
    this.hy = hy;
    this.hw = hw;
    this.hh = hh;
    /*  
    // sonicImgNormal = createImg("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FSonic_Run.gif?v=1599326604172");
    // sonicImgNormal.position(100, 500);  
    */
    this.imgName = imgName;
    this.img = createImg(imgName);
    this.img.position(x,y);
    this.w = w;
    this.h = h;
    
    // whether or not character is considered living
    this.isAlive = true;
    
    // whether or not this character uses collisions
    this.hitboxActive = true;
    
    // whether or not this character's image should be displayed
    // (the Character object could be hidden but still interactable)
    this.visible = true;
  }
  
  // used by draw() to display character
  display()
  {
    
    if (!this.visible)
    {
      this.img.remove();
      return;
    }
    
    if(this.isGif)
    {
      this.img.position(this.x, this.y);      
    }
    else
    {
      image(this.image, this.x, this.y);
    }    
  }
  
  // jump
  jump()
  {
    // prevent double-jumping; if character tries to jump while in midair, do nothing
    if (this.onGround == false) 
    {
      return;
    }    
    this.onGround = false;
    this.vy = -12;
    // initial change in position to get us off ground, avoiding immediate collision detection with tile we are on
    this.y = this.y + this.vy;
    this.hy = this.hy + this.vy;
  }
  
  // this checks collision between Sonic and ONE of the platforms
  // NOTE: if the game is slowing down, consider not adding the "none" collision case to the tileCollisions list
  checkPlatformCollision(platform)
  {
    
    var tileCollisions = [];
    for (var i=0; i < platform.tiles.length; i++)
    {  
      
      var collisionStatus = collide(sonic, platform.tiles[i]);
      
      /*
      if(platform.tileImageName == "tile 1")
      {
        // var adjustedHitbox = platform.tiles[i];
        // adjustedHitbox.y = adjustedHitbox.y + adjustedHitbox.h/2;
        // adjustedHitbox.h = adjustedHitbox.h/2; 
        var originalY = platform.tiles[i].y;
        var originalH = platform.tiles[i].h; 
        platform.tiles[i].y = platform.tiles[i].y + platform.tiles[i].h/2;
        platform.tiles[i].h = platform.tiles[i].h/2;
        var collisionStatus = collide(sonic, platform.tiles[i]);    
        platform.tiles[i].y = originalY;
        platform.tiles[i].h = originalH;
      }
      else
      {
        var collisionStatus = collide(sonic, platform.tiles[i]);    
      }
      */
      
      /*
      if (collisionStatus != 'none')
      {
        // sloppy workaround - set sonic's y based on the tile's y position that we collided with
        // NOTE: commenting this out seems to produce different collision effects
        this.y = platform.tiles[i].y - this.h;
        this.onGround = true;
        return collisionStatus;
      }
      */
      if (collisionStatus == 'top')
      {
        this.y = platform.tiles[i].hy - this.hh;
        this.hy = platform.tiles[i].hy - this.hh;
        this.vy = 0;
        this.onGround = true;
      }
      else if (collisionStatus == 'bottom')
      {
        this.vy = 0;
      }
      else if (collisionStatus == 'left' && this.vx > 0)
      {
        // alert("left");
        this.vx = 0;
      }
      else if (collisionStatus == 'right' && this.vx < 0)
      {
        // alert("right");
        this.vx = 0;  
      }
      tileCollisions.push(collisionStatus);      
    }
    return tileCollisions;
  }
  
  // this checks collision between Sonic and ALL of the platforms
  // sonic.checkPlatformsCollision()
  checkPlatformCollisions()
  {    
    
    // if hitBoxActive is false, return
    if (!this.hitboxActive)
    {
      return [];
    }
    
    var platformCollisions = [];
    for (var i=0; i < platforms.length; i++)
    {
      var tileCollisions = this.checkPlatformCollision(platforms[i]);
      platformCollisions.push(tileCollisions);
    }
    return platformCollisions;
  }  
  
}

class Obstacle
{
  constructor(x, y, w, h, imgName)
  {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.imgName = imgName;
    
    this.image = loadImage(imgName);
  }
  
  display()
  {
    image(this.image, this.x, this.y);  
  }
  
}

// Platform class - essentially a sequence of tiles
class Platform
{
  
  // Platform constructor
  // (x,y) is the top-left corner of this platform
  // tilesLong - how many tiles wide/long it is 
  // (UNUSED) tilesHigh - how many tiles high it is ... this can be < 1, i.e. 0.5
  constructor(x, y, tilesLong, tilesHigh, tileImgName)
  {
    // setup properties
    this.x = x;
    this.y = y;
    this.tilesLong = tilesLong;
    this.tilesHigh = tilesHigh;
    this.tileImageName = tileImgName;
    this.tiles = [];
    
    // create a for loop that repeats tileWidth times
    for (var i = 0; i < tilesLong; i++)
    {
      
      // add an if statement
      if(tileImgName == "flat ground")
      {
        var theTile = new Tile(x + (i * 128), y, 128, 128, x + (i * 128), y, 128, 128, "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2Fgreen_hill_ground_flat.png?v=1601140825013");
      }  
      else if(tileImgName == "floating platform")
      {
        var theTile = new Tile(x + (i * 128), y, 128, 60, x + (i * 128), y, 128, 60, "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGreen_Hill_Floating_Platform_1.png?v=1610821946600");
      }
      else if(tileImgName == "tile 1")
      {
        var theTile = new Tile(x + (i * 514), y, 514, 512, x + (i * 514), y + 256, 514, 256, "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGreen_Hill_Tile1.png?v=1611428513830");
      }
      else
      {
        console.log("Unrecognized tile name: " + tileImgName)
      }      
      
      this.tiles.push(theTile);      
    }
    
    // add this to platforms list
    platforms.push(this);
  }
  
  // display this Platform by displaying each of tiles  
  display()
  {   
    for (var i = 0; i < this.tiles.length; i++)
    {
      var tile = this.tiles[i];
      tile.draw();
    }
  }
  
  // adds newTile Tile object to this Platform object's tiles list
  addTile(newTile)
  {
    this.tiles.push(newTile);
  }
  
}

// global variables for Platform objects
var platform1;
var platform2;
var platform3;
var platform4;

// controls default Tile size
/*
var tileDefaultW = 128;
var tileDefaultH = 128;
*/

// variables that control the offset for the tiles
// there is a bug with an unknown cause that is making the hitboxes innacurate
// this is a simple fix to that
var tileHorizontalOffset = -35;
var tileVerticalOffset = -35;

// Tile class
class Tile
{  
  
  // Tile constructor
  constructor(x, y, w, h, hx, hy, hw, hh, imgName)
  {
    this.x = x;
    this.y = y;
    this.w = w; 
    this.h = h;
    this.hx = hx;
    this.hy = hy;
    this.hw = hw; 
    this.hh = hh;
    this.imgName = imgName;
    
    // load image for this Tile
    this.image = loadImage(imgName);     
  }
  
  // draws this tile's image @ (x,y)
  // NOTE: we have a "sloppy workaround" here that draws the tile @ (x, y+20) so the image
  // more properly aligns with where the collision is happening
  // this is a sloppy fix to the "gap" bug
  draw()
  {
    image(this.image, this.x + tileHorizontalOffset, this.y + tileVerticalOffset);
  }
}

var sonic;

// taken from https://stackoverflow.com/questions/29861096/detect-which-side-of-a-rectangle-is-colliding-with-another-rectangle
function collide(r1,r2)
{
  var dx=(r1.hx+r1.hw/2)-(r2.hx+r2.hw/2);
  var dy=(r1.hy+r1.hh/2)-(r2.hy+r2.hh/2);
  var width=(r1.hw+r2.hw)/2;
  var height=(r1.hh+r2.hh)/2;
  var crossWidth=width*dy;
  var crossHeight=height*dx;
  var collision='none';
  if(Math.abs(dx)<=width && Math.abs(dy)<=height){
      if(crossWidth>crossHeight){
          collision=(crossWidth>(-crossHeight))?'bottom':'left';        
      }else{
          collision=(crossWidth>-(crossHeight))?'right':'top';
      }
  }
  return(collision);
}

var tile1;

function preload()
{
  soundFormats('wav');
  deathNoise = loadSound("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FDeath_Noise.wav?v=1614451645973");
}

function setup()
{
  createCanvas(screenWidth,screenHeight);  
  
  bg = loadImage("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGreen_Hill_Zone_Background.png?v=1612035845018");
  
  // tile name ---> "green hill ground"
  // "green hill float"
  // image name ---> https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2Fgreen_hill_ground_flat.png?v=1601140825013
  
  platform1 = new Platform(0, groundY, 20, 1, "flat ground");    
  platform2 = new Platform(200, groundY - 50, 2, 1, "flat ground");
  platform3 = new Platform(1500, groundY - 150, 1, 1, "floating platform");
  platform4 = new Platform(2014, groundY - 276, 1, 1, "tile 1");
  // sonicImgNormal = createImg("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FSonic_Run.gif?v=1599326604172");
  // sonicImgNormal.position(100, 500);  
  
  // character constructor template
  // constructor(x, y, vx, vy, onGround, imgName, w, h, hx, hy, hw, hh, isGif)
  // sonic = new Character(100, 200, 0, 0, false, "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FSonic_Run.gif?v=1599326604172", 64, 72, 100, 180, 64, 72, true);
  sonic = new Character(100, groundY - 72, 0, 0, false, "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FSonic_Run.gif?v=1599326604172", 64, 72, 100, groundY - 72, 64, 72, true);
  motobug = new Character(2000, 50, 0, 0, false, "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FMotobug.gif?v=1604167748294", 80, 58, 2000, 50, 80, 58, true);
  finishLine = new Obstacle(2000, groundY - 64, 16, 64, "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2F59c351cb9c3fc.jpg?v=1613848214467");
}

// NOTE FOR MOVEMENT: constantly add sonic's vx to his x
var reported = false; // debugging
function draw()
{
  
  clear();
  
  //background("#82ebed");
  background(bg);
  var borderWidth = 6;
  stroke(borderWidth);
  noFill();
  
  // collisions
  var collisions = sonic.checkPlatformCollisions();  
  //console.log(collisions);
  // NOTE: later we probably need to change this to collisionStatus == "top" or something
  // NOTE: would collisions == [] work?
  /*
  if (collisions.length == 0)
  {
    sonic.onGround = false;
  }
  */
  
  // create a boolean variable called collideAny
  var collided = false;
  for (var i=0; i < collisions.length; i++)
  {    
    var tileCollisions = collisions[i];    
    for (var j=0; j < tileCollisions.length; j++)
    {
      // grab the item @ position j from tileCollisions and store that into a variable called collisionStatus
      var collisionStatus = tileCollisions[j];
      // if collisionStatus is not none, set collided to true
      if (collisionStatus != 'none')
      {
        collided = true;
      }
    }    
  }
  
  // if collided is false, set onGround to false
  if (!collided)
  {
    sonic.onGround = false;
  }
  
  // if in air, update sonic vertical position and speed
  if(!sonic.onGround)
  {
    sonic.vy = sonic.vy + gravity;
    if(sonic.vy > maxFallSpeed)
    {
      sonic.vy = maxFallSpeed;
    }
    if(sonic.vy < maxFlySpeed)
    {
      sonic.vy = maxFlySpeed;
    }
    sonic.y = sonic.y + sonic.vy;
    sonic.hy = sonic.hy + sonic.vy;
  }
  
  // add an if statement that checks if sonic's y is >= screenHeight
  // if so alert "im ded"
  if (sonic.y >= screenHeight)
  {
    // alert("im ded lol so u suck @ dis game. git rekt m8.");
    
    // play sound effect (later)
    // swap image (later)
    
    
    if(sonic.isAlive) 
    {
      sonic.isAlive = false;
      sonic.hitboxActive = false;
      sonic.vy = -20;
      sonic.vx = 0;
      deathNoise.play();
      // set sonic.imgname to the link for the image
      // reload sonic.img property
      // set sonic.w to the width of new image
      // set sonic.h to height of new image
      sonic.imgName = "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FSonic_Death.png?v=1614455168212";
      sonic.img = loadImage(sonic.imgName);
      sonic.isGif = false;
      sonic.w = 66;
      sonic.h = 80;
    }
    else
    {
      sonic.visible = false;
    }
    
  }
  // update sonic horizontal position
  sonic.x = sonic.x + sonic.vx;
  // update hbx by vx
  sonic.hx = sonic.hx + sonic.vx;
  
  
  
  // console.log(collisions);
  // add a for loop that goes through all platforms in collisions lists
  // NOTE: if we collide with two platforms from the left, wouldn't this cause us to scoot to the left too fast?
  for (var i=0; i < collisions.length; i++)
  {
    if(collisions[i].includes("left"))
    {
      sonic.x = sonic.x - autoscrollRate;
      sonic.hx = sonic.hx - autoscrollRate;
    }
  }
  
  
  // drag sonic by auto scroll rate
  
  
  //collisions = sonic.checkPlatformCollisions();
  //sonic.checkPlatformCollisions();
  // console.log(collisions);
  // NOTE: unable to fall off cliff because left/right collisions here
  /*
  if (collisions.includes('left') || collisions.includes('right'))
  {
    console.log("triggered");
    sonic.x = sonic.x - sonic.vx;
  }
  */
  
  // autoscroll platforms and enemies
  for (var i=0; i < platforms.length; i++)
  {
    for (var j=0; j < platforms[i].tiles.length; j++)
    {
      platforms[i].tiles[j].x = platforms[i].tiles[j].x - autoscrollRate;
      platforms[i].tiles[j].hx = platforms[i].tiles[j].hx - autoscrollRate;
      motobug.x = motobug.x - autoscrollRate;
      motobug.hx = motobug.hx - autoscrollRate;
    }
  }
  
  // display platforms
  for (var i=0; i < platforms.length; i++)
  {
    platforms[i].display();
  }
  
  // draw sonic image
  sonic.display();
  motobug.display();
  finishLine.display();
  
  //sonicImgNormal.position(sonic.x, sonic.y);  
  
  // display certain information in "developerMode" i.e. hitboxes, stats
  if (developerMode)
  {
    
    // draw sonic hitbox for debugging
    // shift the rectangle and draw it at sonic.x - (sonic.w/2), sonic.y - (sonic.h/2)
    // NOTE: why did we originally subtract by w/2, h/2? sonic's (x,y) is top-left corner of rectangle
    noFill();
    // rect(sonic.x - sonic.w/2, sonic.y - sonic.h/2, sonic.w, sonic.h);
    if (sonic.hitboxActive)
    {
      rect(sonic.hx - sonic.w/2, sonic.hy - sonic.h/2, sonic.hw, sonic.hh);
    }
    
    
    // draw the tile hitboxes for debugging
    stroke(255,0,0);
    strokeWeight(5);
    for (var i = 0; i < platforms.length; i++)
    {
      for (var j = 0; j < platforms[i].tiles.length; j++)
      {  
        var currentTile = platforms[i].tiles[j];
        rect(currentTile.hx + tileHorizontalOffset, currentTile.hy + tileVerticalOffset, currentTile.hw, currentTile.hh);
        // console.log(platforms[i]);
        
        /*
        if(platforms[i].tileImageName == "tile 1")
        {
          // console.log("tile 1");
          /*var adjustedHitbox = platforms[i].tiles[j];
          adjustedHitbox.y = adjustedHitbox.y + adjustedHitbox.h/2;
          adjustedHitbox.h = adjustedHitbox.h/2;
          // rect(platforms[i].tiles[j].x + tileHorizontalOffset, platforms[i].tiles[j].y + platforms[i].tiles[j].h/2 + tileVerticalOffset, platforms[i].tiles[j].w, platforms[i].tiles[j].h/2);
          rect(platforms[i].tiles[j].hx + tileHorizontalOffset, platforms[i].tiles[j].hy + tileVerticalOffset, platforms[i].tiles[j].hw, platforms[i].tiles[j].hh);
          if(!reported)
          {
            console.log(adjustedHitbox);
            console.log(platforms[i].tiles[j]);          
            reported = true;    
          }

        }
        else
        {
          // rect(currentTile.x + tileHorizontalOffset, currentTile.y + tileVerticalOffset, currentTile.w, currentTile.h);
          rect(currentTile.hx + tileHorizontalOffset, currentTile.hy + tileVerticalOffset, currentTile.hw, currentTile.hh);
        }     
        */
        
      }
    }
    
    // display statistics for debugging
    fill(150, 150, 150);
    stroke(0,0,0);
    strokeWeight(3);
    textSize(24);
    strokeWeight(1);
    text("x: " + sonic.x.toFixed(2), 1000, 100);
    text("y: " + sonic.y.toFixed(2), 1000, 125);
    text("vx: " + sonic.vx.toFixed(2), 1000, 150);
    text("vy: " + sonic.vy.toFixed(2), 1000, 175);
    text("onGround: " + sonic.onGround, 1000, 200);   
    
    
    
  }

  
} 

function keyPressed()
{
  
  // ignore keys if dead
  if (!sonic.isAlive)
  {
    return;
  }
  
  if (keyCode == 90)
  {
    sonic.jump();
  }
  else if (keyCode == 39)
  {
    sonic.vx = 5;
  }
  else if (keyCode == 37)
  {
    sonic.vx = -5;
  }
}

// NOTE: set sonic.vx back to 0 if left arrow or right arrow key was just released
function keyReleased()
{
  
  // ignore keys if dead
  if (!sonic.isAlive)
  {
    return;
  }
  
  if (keyCode == 39)
  {
    sonic.vx = 0;
  }
  else if (keyCode == 37)
  {
    sonic.vx = 0;
  }
}

/*
function mouseReleased()
{
  alert(mouseX + " " + mouseY);
}
*/