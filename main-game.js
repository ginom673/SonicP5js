function setupGame()
{
  // background is stretched to be larger than screen
  bg.resize(2528, screenHeight);  
  
  // setup platforms
  setupPlatforms();
  
  // setup Sonic
  setupSonic();
  
  // setup enemies
  setupEnemies();  
  
  // setup rings
  setupRings();
  
  // create goal ring (AKA finish line)
  goalRing = new Obstacle(2816, groundY - 128, 128, 128, "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGoal_Ring.gif?v=1615926793357", 2816, groundY - 128, 128, 128, true);
}

function drawGame()
{
  
  // wipe screen before redrawing
  clear();

  // stroke and fill
  var borderWidth = 6;
  stroke(borderWidth);
  noFill();

  // update sonic
  updateSonic();

  // update enemy (motobug)
  updateEnemies();  

  // draw background
  drawBG();

  // draw sonic image
  drawSonic();

  // draw enemies
  drawEnemies();

  // draw goal ring (finish line)
  drawGoalRing();

  // display platforms
  drawPlatforms(); 

  // draw rings
  drawRings();

  // draw shadows for ring and score text
  drawingContext.shadowOffsetX = 5;
  drawingContext.shadowOffsetY = -5;
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = 'black';

  // draw ring text
  fill(255, 240, 0);
  stroke(0,0,0);
  strokeWeight(3);
  textSize(24);
  strokeWeight(1);
  text("RING  " + ringCount, 100, 100);

  // draw score text
  textFont(sonicHUD);
  text("SCORE  " + score, 100, 75);

  // turn off shadows for ring and score text
  // drop shadow
  if(!shadowsEnabled)
  {
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = 0;
    drawingContext.shadowColor = undefined;    
  }  

  // display certain information in "developerMode" i.e. hitboxes, stats
  if (developerMode)
  {    
    drawDebug();
  }

  // autoscroll enemies
  autoscrollEnemies();

  // autoscroll goal
  autoscrollGoalRing();

  // autoscroll platforms and slopes
  autoscrollPlatforms();  

  // autoscroll rings
  autoscrollRings();

}

// draw background
function drawBG()
{

  // background color
  background("#2792da");

  // background image
  image(bg, bgX, 0);

}

// autoscroll background
function autoscrollBG()
{
  bgX = bgX - (autoscrollRate * 0.4);
}

