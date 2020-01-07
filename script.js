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
  
  // draws stage
  fill("lime");
  rect(425, 400, 1000, 20);
  fill("brown");
  arc(1000, 500, 1000, 250, 0, PI);
  
  // draws P1's UI
  fill(255, 90, 90);
  rect(0, 600, 500, 400);
  
  // draws P2's UI
  fill(90, 90, 255);
  rect(1350, 600, 500, 400);
  
  // draws P1's commands
  /*
  fill(200, 0, 0);  
  text('Text Here', 20, 640);
  */
  
  // draws P2's commands
  fill(0, 0, 200);
  text('Text There', 1370, 640);
  
  
  fill(200, 0, 0);
  for (var i = 0; i < numCommands; i++)
  {
      text('Text Here', 20, 640 + (i * textInterval));
  }
  
}
var startY = 650;
var endY = 950;
var numCommands = 6;
var textBoxHeight = endY - startY;
var textInterval = textBoxHeight / (numCommands - 1);
