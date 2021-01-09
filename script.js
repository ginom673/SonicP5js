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

// screen dimensions
var screenWidth = 1200;
var screenHeight = 640;

// platform list
var platforms = [];

// Player class
class Player
{  
  
  // Player constructor
  constructor(x, y, vx, vy, onGround, imgName, w, h)
  {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.onGround = onGround;
    this.imgName = imgName;
    this.w = w;
    this.h = h;
  }
  
  // jump
  jump()
  {
    // prevent double-jumping; if player tries to jump while in midair, do nothing
    if (this.onGround == false) 
    {
      return;
    }    
    this.onGround = false;
    this.vy = -10;
    // set sonic's y to itself minus 10
    this.y = this.y - 10;
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
        this.y = platform.tiles[i].y - this.h;
        this.vy = 0;
        this.onGround = true;
      }
      else if (collisionStatus == 'bottom')
      {
        this.vy = 0;
      }
      else if (collisionStatus == 'left' && this.vx > 0)
      {
        console.log("left");
        this.vx = 0;
      }
      else if (collisionStatus == 'right' && this.vx < 0)
      {
        console.log("right");
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
    var platformCollisions = [];
    for (var i=0; i < platforms.length; i++)
    {
      var tileCollisions = sonic.checkPlatformCollision(platforms[i]);
      platformCollisions.push(tileCollisions);
    }
    return platformCollisions;
  }  
  
}

// Platform class - essentially a sequence of tiles
class Platform
{
  
  // Platform constructor
  // (x,y) is the top-left corner of this platform
  // tileWidth - how many tiles wide/long it is 
  // (UNUSED) tileHeight - how many tiles high it is ... this can be < 1, i.e. 0.5
  constructor(x, y, tileWidth, tileHeight, tileImgName)
  {
    // setup properties
    this.x = x;
    this.y = y;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.tileImageName = tileImgName;
    this.tiles = [];
    
    // create a for loop that repeats tileWidth times
    for (var i = 0; i < tileWidth; i++)
    {
      var theTile = new Tile(x + (i * tileDefaultW), y, tileImgName);
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

// controls default Tile size
var tileDefaultW = 128;
var tileDefaultH = 128;

// variables that control the offset for the tiles
// there is a bug with an unknown cause that is making the hitboxes innacurate
// this is a simple fix to that
var tileHorizontalOffset = -35;
var tileVerticalOffset = -35;

// Tile class
class Tile
{  
  
  // Tile constructor
  constructor(x, y, imgName)
  {
    this.x = x;
    this.y = y;
    this.w = tileDefaultW; // use default width
    this.h = tileDefaultH; // use default height
    this.imgName = imgName;
    
    // load image for this Tile
    this.image = loadImage("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2Fgreen_hill_ground_flat.png?v=1601140825013");     
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
  var dx=(r1.x+r1.w/2)-(r2.x+r2.w/2);
  var dy=(r1.y+r1.h/2)-(r2.y+r2.h/2);
  var width=(r1.w+r2.w)/2;
  var height=(r1.h+r2.h)/2;
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

function setup()
{
  createCanvas(screenWidth,screenHeight);
  platform1 = new Platform(0, groundY, 20, 1, "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2Fgreen_hill_ground_flat.png?v=1601140825013");    
  platform2 = new Platform(200, groundY - 50, 2, 1, "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2Fgreen_hill_ground_flat.png?v=1601140825013");
  sonicImgNormal = createImg("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FSonic_Run.gif?v=1599326604172");
  sonicImgNormal.position(100, 500);  
  sonic = new Player(100, 200, 0, 0, false, "sprite", 64, 72);    
}

// NOTE FOR MOVEMENT: constantly add sonic's vx to his x
function draw()
{
  
  clear();
  
  background("#82ebed");
  
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
    sonic.y = sonic.y + sonic.vy;
  }
  
  // update sonic horizontal position
  sonic.x = sonic.x + sonic.vx;
  //collisions = sonic.checkPlatformCollisions();
  sonic.checkPlatformCollisions();
  // console.log(collisions);
  // NOTE: unable to fall off cliff because left/right collisions here
  /*
  if (collisions.includes('left') || collisions.includes('right'))
  {
    console.log("triggered");
    sonic.x = sonic.x - sonic.vx;
  }
  */
  
  // display platforms
  for (var i=0; i < platforms.length; i++)
  {
    platforms[i].display();
  }
  
  // draw sonic image
  sonicImgNormal.position(sonic.x, sonic.y);  
  
  // display certain information in "developerMode" i.e. hitboxes, stats
  if (developerMode)
  {
    
    // draw sonic hitbox for debugging
    // shift the rectangle and draw it at sonic.x - (sonic.w/2), sonic.y - (sonic.h/2)
    noFill();
    rect(sonic.x - sonic.w/2, sonic.y - sonic.h/2, sonic.w, sonic.h);
    
    // draw the tile hitboxes for debugging
    for (var i = 0; i < platforms.length; i++)
    {
      for (var j = 0; j < platforms[i].tiles.length; j++)
      {  
        var currentTile = platforms[i].tiles[j];
        rect(currentTile.x + tileHorizontalOffset, currentTile.y + tileVerticalOffset, currentTile.w, currentTile.h);
      }
    }
    
    // display statistics for debugging
    fill(0, 0, 0);
    textSize(24);
    text("x: " + sonic.x.toFixed(2), 1000, 100);
    text("y: " + sonic.y.toFixed(2), 1000, 125);
    text("vx: " + sonic.vx.toFixed(2), 1000, 150);
    text("vy: " + sonic.vy.toFixed(2), 1000, 175);
    text("onGround: " + sonic.onGround, 1000, 200);
  }

  
} 

function keyPressed()
{
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