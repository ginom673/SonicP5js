class Obstacle
{
  constructor(x, y, w, h, imgName)
  {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.imgName = imgName;
    
    this.image = loadImage(imgName);
  }
  
  display()
  {
    image(this.image, this.x, this.y);  
  }
  
}