// called at the beginning
function setup()
{
  createCanvas(1850,1000);
  background(0);
}

// constantly called to update the screen 
function draw()
{
  fill(255, 90, 90);
  rect(0, 600, 500, 400);
  fill(90, 90, 255);
  rect(1350, 600, 500, 400);
  fill(200, 0, 0);
  textSize(32);
  textStyle(BOLD);
  text('text', 20, 640);
}