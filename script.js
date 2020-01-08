// ---------- IDEAS ----------

// make players take their turns AT THE SAME TIME! 
// make the player choices invisible on the screen... aka rather than moving up and down with some selector, they just press 6 to do command 6


var fighterImg;

// called at the beginning
function setup()
{
  createCanvas(1850,1000);
  background(0);
  textStyle(BOLD);
  textSize(32);
  fighterImg = loadImage("https://cdn.glitch.com/3c8bb0ef-34b4-4b1b-8044-7b2c1b6c0326%2Foldschool%20sonic%20removebg.png?v=1578441223317");
}

// constantly called to update the screen 
function draw()
{
  
  // draws stage
  fill("lime");
  rect(425, 400, 1000, 20);
  fill("green");
  arc(925, 420, 1000, 250, 0, PI);
  fill("yellow");
  rect(575, 300, 250, 20);
  fill("red");
  rect(800, 200, 250, 20);
  fill("blue");
  rect(1025, 300, 250, 20);
  
  // draw fighter
  // GINO - test platform locations here!
  image(fighterImg, p1x, p1y, 66, 82);
  
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


// coordinates for the centers of the platforms

var p1x = 650;
var p1y = 220;
//var p2x = 

