// Obstacle is any game object besides a platform that does not move (inanimate objects)
// unlike platforms, you do not land on obstacles
class Obstacle
{  
  
  constructor(x, y, w, h, imgName, hx, hy, hw, hh, isGif)
  {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.hx = hx;
    this.hy = hy;
    this.hw = hw;
    this.hh = hh;
    this.isGif = isGif;
    this.imgName = imgName;    
    this.image = createImg(imgName);
    // this.image.position(x,y);
    this.visible = true;
    this.hitboxActive = true;
  }
  
  display()
  {
    if (!this.visible)
    {         
      return;
    }

    if(this.isGif)
    {
      this.image.position(this.x, this.y);
    }
    else
    {
      image(this.image, this.x, this.y);
    }
  }
  
}

function setupRings()
{
  var ring = new Obstacle(400, groundY - 72, 32, 32, "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FRing.gif?v=1615927238069", 400, groundY - 72, 32, 32, true);          
  rings.push(ring);
}

function drawGoalRing()
{
  if (goalRing.x > 0 && goalRing.x < screenWidth - 80 && goalRing.y > 0 && goalRing.y < screenHeight)
  {
    goalRing.image.show();
    goalRing.display();     
  }
  else
  {
    goalRing.image.hide();
  }
}

function autoscrollGoalRing()
{
  goalRing.x = goalRing.x - autoscrollRate;
  goalRing.hx = goalRing.hx - autoscrollRate;
}

function drawRings()
{
  for (var i=0; i < rings.length; i++)
  {
    var currentRing = rings[i];    
    if (currentRing.x > 0 && currentRing.x < screenWidth && currentRing.y > 0 && currentRing.y < screenHeight)
    {
      currentRing.image.show();
      currentRing.display();     
    }
    else
    {
      currentRing.image.hide();
    }    
  }  
}

function autoscrollRings()
{
  for (var i=0; i < rings.length; i++)
  {
    var currentRing = rings[i];    
    currentRing.x = currentRing.x - autoscrollRate;
    currentRing.hx = currentRing.hx - autoscrollRate;
  }
}