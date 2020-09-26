// GLOBAL VARIABLES

// image object for Sonic's idle stance
var sonicImgIdle;

// y position of ground
var groundY = 448;

// gravity effect
var gravity = 0.4;

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
  createCanvas(1152,649);  
  background("#fffff0");
  
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
  
  tile1 = new Tile(0, 524, "#FF0000");
  tile2 = new Tile(tileDefaultW, 524, "#FF0000");
  tile3 = new Tile(tileDefaultW * 2, 524, "#FF0000");
  tile4 = new Tile(tileDefaultW * 3, 524, "#FF0000");
  tile5 = new Tile(tileDefaultW * 4, 524, "#FF0000");
  tile6 = new Tile(tileDefaultW * 5, 524, "#FF0000");
  tile7 = new Tile(tileDefaultW * 6, 524, "#FF0000");
  tile8 = new Tile(tileDefaultW * 7, 524, "#FF0000");
  tile9 = new Tile(tileDefaultW * 8, 524, "#FF0000");
  tile10 = new Tile(tileDefaultW * 9, 524, "#FF0000");
  tile11 = new Tile(tileDefaultW * 10, 524, "#FF0000");
  tile12 = new Tile(tileDefaultW * 11, 524, "#FF0000");
  tile13 = new Tile(tileDefaultW * 8, 524, "#FF0000");
  tile14 = new Tile(tileDefaultW * 9, 524, "#FF0000");
  tile15 = new Tile(tileDefaultW * 10, 524, "#FF0000");
  tile16 = new Tile(tileDefaultW * 11, 524, "#FF0000");
  
  platform1.addTile(tile1);
  platform1.addTile(tile2);
  platform1.addTile(tile3);
  platform1.addTile(tile4);
  platform1.addTile(tile5);
  platform1.addTile(tile6);
  platform1.addTile(tile7);
  platform1.addTile(tile8);
  platform1.addTile(tile9);
  platform1.addTile(tile10);
  platform1.addTile(tile11);
  platform1.addTile(tile12);
  
}

function draw()
{
  
  clear();
  
  image(sonicImgIdle, sonic.x, sonic.y);
  
  
  var borderWidth = 6;
  stroke(borderWidth);
  //rect(borderWidth/2, borderWidth/2, screenWidth - borderWidth, screenHeight - borderWidth)
  //rect(borderWidth/2,borderWidth/2,1280-borderWidth+20,721-borderWidth);
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
  platform2.display();
  
  // draw tile1
  tile1.draw();
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