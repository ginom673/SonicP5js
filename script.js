// GLOBAL VARIABLES

var sonicImgIdle;

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
}

function setup()
{
  createCanvas(1280,721);  
  sonicImgIdle = createImg("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FSonic_Idle.png?v=1599326602917");
  sonicImgIdle.position(100, 100);
  
}

function draw()
{
  //image(sonicImgIdle, 50, 50);
  
  
  var borderWidth = 6;
  stroke(borderWidth);
  //rect(borderWidth/2, borderWidth/2, screenWidth - borderWidth, screenHeight - borderWidth)
  //rect(borderWidth/2,borderWidth/2,1280-borderWidth+20,721-borderWidth);
  //rect(0,0,1152,649);
  
  
}