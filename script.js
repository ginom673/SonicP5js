// NOTE: later restructuring by function would be nice

// BUG: hitbox is slightly off when we jump
// BUG: acceleration bug ... sonic continues going right/left when you press both arrow keys at nearly the same time

// preload is called at beginning of project to load assets
// preload is before setup which is before draw
function preload()
{
  soundFormats('wav');
  deathNoise = loadSound("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FDeath_Noise.wav?v=1614451645973");
  jumpSound = loadSound("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FJump.wav?v=1615058718554");  
  bg = loadImage("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGreen_Hill_Zone_Background.png?v=1612035845018");  
}

// setup is called at beginning of project (AFTER preload though) for additional setup
// setup is after preload, before draw
function setup()
{
  
  // set up screen dimensions
  createCanvas(screenWidth,screenHeight);  
  
  // background is stretched to be larger than screen
  bg.resize(2528, screenHeight);
  
  // load platforms
  platform1 = new Platform(0, groundY - 276, 2, 1, "tile 1");    
  platform2 = new Platform(1028, groundY - 276, 1, 1, "semi solid 1");
  platform3 = new Platform(1088, groundY - 520, 1, 1, "semi solid 2");
  platform4 = new Platform(1540, groundY - 276, 1, 1, "tile 2");  
  
  // create sonic
  sonic = new Character(100, groundY - 72, 0, 0, false, "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FSonic_Run.gif?v=1599326604172", 64, 72, 100, groundY - 72, 64, 72, true);
  sonicImgRun = sonic.img;
  sonicImgJump = createImg("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FSonic_Jump.gif?v=1615057119037");
  
  // create motobug
  motobug = new Character(2000, 50, 0, 0, false, "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FMotobug.gif?v=1604167748294", 80, 58, 2000, 50, 80, 58, true);
  
  // create goal ring (AKA finish line)
  goalRing = new Obstacle(1750, groundY - 256, 128, 128, "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGoal_Ring.gif?v=1615926793357", 1750, groundY - 256, 128, 128, true);
  
  // load sonic death image
  sonicDeathImage = loadImage("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FSonic_Death.png?v=1614455168212");
  
}

