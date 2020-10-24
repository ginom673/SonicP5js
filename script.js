// GLOBAL VARIABLES

// image object for Sonic's idle stance
var sonicImgIdle;

// y position of ground
var groundY = 448;

// gravity effect
var gravity = 0.4;

// image variable for background
var background1;

var screenWidth = 1200;
var screenHeight = 640;

// Player class
class Player
{  
  
  // Player constructor
  constructor(x, y, vx, vy, onGround, imgName)
  {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.onGround = onGround;
    this.imgName = imgName;
  }
  
  jump()
  {
    // prevent double-jumping
    // if player tries to jump while in midair, do nothing
    if (this.onGround == false) 
    {
      return;
    }    
    this.onGround = false;
    this.vy = -10;    
  }
}

// Platform class - essentially a sequence of tiles
class Platform
{
  
  // Platform constructor
  constructor(x, y, width, height, fill)
  {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fill = fill;
    this.tiles = [];
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
var tileDefaultW = 64;
var tileDefaultH = 64;

// Tile class
class Tile
{  
  
  // Tile constructor
  constructor(x, y, color, imgName)
  {
    this.x = x;
    this.y = y;
    this.w = tileDefaultW; // use default width
    this.h = tileDefaultH; // use default height
    this.color = color;
    this.imgName = imgName;
    
    // load image for this Tile
    this.image = createImg("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2Fgreen_hill_ground_flat.png?v=1601140825013"); 
    this.image.position(100, 500);
    this.image.remove();
    
  }
  
  // draws this tile's image @ (x,y)
  draw()
  {
    image(this.image, this.x, this.y);
  }
}

// w
var tile1;

// create a variable groundY and set it to sonic's starting position
// create a variable gravity and set it to -0.2
// create a function called jump()
// within jump, set sonic's onGround property to false
// and also set sonic's vy to 5
// then within our draw function, add code which:
// 1 - increases sonic's y by vy
// 2 - decreases sonic's vy by gravity
// 3 - checks if sonic's y is <= groundY. if so, set vy to 0.
// lastly, add code in our jump() function that checks if sonic is NOT onGround
// if so, return (jump does nothing if we are already in the air)

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
  //
  if(Math.abs(dx)<=width && Math.abs(dy)<=height){
      if(crossWidth>crossHeight){
          collision=(crossWidth>(-crossHeight))?'bottom':'left';
        
          // this is equivalent to:
          /*
          if (crossWidth>(-crossHeight))
          {
            collision = 'bottom';
          }
          else
          {
            collision = 'left';
          }
          */
        
        
      }else{
          collision=(crossWidth>-(crossHeight))?'right':'top';
      }
  }
  return(collision);
}

function setup()
{
  //createCanvas(1280,721);  
  createCanvas(screenWidth,screenHeight);  
  
  //background1 = createImg("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2Fgreen_hill_background_loop.gif?v=1601145979742");
  //background1.position(38, 38);
  //background1.size(1200, 776);
  
  //background1.remove();
  //background1 = loadImage("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2Fgreen_hill_background_loop.gif?v=1601145979742");
  
  //fill("#32a83a");
  // create a platform object using these values
  
  // let's create a platform object where
  // the values you gave here for a rectangle
  // will actually be given directly to the Platform constructor
  platform1 = new Platform(0, 600, 1150, 20, "#32a83a");
  
  // platform1.addTile(someTile)
  
  //fill("#b56d1b");
  platform2 = new Platform(0, 620, 1150, 25, "#b56d1b");
  
  sonicImgIdle = createImg("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FSonic_Idle.png?v=1599326602917");
  sonicImgIdle.position(100, 500);
  sonicImgIdle.remove();
  
  sonic = new Player(100, 400, 0, 0, true, "sprite");
  
  var tile1 = new Tile(0, 524, "#FF0000");
  var tile2 = new Tile(tileDefaultW, 524, "#FF0000");
  var tile3 = new Tile(tileDefaultW * 2, 524, "#FF0000");
  var tile4 = new Tile(tileDefaultW * 3, 524, "#FF0000");
  var tile5 = new Tile(tileDefaultW * 4, 524, "#FF0000");
  var tile6 = new Tile(tileDefaultW * 5, 524, "#FF0000");
  var tile7 = new Tile(tileDefaultW * 6, 524, "#FF0000");
  var tile8 = new Tile(tileDefaultW * 7, 524, "#FF0000");
  var tile9 = new Tile(tileDefaultW * 8, 524, "#FF0000");
  var tile10 = new Tile(tileDefaultW * 9, 524, "#FF0000");
  var tile11 = new Tile(tileDefaultW * 10, 524, "#FF0000");
  var tile12 = new Tile(tileDefaultW * 11, 524, "#FF0000");
  var tile13 = new Tile(tileDefaultW * 12, 524, "#FF0000");
  var tile14 = new Tile(tileDefaultW * 13, 524, "#FF0000");
  var tile15 = new Tile(tileDefaultW * 14, 524, "#FF0000");
  var tile16 = new Tile(tileDefaultW * 15, 524, "#FF0000");
  var tile17 = new Tile(tileDefaultW * 16, 524, "#FF0000");
  var tile18 = new Tile(tileDefaultW * 17, 524, "#FF0000");
  var tile19 = new Tile(tileDefaultW * 18, 524, "#FF0000");
  var tile20 = new Tile(tileDefaultW * 2, 524, "#FF0000");
  
  platform1.addTile(tile1);
  //platform1.addTile(tile2);
  //platform1.addTile(tile3);
  //platform1.addTile(tile4);
  //platform1.addTile(tile5);
  //platform1.addTile(tile6);
  //platform1.addTile(tile7);
  //platform1.addTile(tile8);
  //platform1.addTile(tile9);
  //platform1.addTile(tile10);
  //platform1.addTile(tile11);
  //platform1.addTile(tile12);
  //platform1.addTile(tile13);
  //platform1.addTile(tile14);
  //platform1.addTile(tile15);
  //platform1.addTile(tile16);
  //platform1.addTile(tile17);
  platform1.addTile(tile18);
  //  platform1.addTile(tile19);
  
}

function draw()
{
  
  clear();
  
  background("#82ebed");
  
  // draw background
  //image(background1, 0, 0);
  
  image(sonicImgIdle, sonic.x, sonic.y);  
  
  var borderWidth = 6;
  stroke(borderWidth);
  noFill();
  rect(50, 50, screenWidth - 50, screenHeight - 50);
  //rect(borderWidth/2 - 50, borderWidth/2 + 50, screenWidth - borderWidth, screenHeight - borderWidth)
  //rect(borderWidth/2 + 50,borderWidth/2 - 50,1280-borderWidth+20,721-borderWidth);
  //rect(0,0,1152,649);
  
  sonic.y = sonic.y + sonic.vy;
  sonic.vy = sonic.vy + gravity;
  if (sonic.y >= groundY)
  {
    sonic.vy = 0;
    sonic.y = groundY;
    sonic.onGround = true;
  }
  
  platform1.display();
  //platform2.display();
  
  // draw tile1
  // tile1.draw();
  
  
} 

function keyPressed()
{
  if (keyCode == 90)
  {
    sonic.jump();
  }
}

function keyReleased()
{
  
}