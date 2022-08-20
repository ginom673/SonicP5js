var slopeTile;
var startPoint;
var lines = [];
var imageIndex = 0;

// this list contains the image file name URLs for every tile that we are trying to draw hitbox lines for
// if you don't want to draw lines for that tile, simply comment it out
// if you are trying to draw lines for a new tile, you'll probably want to comment out the previous ones, then add the new one to imageNames
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
var highScores = {}; // creates a dictionary
highScores['CHXIMusic'] = 100000000; // adds a new key-value pairing (aka "entry") in the dictionary
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
  }
}

function nextDrawing()
{
  
  // associate the image name of the tile (that we just finished drawing on) with its list of points
  var currentImageName = imageNames[imageIndex];
  tileData[currentImageName] = lines;
  console.log("tileData[\"" + currentImageName + "\"] = currentTileLines;");
  console.log("currentTileLines = [];");
  
  // advance to next drawing
  // check if imageIndex equals the last valid index of imageNames
  var lastIndex = imageNames.length - 1
  if(imageIndex < lastIndex)
  {
    imageIndex = imageIndex + 1;
    slopeTile = loadImage(imageNames[imageIndex]);
    lines = [];
    startPoint = undefined;
  }
  else
  {
    alert("bro you're done");    
  }
  
}

// writeLine is some JANKY code
// the goal of this function is to console.log() some text which can be copy-pasted back into this file as legitimate code
// this is done to avoid the problem of writing out persistent data using JSONs, Node.js, etc.
// so instead of having the code automatically write out these points to some data table,
// we have it write out lines of code which, after being copy-pasted, could effectively serve the purpose, and persist in the code
// this function in particular writes out the line of code that would let us add a new 2D line to a list of lines
// that will later be loaded into the tileData dictionary
function writeLine(newLine)
{
  console.log("currentTileLines.push(new Line2D(new Point(" + newLine.p1.x + ", " + newLine.p1.y + "), new Point(" + newLine.p2.x + ", " + newLine.p2.y + ")));");
}