// draw is called constantly to render everythong on screen
function draw()
{
  
  // wipe screen before redrawing
  clear();
  
  // background color
  background("#2404b4");
  
  // background image
  image(bg, bgX, 0);
  
  // scroll background to left
  bgX = bgX - (autoscrollRate * 0.4);
  
  // stroke and fill
  var borderWidth = 6;
  stroke(borderWidth);
  noFill();
  
  // collisions list
  var collisions = sonic.checkPlatformCollisions();    
  
  // check if sonic collided with any platforms at all to update onGround
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
  if (!collided)
  {
    sonic.onGround = false;
  }
  
  // write for loop that goes through platforms list
  // then for loop that goes through the tile sof a platform
  // then for loop that goes throguh the slopes of that tile
  for (var i = 0; i < platforms.length; i++)
  {
    for (var j = 0; j < )
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
  
  // sonic dying
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
      sonic.ax = 0;
      sonic.accelerationStatus = 0;
      deathNoise.play();
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
  
  // update the position and speed of sonic (also update hitbox position)
  /*
  var speedDirection = 0;
  if(sonic.vx < 0)
  {
    speedDirection = -1;
  }
  else if(sonic.vx > 0)
  {
    speedDirection = 1;
  }
  sonic.vx = sonic.vx + sonic.ax;
  if(speedDirection == -1 && sonic.vx >= 0)
  {
    sonic.vx = 0;
    sonic.ax = 0;
  }
  if(speedDirection == 1 && sonic.vx <= 0)
  {
    sonic.vx = 0;
    sonic.ax = 0;
  }
  */
  
  // identify current direction before adjusting speed by acceleration (this is used by deacceleration case below)
  var speedDirection = 0;
  if(sonic.vx < 0)
  {
    speedDirection = -1;
  }
  else if(sonic.vx > 0)
  {
    speedDirection = 1;
  }
  
  // adjust speed based on acceleration (if any)
  sonic.vx = sonic.vx + sonic.ax;
  
  // accelerating - increase speed (in either direction) until reaches max  
  if(sonic.accelerationStatus == 1)
  {
    if(sonic.vx < maxSpeedX * -1)
    {
      sonic.vx = maxSpeedX * -1;
    }
    if(sonic.vx > maxSpeedX)
    {
      sonic.vx = maxSpeedX;
    }
  }
  // deaccelerating - decrease speed (in either direction) until reaches 0
  else if(sonic.accelerationStatus == -1)
  {
    if(speedDirection == -1 && sonic.vx >= 0)
    {
      sonic.vx = 0;
      sonic.ax = 0;
      sonic.accelerationStatus = 0;
    }
    if(speedDirection == 1 && sonic.vx <= 0)
    {
      sonic.vx = 0;
      sonic.ax = 0;
      sonic.accelerationStatus = 0;
    }
  }  
  
  
  if(sonic.vx < maxSpeedX * -1)
  {
    sonic.vx = maxSpeedX * -1;
  }
  if(sonic.vx > maxSpeedX)
  {
    sonic.vx = maxSpeedX;
  }
  sonic.x = sonic.x + sonic.vx;  
  sonic.hx = sonic.hx + sonic.vx;   
  
  // check if sonic should be dragged with auto scroll if not moving on left side of a platform
  for (var i=0; i < collisions.length; i++)
  {
    if(collisions[i].includes("left"))
    {
      sonic.x = sonic.x - autoscrollRate;
      sonic.hx = sonic.hx - autoscrollRate;
    }
  }  
  
  // draw goal ring (finish line)
  if (goalRing.x > 0 && goalRing.x < screenWidth - 80 && goalRing.y > 0 && goalRing.y < screenHeight)
  {
    goalRing.image.show();
    goalRing.display();     
  }
  else
  {
    goalRing.image.hide();
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
  
  // detect if sonic reaches goalRing (AKA finish line)
  if (collide(sonic, goalRing) != "none")
  {
    sonic.img.hide();
    goalRing.image.hide();
    alert("You won! Or did you... ( ͡° ͜ʖ ͡°)");
  }
  
  // autoscroll platforms and slopes
  for (var i=0; i < platforms.length; i++)
  {
    var platform = platforms[i];
    for (var j=0; j < platform.tiles.length; j++)
    {
      var tile = platform.tiles[j];      
      tile.x = tile.x - autoscrollRate;
      tile.hx = tile.hx - autoscrollRate;      
      for (var k = 0; k < tile.slopes.length; k++)
      {
        var l = tile.slopes[k];
        l.p1.x = l.p1.x - autoscrollRate;
        l.p2.x = l.p2.x - autoscrollRate;
      }      
      
    }
  }
    
  // autoscroll enemies
  motobug.x = motobug.x - autoscrollRate;
  motobug.hx = motobug.hx - autoscrollRate;
  
  // autoscroll goal
  goalRing.x = goalRing.x - autoscrollRate;
  goalRing.hx = goalRing.hx - autoscrollRate;
  
  // display platforms
  for (var i=0; i < platforms.length; i++)
  {
    platforms[i].display();
  }
  
  // draw motobug
  motobug.display(); 
  
  // display certain information in "developerMode" i.e. hitboxes, stats
  if (developerMode)
  {
    
    // draw sonic hitbox for debugging
    // shift the rectangle and draw it at sonic.x - (sonic.w/2), sonic.y - (sonic.h/2)
    // NOTE: why did we originally subtract by w/2, h/2? sonic's (x,y) is top-left corner of rectangle
    noFill();
    strokeWeight(3);
    stroke(255,255,0);
    if (sonic.hitboxActive)
    {
      rect(sonic.hx - sonic.w/2, sonic.hy - sonic.h/2, sonic.hw, sonic.hh);
      // console.log(sonic.hx);
      // rect(sonic.hx, sonic.hy, sonic.hw, sonic.hh);
    }
        
    // draw the tile hitboxes for debugging
    stroke(0,255,255);
    strokeWeight(5);
    for (var i = 0; i < platforms.length; i++)
    {
      for (var j = 0; j < platforms[i].tiles.length; j++)
      {  
        var currentTile = platforms[i].tiles[j];
        stroke(0,255,255);
        rect(currentTile.hx + tileHorizontalOffset, currentTile.hy + tileVerticalOffset, currentTile.hw, currentTile.hh);
        
        // for loop here that goes through each line object in currentTile's slopes list
        for (var k = 0; k < currentTile.slopes.length; k++)
        {
          stroke(255, 0, 0);
          var l = currentTile.slopes[k];
          line(l.p1.x, l.p1.y, l.p2.x, l.p2.y);
        }
      }
    }
    
    // display goal ring hitbox
    rect(goalRing.hx - goalRing.w/4, goalRing.hy - goalRing.h/4, goalRing.hw, goalRing.hh);
     
    // display statistics for debugging
    fill(150, 150, 150);
    stroke(0,0,0);
    strokeWeight(3);
    textSize(24);
    strokeWeight(1);
    text("x: " + sonic.x.toFixed(2), 950, 75);
    text("y: " + sonic.y.toFixed(2), 950, 100);
    text("vx: " + sonic.vx.toFixed(2), 950, 125);
    text("vy: " + sonic.vy.toFixed(2), 950, 150);
    text("onGround: " + sonic.onGround, 950, 175);
    text("hx: " + sonic.hx.toFixed(2), 950, 200);
    text("hy: " + sonic.hy.toFixed(2), 950, 225);
    text("ax: " + sonic.ax.toFixed(2), 950, 250);
    text("aStatus: " + sonic.accelerationStatus.toFixed(2), 950, 275);
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
    // sonic.vx = 5;
    sonic.ax = 0.2;
    sonic.accelerationStatus = 1;
  }
  else if (keyCode == 37)
  {
    // sonic.vx = -5;
    sonic.ax = -0.2;
    sonic.accelerationStatus = 1;
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
    // sonic.vx = 0;
    // sonic.ax = -0.25;
    if(sonic.vx > 0)
    {
      sonic.ax = -0.25;
    }
    else
    {
      sonic.ax = 0.25;
    }
    sonic.accelerationStatus = -1;
  }
  else if (keyCode == 37)
  {
    // sonic.vx = 0;
    // sonic.ax = 0.25;
    if(sonic.vx > 0)
    {
      sonic.ax = -0.25;
    }
    else
    {
      sonic.ax = 0.25;
    }
    sonic.accelerationStatus = -1;
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


/*
determines if a line intersects a rectangle
*/
  
function line_intersects_rect(l, r)
{      
  
  var rx = r.x;
  var ry = r.y;
  var rw = r.w;
  var rh = r.h;
  
  var p1 = l.p1;
  var p2 = l.p2;
  
  var x1 = p1.x;
  var y1 = p1.y;
  var x2 = p2.x;
  var y2 = p2.y;
  
  // check if top line of rectangle intersects given line
  var a = line_intersects_line(x1, y1, x2, y2, rx, ry, rx + rw, ry);
  if (a)
  {
    return true;
  }
  // check if right line of rectangle intersects given line
  var b = line_intersects_line(x1, y1, x2, y2, rx + rw, ry, rx + rw, ry + rh);
  if (b)
  {
    return true;
  }
  // check if bottom line of rectangle intersects given line
  var c = line_intersects_line(x1, y1, x2, y2, rx + rw, ry + rh, rx, ry + rh);
  if (c)
  {
    return true;
  }
  // check if left line of rectangle intersects given line
  var d = line_intersects_line(x1, y1, x2, y2, rx, ry + rh, rx, ry);
  if (d)
  {
    return true;
  }
  // check if rectangle contains first point
  var e = rect_contains(rx, ry, rw, rh, x1, y1);
  
  // check if rectangle contains second point
  var f = rect_contains(rx, ry, rw, rh, x2, y2);
  
  // a, b, c, d, e and f are all booleans 
  return e && f;
  // return a or b or c or d or (e and f)
}

/*
determines if two lines intersect
*/
function line_intersects_line(l1, l2)
{
  
    var x1 = l1.p1.x;
    var y1 = l1.p1.y;
    var x2 = l1.p2.x;
    var y2 = l1.p2.y;
    var x3 = l2.p1.x;
    var y3 = l2.p1.y;
    var x4 = l2.p2.x;
    var y4 = l2.p2.y;
  
    var q = (y1 - y3) * (x4 - x3) - (x1 - x3) * (y4 - y3);
    var d = (x2 - x1) * (y4 - y3) - (y2 - y1) * (x4 - x3);
    if (d == 0)
    {
      return false;
    }
    var r = q / d;
    q = (y1 - y3) * (x2 - x1) - (x1 - x3) * (y2 - y1);
    var s = q / d;
    if(r < 0 || r > 1 || s < 0 || s > 1)
    {
        return false;
    }
    return true;
}
             
/*
determines if a rectangle contains a given point
*/
function rect_contains(r, x, y)
{
  return x > r.x && x < r.x + r.w && y < r.y && y > r.y - r.h;
}
  