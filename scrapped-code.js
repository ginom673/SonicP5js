//background1 = createImg("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2Fgreen_hill_background_loop.gif?v=1601145979742");
//background1.position(38, 38);
//background1.size(1200, 776);
  
//background1.remove();
//background1 = loadImage("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2Fgreen_hill_background_loop.gif?v=1601145979742");

//fill("#32a83a");

// platform1.addTile(someTile)
  
//fill("#b56d1b");
// platform2 = new Platform(0, 620, 1150, 25, "#b56d1b");

/*
var tile1 = new Tile(0, 524, "#FF0000");
var tile2 = new Tile(tileDefaultW, 524, "#FF0000");
var tile3 = new Tile(tileDefaultW * 2, 524, "#FF0000");
var tile4 = new Tile(tileDefaultW * 3, 524, "#FF0000");
var tile5 = new Tile(tileDefaultW * 4, 524, "#FF0000");
var tile6 = new Tile(tileDefaultW * 5, 524, "#FF0000");
var tile7 = new Tile(tileDefaultW * 6, 524, "#FF0000");
var tile8 = new Tile(tileDefaultW * 7, 524, "#FF0000");
var tile9 = new Tile(tileDefaultW * 8, 524, "#FF0000");
var tile10 = new Tile(tileDefaultW * 9, 524, "#FF0000");
var tile11 = new Tile(tileDefaultW * 10, 524, "#FF0000");
var tile12 = new Tile(tileDefaultW * 11, 524, "#FF0000");
var tile13 = new Tile(tileDefaultW * 12, 524, "#FF0000");
var tile14 = new Tile(tileDefaultW * 13, 524, "#FF0000");
var tile15 = new Tile(tileDefaultW * 14, 524, "#FF0000");
var tile16 = new Tile(tileDefaultW * 15, 524, "#FF0000");
var tile17 = new Tile(tileDefaultW * 16, 524, "#FF0000");
var tile18 = new Tile(tileDefaultW * 17, 524, "#FF0000");
var tile19 = new Tile(tileDefaultW * 18, 524, "#FF0000");
var tile20 = new Tile(tileDefaultW * 2, 524, "#FF0000");

platform1.addTile(tile1);
platform1.addTile(tile2);
platform1.addTile(tile3);
platform1.addTile(tile4);
platform1.addTile(tile5);
platform1.addTile(tile6);
platform1.addTile(tile7);
platform1.addTile(tile8);
platform1.addTile(tile9);
platform1.addTile(tile10);
platform1.addTile(tile11);
platform1.addTile(tile12);
platform1.addTile(tile13);
platform1.addTile(tile14);
platform1.addTile(tile15);
platform1.addTile(tile16);
platform1.addTile(tile17);
platform1.addTile(tile18);
// platform1.addTile(tile19);
*/
//rect(50, 50, screenWidth - 50, screenHeight - 50);
//rect(borderWidth/2 - 50, borderWidth/2 + 50, screenWidth - borderWidth, screenHeight - borderWidth)
//rect(borderWidth/2 + 50,borderWidth/2 - 50,1280-borderWidth+20,721-borderWidth);
//rect(0,0,1152,649);




/*
if(platform.tileImageName == "tile 1")
{
  // var adjustedHitbox = platform.tiles[i];
  // adjustedHitbox.y = adjustedHitbox.y + adjustedHitbox.h/2;
  // adjustedHitbox.h = adjustedHitbox.h/2; 
  var originalY = platform.tiles[i].y;
  var originalH = platform.tiles[i].h; 
  platform.tiles[i].y = platform.tiles[i].y + platform.tiles[i].h/2;
  platform.tiles[i].h = platform.tiles[i].h/2;
  var collisionStatus = collide(sonic, platform.tiles[i]);    
  platform.tiles[i].y = originalY;
  platform.tiles[i].h = originalH;
}
else
{
  var collisionStatus = collide(sonic, platform.tiles[i]);    
}
*/

/*
if (collisionStatus != 'none')
{
  // sloppy workaround - set sonic's y based on the tile's y position that we collided with
  // NOTE: commenting this out seems to produce different collision effects
  this.y = platform.tiles[i].y - this.h;
  this.onGround = true;
  return collisionStatus;
}
*/


// controls default Tile size
/*
var tileDefaultW = 128;
var tileDefaultH = 128;
*/


// tile name ---> "green hill ground"
// "green hill float"
// image name ---> https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2Fgreen_hill_ground_flat.png?v=1601140825013

// sonicImgNormal = createImg("https://cdn.glitch.com/6e344420-4b09-4670-a529-dc21e1a4da32%2FSonic_Run.gif?v=1599326604172");
// sonicImgNormal.position(100, 500);  


/*
        if(platforms[i].tileImageName == "tile 1")
        {
          // console.log("tile 1");
          /*var adjustedHitbox = platforms[i].tiles[j];
          adjustedHitbox.y = adjustedHitbox.y + adjustedHitbox.h/2;
          adjustedHitbox.h = adjustedHitbox.h/2;
          // rect(platforms[i].tiles[j].x + tileHorizontalOffset, platforms[i].tiles[j].y + platforms[i].tiles[j].h/2 + tileVerticalOffset, platforms[i].tiles[j].w, platforms[i].tiles[j].h/2);
          rect(platforms[i].tiles[j].hx + tileHorizontalOffset, platforms[i].tiles[j].hy + tileVerticalOffset, platforms[i].tiles[j].hw, platforms[i].tiles[j].hh);
          if(!reported)
          {
            console.log(adjustedHitbox);
            console.log(platforms[i].tiles[j]);          
            reported = true;    
          }

        }
        else
        {
          // rect(currentTile.x + tileHorizontalOffset, currentTile.y + tileVerticalOffset, currentTile.w, currentTile.h);
          rect(currentTile.hx + tileHorizontalOffset, currentTile.hy + tileVerticalOffset, currentTile.hw, currentTile.hh);
        }     
        */

//console.log(collisions);
// NOTE: later we probably need to change this to collisionStatus == "top" or something
// NOTE: would collisions == [] work?
/*
if (collisions.length == 0)
{
  sonic.onGround = false;
}
*/


    // set sonic.imgname to the link for the image
    // reload sonic.img property
    // set sonic.w to the width of new image
    // set sonic.h to height of new image

//collisions = sonic.checkPlatformCollisions();
//sonic.checkPlatformCollisions();
// console.log(collisions);
// NOTE: unable to fall off cliff because left/right collisions here
/*
if (collisions.includes('left') || collisions.includes('right'))
{
  console.log("triggered");
  sonic.x = sonic.x - sonic.vx;
}
*/


//sonicImgNormal.position(sonic.x, sonic.y);  



// this.y = platform.tiles[i].hy - this.hh;
// this.hy = platform.tiles[i].hy - this.hh;

// console.log(sonic.hx);
// rect(sonic.hx, sonic.hy, sonic.hw, sonic.hh);

// update the position and speed of sonic (also update hitbox position)
/*
var speedDirection = 0;
if(sonic.vx < 0)
{
  speedDirection = -1;
}
else if(sonic.vx > 0)
{
  speedDirection = 1;
}
sonic.vx = sonic.vx + sonic.ax;
if(speedDirection == -1 && sonic.vx >= 0)
{
  sonic.vx = 0;
  sonic.ax = 0;
}
if(speedDirection == 1 && sonic.vx <= 0)
{
  sonic.vx = 0;
  sonic.ax = 0;
}
*/