// handles sonic's collisions with platforms and enemies
function sonicCollisions()
{

  // check if sonic is not alive, if that is true, return

  if (!sonic.isAlive)
  {
    return;
  }

  // get collisions list
  var collisions = sonic.checkPlatformCollisions();    

  // handle platform collisions
  var collided = false;
  for (var i=0; i < collisions.length; i++)
  {    
    var tileCollisions = collisions[i];    
    for (var j=0; j < tileCollisions.length; j++)
    {
      // grab the item @ position j from tileCollisions and store that into a variable called collisionStatus
      var collisionStatus = tileCollisions[j];
      // if collisionStatus is not none, set collided to true
      if (collisionStatus != 'none')
      {
        collided = true;
      }
    }    
  }
  if (!collided)
  {
    sonic.onGround = false;
  }

  // handle slope collisions
  collidedTiles = [];
  var collideAnySlopes = false;
  var sonicMidX = sonic.x + sonic.w / 2;
  for (var i = 0; i < platforms.length; i++)
  {
    var platform = platforms[i];
    for (var j = 0; j < platform.tiles.length; j++)
    {
      var tile = platform.tiles[j];      
      
      /*
      for (var k = 0; k < tile.slopes.length; k++)
      {
        var myLine = tile.slopes[k];
      }
      */
      
      var tileLines = tileData[tile.imgName];
      for (var k = 0; k < tileLines.length; k++)
      {
        var l = tileLines[k];
        
        // using the point constructor, create a point 
        // where its x is l.p1.x - 35
        // and its y is l.p1.y - 35
        // then create another point
        // where its x is l.p2.x - 35
        // and its y is l.p2.y - 35
        
        var adjustedLine = new Line2D(new Point(l.p1.x - 35, l.p1.y - 35), new Point(l.p2.x - 35, l.p2.y - 35));       
    
        // the hitboxes of the lines are offset for some reason, so adjust the line    
        /*
        var adjustedLine = {
          x1: tile.x + l.p1.x - 35,
          y1: tile.y + l.p1.y - 35,
          x2: tile.x + l.p2.x - 35,
          y2: tile.y + l.p2.y - 35
        };
        */
        
        // ignore ignoredslope
        if (adjustedLine == ignoredSlope)
        {
          continue;
        }

        // ignore this slope if sonicMidX is beyond the line
        if (sonicMidX < adjustedLine.p1.x || sonicMidX > adjustedLine.p2.x)
        {
          continue;
        }

        // sonic collides with this slope
        if (line_intersects_rect(adjustedLine, sonic))
        {
          
          // add this tile to collidedTiles (for debugging)
          if(!collidedTiles.includes(tile))
          {
            collidedTiles.push(tile);  
          }          

          // calculate sonic's position along slope
          var slope = (adjustedLine.p2.y - adjustedLine.p1.y) / (adjustedLine.p2.y - adjustedLine.p1.x);
          var dx = sonic.x - adjustedLine.p2.x
          var dy = slope * dx;
          var endY = adjustedLine.p1.y + dy;
          sonic.land(endY - sonic.h / 2);

          // update currentSlope and collideAnySlope variables        
          currentSlope = adjustedLine;
          collideAnySlopes = true;

        }
      }  
    }
  }  

  // if we didn't collide with any slopes, set currentSlope to undefined
  if (!collideAnySlopes)
  {
    currentSlope = undefined;
  }

  // check if sonic should be dragged with auto scroll if not moving on left side of a platform
  for (var i=0; i < collisions.length; i++)
  {
    if(collisions[i].includes("left"))
    {
      sonic.x = sonic.x - autoscrollRate;
      sonic.hx = sonic.hx - autoscrollRate;
    }
  }  

}

function keyPressedGame()
{

  // ignore keys if dead
  if (!sonic.isAlive)
  {
    return;
  }

  // Z for jump
  if (keyCode == 90)
  {
    sonic.jump();
  }

  // right arrow
  else if (keyCode == 39)
  {
    sonic.ax = 0.2;
    sonic.accelerationStatus = 1;
  }

  // left arrow
  else if (keyCode == 37)
  {
    sonic.ax = -0.2;
    sonic.accelerationStatus = 1;
  }

  // F9 for debug mode
  if(keyCode == 120)
  {
    developerMode = !developerMode;
  }

  // down/X for spindash
  if(keyCode == 40 || keyCode == 88)
  {
    sonic.spin();
  }

  // S for super transform
  if(keyCode == 83)
  {
    sonic.transform();
  }

  // R for automatic reset
  if(keyCode == 82)
  {
    resetGame();
  }


}

// NOTE: set sonic.vx back to 0 if left arrow or right arrow key was just released
function keyReleasedGame()
{

  // ignore keys if dead
  if (!sonic.isAlive)
  {
    return;
  }

  // right arrow
  if (keyCode == 39)
  {
    if(sonic.vx > 0)
    {
      sonic.ax = -0.25;
    }
    else
    {
      sonic.ax = 0.25;
    }
    sonic.accelerationStatus = -1;
  }

  // left arrow
  else if (keyCode == 37)
  {
    // sonic.vx = 0;
    // sonic.ax = 0.25;
    if(sonic.vx > 0)
    {
      sonic.ax = -0.25;
    }
    else
    {
      sonic.ax = 0.25;
    }
    sonic.accelerationStatus = -1;
  }
  
}

