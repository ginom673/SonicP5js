// GLOBAL VARIABLES

var sonicImg;

function setup()
{
  createCanvas(800,600);  
  sonicImg = createImg("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2Fsonicdashrun.gif?v=1598730627392");
  sonicImg.position(100, 100);
  
}

function draw()
{
  image(sonicImg, 50, 50);
}