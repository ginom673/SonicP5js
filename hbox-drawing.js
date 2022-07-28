var slopeTile;
var startPoint;
var lines = [];

function setupDrawing()
{
  slopeTile = loadImage("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGreen_Hill_Slope_Down.png?v=1615096004205");
}

function drawDrawing()
{
  
  clear();
  
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
  startPoint = new Point(mouseX, mouseY);
}

function mouseReleasedDrawing()
{
  var endPoint = new Point(mouseX, mouseY);
  var newLine = new Line2D(startPoint, endPoint);
  lines.push(newLine);
  startPoint = undefined;
}