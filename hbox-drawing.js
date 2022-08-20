var slopeTile;
var startPoint;
var lines = [];
var imageIndex = 0;

var imageNames = [];
imageNames.push("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGreen_Hill_Tile1.png?v=1611428513830");
imageNames.push("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGreen_Hill_Slope_Down.png?v=1615096004205");
imageNames.push("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGreen_Hill_Semi-solid_1.png?v=1615659396765");
imageNames.push("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGreen_Hill_Semi-solid_2.png?v=1615659399373");
imageNames.push("https://cdn.glitch.global/ea9bc5ca-f0db-4943-a3bc-98bfee9731e7/Green_Hill_Low_Flat_Tile.png?v=1654892954157");

var tileData = {};

/*

// how to create dictionaries in javascript:
// https://pietschsoft.com/post/2015/09/05/javascript-basics-how-to-create-a-dictionary-with-keyvalue-pairs

DICTIONARY QUICK SUMMARY

used to associate some data (key) with some other data (value)
especially good for associating names with data 
(i.e. usernames with high scores; enemy names with rewarded point values)

(here, usernames are keys, and point values are the values)
var highScores = {};
highScores['CHXIMusic'] = 100000000;
highScores['Nate4844'] = 2;
highScores['Sonic'] = 647238346910234;

(here, enemy names are keys, and their reward points are the values)
pointValues['motobug'] = 2;
pointValues['crabmeat'] = 50;
pointValies['robotnik'] = 2000;

*/


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
  image(slopeTile, 0, 0);
  
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
  writeLine(newLine);
  startPoint = endPoint;
}

function keyReleasedDrawing()
{
  if (keyCode == 32)
  {
    nextDrawing();
    console.log("Drawing is marked as done");
  }
}

function nextDrawing()
{
  
  // associate the image name of the tile (that we just finished drawing on) with its list of points
  var currentImageName = imageNames[imageIndex];
  tileData[currentImageName] = lines;
  
  // advance to next drawing
  imageIndex = imageIndex + 1;
  slopeTile = loadImage(imageNames[imageIndex]);
  lines = [];
  startPoint = undefined;
  
}

// writeLine is some JANKY code
// the goal of this function is to write 
function writeLine(newLine)
{
  console.log("new Line2D(new Point(" + newLine.p1.x + ", " + newLine.p1.y + "), new Point(" + newLine.p2.x + ", " + newLine.p2.y + "))");
}

// 
function initTileHitboxes()
{
  
}