// initTileData will initialize the tileData dictionary which contains the hitbox data (lines) of all the tiles
// this is where all the copy-pasted lines from writeLine will go!
// NOTE: might be a good idea to manually ensure first point of first line and last point of last line match
function initTileData()
{
  
  var currentTileLines = [];
  // COPY ALL OF THE CODE THAT GOT CONSOLE.LOG'D HERE
  
  // platform 1
  currentTileLines = [];
  currentTileLines.push(new Line2D(new Point(0, 256), new Point(0, 256)));
  currentTileLines.push(new Line2D(new Point(0, 256), new Point(34, 255)));
  currentTileLines.push(new Line2D(new Point(34, 255), new Point(130, 268)));
  currentTileLines.push(new Line2D(new Point(130, 268), new Point(227, 258)));
  currentTileLines.push(new Line2D(new Point(227, 258), new Point(266, 255)));
  currentTileLines.push(new Line2D(new Point(266, 255), new Point(338, 263)));
  currentTileLines.push(new Line2D(new Point(338, 263), new Point(419, 268)));
  currentTileLines.push(new Line2D(new Point(419, 268), new Point(513, 257)));
  currentTileLines.push(new Line2D(new Point(513, 257), new Point(513, 511)));
  currentTileLines.push(new Line2D(new Point(513, 511), new Point(0, 511)));
  currentTileLines.push(new Line2D(new Point(0, 511), new Point(0, 256)));
  tileData["https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGreen_Hill_Tile1.png?v=1611428513830"] = currentTileLines;
  
  // platform 2
  currentTileLines = [];
  currentTileLines.push(new Line2D(new Point(0, 255), new Point(0, 255)));
  currentTileLines.push(new Line2D(new Point(0, 255), new Point(64, 251)));
  currentTileLines.push(new Line2D(new Point(64, 251), new Point(89, 253)));
  currentTileLines.push(new Line2D(new Point(89, 253), new Point(135, 264)));
  currentTileLines.push(new Line2D(new Point(135, 264), new Point(193, 279)));
  currentTileLines.push(new Line2D(new Point(193, 279), new Point(236, 291)));
  currentTileLines.push(new Line2D(new Point(236, 291), new Point(358, 353)));
  currentTileLines.push(new Line2D(new Point(358, 353), new Point(429, 370)));
  currentTileLines.push(new Line2D(new Point(429, 370), new Point(475, 382)));
  currentTileLines.push(new Line2D(new Point(475, 382), new Point(512, 384)));
  currentTileLines.push(new Line2D(new Point(512, 384), new Point(511, 510)));
  currentTileLines.push(new Line2D(new Point(511, 510), new Point(0, 511)));
  currentTileLines.push(new Line2D(new Point(0, 511), new Point(1, 256)));
  tileData["https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGreen_Hill_Slope_Down.png?v=1615096004205"] = currentTileLines;
  
  // platform 3
  currentTileLines = [];
  currentTileLines.push(new Line2D(new Point(0, 6), new Point(0, 6)));
  currentTileLines.push(new Line2D(new Point(0, 6), new Point(33, 4)));
  currentTileLines.push(new Line2D(new Point(33, 4), new Point(91, 6)));
  currentTileLines.push(new Line2D(new Point(91, 6), new Point(178, 20)));
  currentTileLines.push(new Line2D(new Point(178, 20), new Point(243, 24)));
  currentTileLines.push(new Line2D(new Point(243, 24), new Point(306, 21)));
  currentTileLines.push(new Line2D(new Point(306, 21), new Point(377, 15)));
  currentTileLines.push(new Line2D(new Point(377, 15), new Point(433, 8)));
  currentTileLines.push(new Line2D(new Point(433, 8), new Point(511, 7)));
  currentTileLines.push(new Line2D(new Point(511, 7), new Point(511, 263)));
  currentTileLines.push(new Line2D(new Point(511, 263), new Point(0, 264)));
  currentTileLines.push(new Line2D(new Point(0, 264), new Point(0, 6)));
  tileData["https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGreen_Hill_Semi-solid_1.png?v=1615659396765"] = currentTileLines;
  
  // platform 4
  currentTileLines = [];
  currentTileLines.push(new Line2D(new Point(63, 71), new Point(63, 71)));
  currentTileLines.push(new Line2D(new Point(63, 71), new Point(75, 61)));
  currentTileLines.push(new Line2D(new Point(75, 61), new Point(439, 61)));
  currentTileLines.push(new Line2D(new Point(439, 61), new Point(447, 72)));
  currentTileLines.push(new Line2D(new Point(447, 72), new Point(447, 86)));
  currentTileLines.push(new Line2D(new Point(447, 86), new Point(440, 92)));
  currentTileLines.push(new Line2D(new Point(440, 92), new Point(73, 90)));
  currentTileLines.push(new Line2D(new Point(73, 90), new Point(64, 85)));
  currentTileLines.push(new Line2D(new Point(64, 85), new Point(63, 72)));
  tileData["https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGreen_Hill_Semi-solid_2.png?v=1615659399373"] = currentTileLines;
  
  // platform 5
  currentTileLines = [];
  currentTileLines.push(new Line2D(new Point(0, 396), new Point(0, 396)));
  currentTileLines.push(new Line2D(new Point(0, 396), new Point(113, 383)));
  currentTileLines.push(new Line2D(new Point(113, 383), new Point(172, 383)));
  currentTileLines.push(new Line2D(new Point(172, 383), new Point(220, 384)));
  currentTileLines.push(new Line2D(new Point(220, 384), new Point(316, 396)));
  currentTileLines.push(new Line2D(new Point(316, 396), new Point(396, 395)));
  currentTileLines.push(new Line2D(new Point(396, 395), new Point(511, 381)));
  currentTileLines.push(new Line2D(new Point(511, 381), new Point(512, 510)));
  currentTileLines.push(new Line2D(new Point(512, 510), new Point(0, 512)));
  currentTileLines.push(new Line2D(new Point(0, 512), new Point(1, 396)));
  tileData["https://cdn.glitch.global/ea9bc5ca-f0db-4943-a3bc-98bfee9731e7/Green_Hill_Low_Flat_Tile.png?v=1654892954157"] = currentTileLines;
  
  
}