// this function determines if any two rectangles (r1, r2) "collide" in the sense that the rectangles overlap AT ALL
// each variable, r1 and r2, simply needs to be an object with hx, hy, hw, hh properties (for hitboxes)
// any object (be it an obstacle, platform, character, whatever) will suffice as long as it has those properties
// the function returns "bottom", "left", "right", "top", or "none", indicating what side of r2 that r1 collided with (not sure which way it is though??? r1 or r2)
// taken from https://stackoverflow.com/questions/29861096/detect-which-side-of-a-rectangle-is-colliding-with-another-rectangle
function collide(r1,r2)
{
  var dx=(r1.hx+r1.hw/2)-(r2.hx+r2.hw/2);
  var dy=(r1.hy+r1.hh/2)-(r2.hy+r2.hh/2);
  var width=(r1.hw+r2.hw)/2;
  var height=(r1.hh+r2.hh)/2;
  var crossWidth=width*dy;
  var crossHeight=height*dx;
  var collision='none';
  if(Math.abs(dx)<=width && Math.abs(dy)<=height){
      if(crossWidth>crossHeight){
          collision=(crossWidth>(-crossHeight))?'bottom':'left';        
      }else{
          collision=(crossWidth>-(crossHeight))?'right':'top';
      }
  }
  return(collision);
}


/*
determines if a line intersects a rectangle
*/

function line_intersects_rect(l, r)
{      

  var rx = r.x;
  var ry = r.y;
  var rw = r.w;
  var rh = r.h;

  var p1 = l.p1;
  var p2 = l.p2;

  var x1 = p1.x;
  var y1 = p1.y;
  var x2 = p2.x;
  var y2 = p2.y;

  // check if top line of rectangle intersects given line
  var a = line_intersects_line(x1, y1, x2, y2, rx, ry, rx + rw, ry);
  if (a)
  {
    return true;
  }
  // check if right line of rectangle intersects given line
  var b = line_intersects_line(x1, y1, x2, y2, rx + rw, ry, rx + rw, ry + rh);
  if (b)
  {
    return true;
  }
  // check if bottom line of rectangle intersects given line
  var c = line_intersects_line(x1, y1, x2, y2, rx + rw, ry + rh, rx, ry + rh);
  if (c)
  {
    return true;
  }
  // check if left line of rectangle intersects given line
  var d = line_intersects_line(x1, y1, x2, y2, rx, ry + rh, rx, ry);
  if (d)
  {
    return true;
  }
  // check if rectangle contains first point
  var e = rect_contains(rx, ry, rw, rh, x1, y1);

  // check if rectangle contains second point
  var f = rect_contains(rx, ry, rw, rh, x2, y2);

  // a, b, c, d, e and f are all booleans 
  return e && f;
  // return a or b or c or d or (e and f)
}

/*
determines if two lines intersect
*/
function line_intersects_line(x1, y1, x2, y2, x3, y3, x4, y4)
// function line_intersects_line(l1, l2)
{

  /*
  var x1 = l1.p1.x;
  var y1 = l1.p1.y;
  var x2 = l1.p2.x;
  var y2 = l1.p2.y;
  var x3 = l2.p1.x;
  var y3 = l2.p1.y;
  var x4 = l2.p2.x;
  var y4 = l2.p2.y;
  */

  var q = (y1 - y3) * (x4 - x3) - (x1 - x3) * (y4 - y3);
  var d = (x2 - x1) * (y4 - y3) - (y2 - y1) * (x4 - x3);
  if (d == 0)
  {
    return false;
  }
  var r = q / d;
  q = (y1 - y3) * (x2 - x1) - (x1 - x3) * (y2 - y1);
  var s = q / d;
  if(r < 0 || r > 1 || s < 0 || s > 1)
  {
      return false;
  }
  return true;
}

/*
determines if a rectangle contains a given point
*/
function rect_contains(r, x, y)
{
  return x > r.x && x < r.x + r.w && y < r.y && y > r.y - r.h;
}

// resets game
function resetGame()
{

  // reset platforms
  platforms = [];  

  // hide old motobug image (otherwise it will linger for some reason)
  motobug.img.hide();

  // reset background
  bgX = 0;

  // reset slope variables
  currentSlope = undefined;
  ignoredSlope = undefined;

  // reset platforms
  setupPlatforms();  

  // reset Sonic
  setupSonic();

  // reset enemies
  setupEnemies();  

  // reset rings
  setupRings();

  // create goal ring (AKA finish line)
  goalRing = new Obstacle(2816, groundY - 128, 128, 128, "https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FGoal_Ring.gif?v=1615926793357", 2816, groundY - 128, 128, 128, true);

  autoscrollRate = 5;
}

