// ---------- TIPS ----------

// FIND AND REPLACE ALL
// in glitch.com you can find and replace text using CTRL+ALT+F

// ---------- NOTES ----------

// WEBSITE FOR BUTTON IMAGES
// google da button factory

// it seems that the image position represents the bottom-left corner of the image

// ANIMATION
// gif is 13 FPS
// prep is frames 1-6 (6 frames)
// jump is frames 7-16 (10 frames)
// land is frames 17-21 (5 frames)
// we assume the peak of our jump is horizontally halfway between the source and destination,
// and that the peak of our jump is 50% of dy above the highest point
// with these numbers, this means our jump should take 10/13 of a second
// if we want half the jump to be going up and half to be going down, each half takes 10/26 of a second

// EXAMPLE OBJECT FUNCTIONS for fighters that we could maybe use later
/*
function createFighter(x, y)
{
  var fighter = {};
  fighter.x = x;
  fighter.y = y;
  fighter.hp = 500;
  fighter.max_hp = 500;
  //fighter.image = loadImage("blah blah blah");
  fighter.color = "red";
}

function recolorFighter(fighter, colorName)
{
  fighter.color = colorName;
}

function damage(fighter, amount)
{
  fighter.hp = fighter.hp = amount;
  // include logic to check if dead or something, hp <= 0
}
*/

// ---------- IDEAS ----------

// write some code which allows the players to be repositioned with a button press or something for debugging purposes
// make sure the players can only attack each other with melee attacks if they are near each other

// ---------- BUGS ----------

// if we reposition the gif, it may restart from frame 1 instead of the frame where it moved ... minor concern though
// however, we may decide to make a "movement animation", such that we dont instantly teleport between locations, and instead get a gradual movement to the location

// for some reason, the positioning of the click for the button is a little off
// for some reason, the jump animation plays in the middle of when you jump (if you get lucky)
// if the jumping animation is constantly happening the background, such that when we press j, we may start the animation in the middle,
// ... IF that is true, a solution would potentially be resetting the gif every time we restart it

// icicle toss and fire throw deal different damage...?

// restart button doesnt load