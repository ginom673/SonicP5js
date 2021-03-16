// Obstacle is any game object besides a platform that does not move (inanimate objects)
// unlike platforms, you do not land on obstacles
class Obstacle
{  
  
  constructor(x, y, w, h, imgName, hx, hy, hw, hh, isGif)
  {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.hx = hx;
    this.hy = hy;
    this.hw = hw;
    this.hh = hh;
    this.isGif = isGif;
    this.imgName = imgName;    
    this.image = createImg(imgName);
    // this.image.position(x,y);
    this.visible = true;
    this.hitboxActive = true;
  }
  
  display()
  {
    if (!this.visible)
    {         
      return;
    }

    if(this.isGif)
    {
      this.image.position(this.x, this.y);
    }
    else
    {
      image(this.image, this.x, this.y);
    }
  }
  
}