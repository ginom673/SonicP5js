var slopeTile;
var startPoint;
var lines = [];


var imageNames = [];
imageNames.push("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGreen_Hill_Tile1.png?v=1611428513830");
imageNames.push("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGreen_Hill_Slope_Down.png?v=1615096004205");
imageNames.push("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGreen_Hill_Semi-solid_1.png?v=1615659396765");
imageNames.push("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGreen_Hill_Semi-solid_2.png?v=1615659399373");
imageNames.push("https://cdn.glitch.global/ea9bc5ca-f0db-4943-a3bc-98bfee9731e7/Green_Hill_Low_Flat_Tile.png?v=1654892954157");

function setupDrawing()
{
  slopeTile = loadImage(imageNames[0]);
}

function drawDrawing()
{
  
  // clear drawings so we dont see the "trailing effect" of the line we are forming
  clear();
  
  // set hitbox color to red
  stroke(255,0,0);
  
  // set hitbox line thickness
  strokeWeight(2);
  
  // draw the image we are creating hitboxes for
  image(slopeTile, 50, 50);
  
  // draw the line they are currently forming (if any)
  if(startPoint != undefined)
  {
    line(startPoint.x, startPoint.y, mouseX, mouseY);    
  }
  
  // draw all lines they have already formed
  for (var i=0; i < lines.length; i++)
  {
    var theLine = lines[i];
    line(theLine.p1.x, theLine.p1.y, theLine.p2.x, theLine.p2.y);
  }
  
}

function mousePressedDrawing()
{
  if(startPoint == undefined)
  {
    startPoint = new Point(mouseX, mouseY);    
  }  
}

function mouseReleasedDrawing()
{
  var endPoint = new Point(mouseX, mouseY);
  var newLine = new Line2D(startPoint, endPoint);
  lines.push(newLine);
  startPoint = endPoint;
}

function keyReleasedDrawing()
{
  if (keyCode == 32)
  {
    drawingDone = true;
    console.log("Drawing is marked as done");
  }
}

