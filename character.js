// Characters objects are any game objects that do move ... animate objects
class Character
{  
  
  constructor(x, y, vx, vy, onGround, imgName, w, h, hx, hy, hw, hh, isGif)
  {
    
    // character physics attributes
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;    
    this.vx = vx;
    this.vy = vy;
    this.ax = 0;
    this.onGround = onGround;
    
    // character hitbox attributes
    this.hx = hx;
    this.hy = hy;
    this.hw = hw;
    this.hh = hh;
    
    // character image attributes
    this.isGif = isGif;
    this.imgName = imgName;
    this.img = createImg(imgName); 
    
    // alive or not
    this.isAlive = true;
    
    // whether or not this character uses collisions
    this.hitboxActive = true;
    
    // whether or not this character's image should be displayed
    // (the Character object could be hidden but still interactable)
    this.visible = true;
    
    // -1 means deaccelerating, 0 means no acceleration or deacceleration, 1 means accelerating
    this.accelerationStatus = 0;
    
    // current status
    this.status = "running";
    
  }
  
  // used by draw() to display character
  display()
  {
    
    if (!this.visible)
    {         
      return;
    }

    if(this.isGif)
    {
      this.img.position(this.x, this.y);      
    }
    else
    {
      image(this.img, this.x, this.y);
    }  

  }
  
  // jump
  jump()
  {
    
    // prevent double-jumping; if character tries to jump while in midair, do nothing
    if (!this.onGround) 
    {
      return;
    }
    
    // if we jump, stop spin dashing (this correctly cancels the spindash timeout)
    sonic.stopSpin();
    
    // NOTE: this assumes that Sonic is the only jumping Character object
    // change to jumping image, and update w/h and hitbox accordingly
    this.status = "jumping";
    this.img = sonicImgJump;    
    this.w = 60;
    this.h = 60;
    this.hw = 60;
    this.hh = 60;
    this.hx = this.x;
    this.hy = this.y;    
    sonicImgRun.hide();
    sonicImgJump.show();    
    
    // play jump sound effect
    jumpSound.play();
    
    // flag not on ground
    this.onGround = false;
    
    // initial jump speed
    this.vy = -14;
    
    // initial change in position to get us off ground, avoiding immediate collision detection with tile we are on
    this.y = this.y + this.vy;
    this.hy = this.hy + this.vy;
    
    // setup ignoredSlope and currentSlope
    ignoredSlope = currentSlope;
    currentSlope = undefined;
    
  }
  
  // land
  land(newY)
  {    
    
    // update physics variables
    this.y = newY;
    this.vy = 0;
    this.onGround = true;
    
    // dont change image if we are spindashing
    if(this.status == "spindash")
    {
      return;
    }
    
    sonic.startRun();
    
  }
  
  // change to running image, and update w/h and hitbox accordingly
  startRun()
  {
    this.img = sonicImgRun;
    this.w = 64;
    this.h = 72;
    this.hw = 64;
    this.hh = 72;
    this.hx = this.x;
    this.hy = this.y;
    sonicImgJump.hide();
    sonicImgRun.show();
    this.status = "running";
  }
  
  spin()
  {
    
    console.log("spin");
    
    // don't do anything if we are already spinning
    if (sonic.status == "spindash")
    {
      return;
    }
    
    // reset stopSpinTimeout
    clearTimeout(stopSpinTimeout);
    
    // prevent spin dashing while in mid-air
    if (!this.onGround) 
    {
      return;
    }
    
    // change status
    this.status = "spindash";
    
    // change to jumping image
    this.img = sonicImgJump;  
    sonicImgRun.hide();
    sonicImgJump.show();
    
    // update w/h and hitbox accordingly
    this.w = 60;
    this.h = 60;
    this.hw = 60;
    this.hh = 60;
    this.hx = this.x;
    this.hy = this.y;   
    
    // stop spin dashing after 
    stopSpinTimeout = setTimeout(sonic.stopSpin, spinDuration);
    console.log("triggered stopSpinTimeout");
    
    // play spin sound effect
    spindashSound.play();
    
  }
  
  // this checks collision between Sonic and ALL of the platforms
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
  
