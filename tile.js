// variables that control the offset for the tiles
// there is a bug with an unknown cause that is making the hitboxes innacurate
// this is a simple fix to that
var tileHorizontalOffset = -35;
var tileVerticalOffset = -35;

// Tile class
class Tile
{  
  
  // Tile constructor
  constructor(x, y, w, h, hx, hy, hw, hh, imgName)
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
    
    // load image for this Tile
    this.image = loadImage(imgName);
     
    // any additional lines included for collision detections
    this.slopes = [];   
    
    if(imgName == "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGreen_Hill_Semi-solid_1.png?v=1615659396765")
    {
      // add points to slopes
      var line = new Line(new Point(50,50), new Point(100,100));
      
      
    }
    
  }
  
  // draws this tile's image @ (x,y)
  // NOTE: we have a "sloppy workaround" here that draws the tile @ (x, y+20) so the image
  // more properly aligns with where the collision is happening
  // this is a sloppy fix to the "gap" bug
  draw()
  {
    image(this.image, this.x + tileHorizontalOffset, this.y + tileVerticalOffset);
  }
}