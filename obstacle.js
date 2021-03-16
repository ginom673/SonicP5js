// Obstacle is any game object besides a platform that does not move (inanimate objects)
// unlike platforms, you do not land on obstacles
class Obstacle
{
  
  /*
  
  constructor(x, y, vx, vy, onGround, imgName, w, h, hx, hy, hw, hh, isGif)
  {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.onGround = onGround;
    this.isGif = isGif;
    this.hx = hx;
    this.hy = hy;
    this.hw = hw;
    this.hh = hh;
    this.imgName = imgName;
    this.img = createImg(imgName);
    this.img.position(x,y);
    this.w = w;
    this.h = h;
    
    // whether or not character is considered living
    this.isAlive = true;
    
    // whether or not this character uses collisions
    this.hitboxActive = true;
    
    // whether or not this character's image should be displayed
    // (the Character object could be hidden but still interactable)
    this.visible = true;
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
  
  */
  
  
  constructor(x, y, w, h, imgName, hx, hy, hw, hh)
  {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.hx = hx;
    this.hy = hy;
    this.hw = hw;
    this.hh = hh;
    this.imgName = imgName;    
    this.image = loadImage(imgName);
  }
  
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
  
}