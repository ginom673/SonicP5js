// NOTES

// we will basically have a big list of platforms
// platforms = [];
// we will have a class for platform too, which means we add platform objects to the platforms list
// using camera controls, we determine which of the platforms are currently visible
// and where those platforms are positioned
// we will constantly be checking how (if at all) Sonic collides with any of the platforms


// GLOBAL VARIABLES

var sonicImgIdle;

var groundY = 57;
var gravity = 0.2;

class Player
{
  
  // give the Player class the following properties:
  // x
  // y
  // vx
  // vy
  // onGround
  // imageName
  
  
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
    console.log("jump called");
    if (this.onGround == false)
    {
      return;
    }
    
    this.onGround = false;
    this.vy = -5;
    
  }
}

// create a Platform class
// has properties
// imageName
// x
// y
// width
// height

class Platform
{
  //constructor(imgName, x, y, width, height)
  constructor(x, y, width, height, fill)
  {
    //this.imgName = imgName;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fill = fill;
  }
  
  // create a function called display()
  // which calls the rect function and passes it this platform's x,y,w,h
  
  display()
  {
    fill(this.fill);
    rect(this.x, this.y, this.width, this.height);
  }
  
}

var platform1;
var platform2;

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
  //fill("#b56d1b");
  platform2 = new Platform(0, 620, 1150, 25, "#b56d1b");
  
  sonicImgIdle = createImg("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FSonic_Idle.png?v=1599326602917");
  sonicImgIdle.position(100, 500);
  sonicImgIdle.remove();
  
  sonic = new Player(100, 500, 0, 0, true, "sprite");
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