  // this checks collision between Sonic and ONE of the platforms
  // NOTE: if the game is slowing down, consider not adding the "none" collision case to the tileCollisions list
  checkPlatformCollision(platform)
  {
    var tileCollisions = [];
    for (var i=0; i < platform.tiles.length; i++)
    {        
      var collisionStatus = collide(sonic, platform.tiles[i]);
      if (collisionStatus == 'top')
      {
        if(platform.tiles[i].imgName == "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGreen_Hill_Semi-solid_2.png?v=1615659399373" && sonic.vy <= 0)
        {
          continue;
        }
        this.land(platform.tiles[i].hy - this.hh);
      }      
      else if(platform.tiles[i].imgName == "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGreen_Hill_Semi-solid_2.png?v=1615659399373")
      {
        continue;
      }            
      else if (collisionStatus == 'bottom')
      {
        this.vy = 0;
      }
      else if (collisionStatus == 'left' && this.vx > 0)
      {
        this.vx = 0;
      }
      else if (collisionStatus == 'right' && this.vx < 0)
      {
        this.vx = 0;
      }
      tileCollisions.push(collisionStatus);      
    }
    return tileCollisions;
  }  
  
  // updates sonic properties and image
  die()
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
  
  stopSpin()
  {
    
    console.log("stopSpin");
    
    // if sonic is mid-air when the spin would time out, simply "check back later" to see if we are on the ground
    if (!sonic.onGround)
    {
      stopSpinTimeout = setTimeout(sonic.stopSpin, 50);
      return;
    }
    
    clearTimeout(stopSpinTimeout);
    sonic.startRun();
    
  }
  
}

function setupSonic()
{
  
  // create sonic
  sonic = new Character(100, groundY - 72, 0, 0, false, "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FSonic_Run.gif?v=1599326604172", 64, 72, 100, groundY - 72, 64, 72, true);
  sonicImgRun = sonic.img;
  sonicImgJump = createImg("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FSonic_Jump.gif?v=1615057119037");
  
  // load sonic death image
  sonicDeathImage = loadImage("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FSonic_Death.png?v=1614455168212");
  
}

function setupEnemies()
{
  // create motobug
  motobug = new Character(2000, groundY - 72, 0, 0, false, "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FMotobug.gif?v=1604167748294", 80, 58, 2000, groundY - 72, 80, 58, true);
  motobug.vx = -2;
}

function updateSonic()
{
  
  // handle sonic platform collisions
  sonicCollisions();
  
  // if sonic is falling, we don't need an ignoredSlope, so reset it
  if (sonic.vy > 0)
  {
    ignoredSlope = undefined;
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
      sonic.die();
    }
    else
    {
      sonic.visible = false;
    }
    
  }
  
  // sonic-motobug collision
  // if sonic is running, sonic takes damage
  // if sonic is jumping or spindashing, motobug takes damage
  if (collide(sonic,motobug) != "none" && motobug.isAlive && sonic.isAlive)
  {
    
    // add an if statement that checks if sonic's status is running
    if (sonic.status == "running")
    {
      sonic.die();
    }
    else
    {
      motobug.isAlive = false;
      motobug.img.hide();
      breakNoise.play();
    }
    
    
  }
  
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
  
  // detect if sonic reaches goalRing (AKA finish line)
  if (collide(sonic, goalRing) != "none" && sonic.isAlive)
  {
    sonic.img.hide();
    goalRing.image.hide();
    // alert("You won! Or did you... ( ͡° ͜ʖ ͡°)");    
    goalRingSound.play();
    resetGame();
  }
  
  // detect if sonic picks up any rings
  for (var i=0; i < rings.length; i++)
  {
    var ring = rings[i];
    if (collide(sonic, ring) != "none" && sonic.isAlive)
    {
      ringCount++;
      ring.image.hide();
      rings.splice(i, 1);
      ringGetSound.play();
    }
  }
  
}

function updateEnemies()
{
  // move motobug if its alive
  if (motobug.isAlive)
  {
    motobug.x = motobug.x + motobug.vx;  
    motobug.hx = motobug.hx + motobug.vx;
  }
}

function drawSonic()
{
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
}

function autoscrollEnemies()
{
  motobug.x = motobug.x - autoscrollRate;
  motobug.hx = motobug.hx - autoscrollRate;
}

function drawEnemies()
{
  if (motobug.isAlive && motobug.x > 0 && motobug.x < screenWidth && motobug.y > 0 && motobug.y < screenHeight)
  {
    motobug.img.show();
    motobug.display();
  }
  else
  {
    motobug.img.hide();
  }
}