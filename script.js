// GLOBAL VARIABLES

var sonicImgIdle;

var groundY = 576;
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

function setup()
{
  //createCanvas(1280,721);  
  createCanvas(1152,649);  
  background("#fffff0");
  
  
  
  sonicImgIdle = createImg("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FSonic_Idle.png?v=1599326602917");
  sonicImgIdle.position(100, 500);  
  
  sonic = new Player(100, 500, 0, 0, true, "sprite");
}

function draw()
{
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
} 

function keyPressed()
{
  if (keyCode == 90)
  {
    sonic.jump();
  }
}