function drawDebug()
{

  // draw sonic hitbox for debugging
  // shift the rectangle and draw it at sonic.x - (sonic.w/2), sonic.y - (sonic.h/2)
  // NOTE: why did we originally subtract by w/2, h/2? sonic's (x,y) is top-left corner of rectangle
  noFill();
  strokeWeight(3);
  stroke(255,255,0);
  if (sonic.hitboxActive)
  {
    rect(sonic.hx - sonic.w/2, sonic.hy - sonic.h/2, sonic.hw, sonic.hh);
  }

  // draw motobug hitbox for debugging
  if (motobug.isAlive && motobug.hitboxActive)
  {
    rect(motobug.hx - motobug.w/2, motobug.hy - motobug.h/2, motobug.hw, motobug.hh);
  }

  // draw the tile hitboxes for debugging
  // stroke(0,255,255);
  strokeWeight(5);
  for (var i = 0; i < platforms.length; i++)
  {
    for (var j = 0; j < platforms[i].tiles.length; j++)
    {  
      var currentTile = platforms[i].tiles[j];
      
      
      // stroke(0,255,255);
      
      // OLD HITBOX CODE
      /*
      rect(currentTile.hx + tileHorizontalOffset, currentTile.hy + tileVerticalOffset, currentTile.hw, currentTile.hh);

      // for loop here that goes through each line object in currentTile's slopes list
      for (var k = 0; k < currentTile.slopes.length; k++)
      {
        stroke(255, 0, 0);
        var l = currentTile.slopes[k];
        line(l.p1.x, l.p1.y, l.p2.x, l.p2.y);
      }
      */
      
      // NEW HITBOX CODE
      // fetch the lines associated with this tile
      // NOTE: this is offset by a bit ... we are assuming that (currentTile.x, currentTile.y) represents the top left corner of the currentTile
      //       and that the line data specify offsets from that top-left corner
      //       it is possible that (currentTile.x, currentTile.y) do not actually represent the top left corner of the currentTile as we expect
      //       maybe this has something to do with autoscrolling / camera controls?
      var tileLines = tileData[currentTile.imgName];
      for (var k = 0; k < tileLines.length; k++)
      {
        // if sonic is currently colliding with this tile, color it blue
        // otherwise color it red
        if(collidedTiles.includes(currentTile))
        {
          stroke(0, 0, 255);
        }
        else
        {
          stroke(255, 0, 0);    
        }
        
        var l = tileLines[k];
        line(currentTile.x + l.p1.x - 35, currentTile.y + l.p1.y - 35, currentTile.x + l.p2.x - 35, currentTile.y + l.p2.y - 35);
      }
      
    }
  }

  // display goal ring hitbox
  rect(goalRing.hx - goalRing.w/4, goalRing.hy - goalRing.h/4, goalRing.hw, goalRing.hh);

  // display ring hitboxes
  for (var i=0; i < rings.length; i++)
  {
    var currentRing = rings[i];
    rect(currentRing.hx - currentRing.w, currentRing.hy - currentRing.h, currentRing.hw, currentRing.hh);
  }    

    // display statistics for debugging
  fill(150, 150, 150);
  stroke(0,0,0);
  strokeWeight(3);
  textSize(24);
  strokeWeight(1);
  text("x: " + sonic.x.toFixed(2), 950, 75);
  text("y: " + sonic.y.toFixed(2), 950, 100);
  text("vx: " + sonic.vx.toFixed(2), 950, 125);
  text("vy: " + sonic.vy.toFixed(2), 950, 150);
  text("onGround: " + sonic.onGround, 950, 175);
  text("hx: " + sonic.hx.toFixed(2), 950, 200);
  text("hy: " + sonic.hy.toFixed(2), 950, 225);
  text("ax: " + sonic.ax.toFixed(2), 950, 250);
  text("aStatus: " + sonic.accelerationStatus.toFixed(2), 950, 275);
  text("status: " + sonic.status, 950, 300);
}