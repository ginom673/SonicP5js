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
        var theTile = new Tile(x + (i * 512), y + 256, 512, 512, x + (i * 512), y + 256, 512, 256, "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGreen_Hill_Semi-solid_1.png?v=1615659396765");
      }
      else if(tileImgName == "semi solid 2")
      {
        var theTile = new Tile(x + (i * 512) - 60, y + 256, 512, 512, x + (i * 512), y + 320, 380, 180, "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGreen_Hill_Semi-solid_2.png?v=1615659399373")
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