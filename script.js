// BUG: hitbox is slightly off when we jump

var tile1;

function preload()
{
  soundFormats('wav');
  deathNoise = loadSound("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FDeath_Noise.wav?v=1614451645973");
  jumpSound = loadSound("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FJump.wav?v=1615058718554");  
  bg = loadImage("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGreen_Hill_Zone_Background.png?v=1612035845018");  
}

function setup()
{
  createCanvas(screenWidth,screenHeight);  
  
  bg.resize(2528, screenHeight);
  
  // tile name ---> "green hill ground"
  // "green hill float"
  // image name ---> https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2Fgreen_hill_ground_flat.png?v=1601140825013
  
  platform1 = new Platform(0, groundY - 276, 2, 1, "tile 1");    
  platform2 = new Platform(1028, groundY - 276, 1, 1, "semi solid 1");
  // platform2 = new Platform(1028, groundY, 1, 1, "semi solid 1");
  // platform3 = new Platform(1028, groundY - 540, 1, 1, "semi solid 2");
  platform3 = new Platform(1088, groundY - 520, 1, 1, "semi solid 2");
  platform4 = new Platform(1540, groundY - 276, 1, 1, "tile 2");
  //platform4 = new Platform(2014, groundY - 276, 1, 1, "tile 1");
  
  // sonicImgNormal = createImg("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FSonic_Run.gif?v=1599326604172");
  // sonicImgNormal.position(100, 500);  
  
  // character constructor template
  // constructor(x, y, vx, vy, onGround, imgName, w, h, hx, hy, hw, hh, isGif)
  // sonic = new Character(100, 200, 0, 0, false, "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FSonic_Run.gif?v=1599326604172", 64, 72, 100, 180, 64, 72, true);
  sonic = new Character(100, groundY - 72, 0, 0, false, "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FSonic_Run.gif?v=1599326604172", 64, 72, 100, groundY - 72, 64, 72, true);
  sonicImgRun = sonic.img;
  sonicImgJump = createImg("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FSonic_Jump.gif?v=1615057119037");
  
  motobug = new Character(2000, 50, 0, 0, false, "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FMotobug.gif?v=1604167748294", 80, 58, 2000, 50, 80, 58, true);
  finishLine = new Obstacle(2000, groundY - 64, 16, 64, "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2F59c351cb9c3fc.jpg?v=1613848214467");
  
  sonicDeathImage = loadImage("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FSonic_Death.png?v=1614455168212");
  console.log(sonicDeathImage);
}

// NOTE FOR MOVEMENT: constantly add sonic's vx to his x
var reported = false; // debugging
function draw()
{
  
  clear();
  
  background("#82ebed");
  //background(bg);
  image(bg, bgX, 0);
  
  // scroll background to left
  bgX = bgX - (autoscrollRate * 0.4);
  
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
      sonic.img.remove();
      sonic.imgName = "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FSonic_Death.png?v=1614455168212";
      sonic.img = sonicDeathImage;
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
      // console.log("drag");
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
  // the show / hide here cause the image to go away when we are off screen
  // the sonic.isAlive checks make sure that we do not call show() or hide() if sonic.img is a gif
  if (sonic.x > 0 && sonic.x < screenWidth && sonic.y > 0 && sonic.y < screenHeight)
  {
    if(sonic.isAlive)
    {
      sonic.img.show();
    }    
    sonic.display();
  }
  else if(sonic.isAlive)
  {
    sonic.img.hide(); 
  }
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
    strokeWeight(3);
    stroke(255,255,0);
    // rect(sonic.x - sonic.w/2, sonic.y - sonic.h/2, sonic.w, sonic.h);
    if (sonic.hitboxActive)
    {
      rect(sonic.hx - sonic.w/2, sonic.hy - sonic.h/2, sonic.hw, sonic.hh);
    }
    
    
    // draw the tile hitboxes for debugging
    stroke(0,255,255);
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