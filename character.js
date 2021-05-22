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
    if (this.onGround == false) 
    {
      return;
    }
    
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
    
    // change to running image, and update w/h and hitbox accordingly
    this.img = sonicImgRun;
    this.w = 64;
    this.h = 72;
    this.hw = 64;
    this.hh = 72;
    this.hx = this.x;
    this.hy = this.y;
    sonicImgJump.hide();
    sonicImgRun.show();
    this.status
    
  }
  
  spin()
  {
    
    
    this.status = "spindash";
    
    // change to jumping image, and update w/h and hitbox accordingly
    this.img = sonicImgJump;    
    this.w = 60;
    this.h = 60;
    this.hw = 60;
    this.hh = 60;
    this.hx = this.x;
    this.hy = this.y;    
    sonicImgRun.hide();
    sonicImgJump.show();
    
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
  
}