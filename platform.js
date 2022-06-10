// unlike OBstacles, Platforms are inanimative objects that you can land on
class Platform
{

  // (x,y) is the top-left corner of this platform
  // tilesLong - how many tiles wide/long it is 
  // (UNUSED) tilesHigh - how many tiles high it is ... this can be < 1, i.e. 0.5
  constructor(x, y, tilesLong, tilesHigh, tileImgName)
  {
    // setup properties
    this.x = x;
    this.y = y;
    this.tilesLong = tilesLong;
    this.tilesHigh = tilesHigh;
    this.tileImageName = tileImgName;
    this.tiles = [];
    
    // create a for loop that repeats tileWidth times
    for (var i = 0; i < tilesLong; i++)
    {
      
      // add an if statement
      // Tile structure: x,y,w,h,hx,hy,hw,hh,imgName
      if(tileImgName == "flat ground")
      {
        var theTile = new Tile(x + (i * 128), y, 128, 128, x + (i * 128), y, 128, 128, "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2Fgreen_hill_ground_flat.png?v=1601140825013");
      }  
      else if(tileImgName == "floating platform")
      {
        var theTile = new Tile(x + (i * 128), y, 128, 60, x + (i * 128), y, 128, 60, "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGreen_Hill_Floating_Platform_1.png?v=1610821946600");
      }
      else if(tileImgName == "tile 1")
      {
        var theTile = new Tile(x + (i * 514), y, 514, 512, x + (i * 514), y + 256, 514, 256, "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGreen_Hill_Tile1.png?v=1611428513830");
      }
      else if(tileImgName == "semi solid")
      {
        var theTile = new Tile(x + (i * 512), y, 512, 512, x + (i * 512), y + 256, 512, 256, "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGreen_Hill_Semi-solid.png?v=1615096007687");
      }
      else if(tileImgName == "tile 2")
      {
        var theTile = new Tile(x + (i * 512), y, 512, 512, x + (i * 512), y + 256, 512, 256, "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGreen_Hill_Tile2.png?v=1615097317124");
      }
      else if(tileImgName == "semi solid 1")
      {
        var theTile = new Tile(x + (i * 512), y + 256, 512, 512, x + (i * 512), y + 276, 512, 256, "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGreen_Hill_Semi-solid_1.png?v=1615659396765");
      }
      else if(tileImgName == "semi solid 2")
      {
        var theTile = new Tile(x + (i * 512) - 60, y + 256, 512, 512, x + (i * 512), y + 320, 380, 180, "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGreen_Hill_Semi-solid_2.png?v=1615659399373")
      }
      else if(tileImgName == "slope 1")
      {
        var theTile = new Tile(x + (i * 512), y, 512, 512, x + (i * 512), y + 448, 512, 64, "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGreen_Hill_Slope_Down.png?v=1615096004205");
      }
      else if(tileImgName == "low flat tile")
      {
        var theTile = new Tile(x + (i * 512), y, 512, 512, x + (i * 512), y + 380, 512, 128, "https://cdn.glitch.global/ea9bc5ca-f0db-4943-a3bc-98bfee9731e7/Green_Hill_Low_Flat_Tile.png?v=1654892954157");
      }
      else
      {
        console.log("Unrecognized tile name: " + tileImgName)
      }      
      
      this.tiles.push(theTile);      
    }
    
    // add this to platforms list
    platforms.push(this);
  }
  
  // display this Platform by displaying each of tiles  
  display()
  {   
    for (var i = 0; i < this.tiles.length; i++)
    {
      var tile = this.tiles[i];
      tile.draw();
    }
  }
  
  // adds newTile Tile object to this Platform object's tiles list
  addTile(newTile)
  {
    this.tiles.push(newTile);
  }
  
}

// load platforms
function setupPlatforms()
{  
  new Platform(0, groundY - 276, 2, 1, "tile 1");    
  new Platform(1028, groundY - 276, 1, 1, "semi solid 1");
  new Platform(1088, groundY - 520, 1, 1, "semi solid 2");
  new Platform(1540, groundY - 276, 1, 1, "tile 2");
  new Platform(2052, groundY - 276, 1, 1, "slope 1");
  new Platform(2564, groundY - 276, 1, 1, "low flat tile");
}

function drawPlatforms()
{
  for (var i=0; i < platforms.length; i++)
  {
    platforms[i].display();
  }
}

function autoscrollPlatforms()
{
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
}