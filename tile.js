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
     
    // any additional lines included for collision detections; adds points to slopes    
    this.slopes = [];   
    
    if(imgName == "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGreen_Hill_Semi-solid_1.png?v=1615659396765")
    {      
      var line = new Line2D(new Point(this.x + tileHorizontalOffset, this.y + tileVerticalOffset - 2), new Point(this.x + this.w / 2 + tileHorizontalOffset, this.y + tileVerticalOffset + 20));
      var line2 = new Line2D(new Point(this.x + this.w / 2 + tileHorizontalOffset, this.y + tileVerticalOffset + 20), new Point(this.x + this.w + tileHorizontalOffset, this.y + tileVerticalOffset - 2));
      this.slopes.push(line);
      this.slopes.push(line2);
    }
    if(imgName == "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGreen_Hill_Slope_Down.png?v=1615096004205")
    { 
      
      // NOTE: some of these points are shared between lines, BUT, if you use the same point object for different lines,
      // then autoscrolling will cause the shared points to be autoscrolled twice as often as they should be
      // to fix this, we can simply COPY the points
      
      var line1start = new Point(this.x + tileHorizontalOffset + 25, this.y + tileVerticalOffset + 255);
      var line1end = new Point(this.x + this.w / 2 + tileHorizontalOffset, this.y + tileVerticalOffset + 300);
      
      var line2start = JSON.parse(JSON.stringify(line1end));
      var line2end = new Point(this.x + this.w + tileHorizontalOffset - 75, this.y + tileVerticalOffset + 375);
      
      var line3start = JSON.parse(JSON.stringify(line2end));
      var line3end = new Point(this.x + this.w + tileHorizontalOffset, this.y + tileVerticalOffset + 375);
      /*
      var line4start = JSON.parse(JSON.stringify(line3end));
      var line4end = new Point(this.x + this.w + tileHorizontalOffset, this.y + tileVerticalOffset + 300);     
      */
      var line = new Line2D(line1start, line1end);
      var line2 = new Line2D(line2start, line2end);
      var line3 = new Line2D(line3start, line3end);
      //var line4 = new Line2D(line4start, line4end);
      
      this.slopes.push(line);
      this.slopes.push(line2);      
      this.slopes.push(line3);
      
      //this.slopes.push(line4);
      
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
  
  
  equals(otherTile)
  {
    // this.p1.x == otherTile.p1.x
    if (this.x == otherTile.x && this.y == otherTile.y && this.w == otherTile.w && this.h == otherTile.h && this.imgName == otherTile.imgName)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  
}