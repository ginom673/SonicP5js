// called at the beginning
function setup()
{
  createCanvas(1850,1000);
  background(0);
  textStyle(BOLD);
  textSize(32);
}

// constantly called to update the screen 
function draw()
{
  
  // draws P1's 
  fill(255, 90, 90);
  rect(0, 600, 500, 400);
  
  fill(90, 90, 255);
  rect(1350, 600, 500, 400);
  
  
  fill(200, 0, 0);  
  text('Text Here', 20, 640);
  
  fill(0, 0, 200);
  text('Text There', 1370, 640);
}
var startY = 650;
var endY = 900;
var numCommands = 5;
var textBoxHeight = endY - startY;
var textInterval = textBoxHeight / (numCommands - 1);
