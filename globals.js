// GLOBAL VARIABLES

// developerMode determines whether or not we display hitboxes and statistics
var developerMode = true;

// image object for Sonic's run/jump stance
var sonicImgRun;
var sonicImgJump;

// y position of ground
var groundY = 484;

// gravity effect
var gravity = 0.4;

// image variable for background
var background1;
var bg;
var bgX = 0;

// screen dimensions
var screenWidth = 1200;
var screenHeight = 640;

// platform list
var platforms = [];

// platform autoscrolling rate
var autoscrollRate = 5;

// max falling speed for any character
var maxFallSpeed = 15;

// max flying speed for any character
var maxFlySpeed = -15;

// max horizontal movement speed for any character
// this is in absolute value, meaning the fastest we could go left is -1 * maxSpeedX
var maxSpeedX = 5;

// motobug enemy
var motobug;

// finish line
var goalRing;

// sounds
var deathNoise;
var jumpSound;
var breakNoise;

// sonic death image
var sonicDeathImage;

// world width/height
var worldWidth = 2528;
var worldHeight = screenHeight;

// global variables for Platform objects
var platform1;
var platform2;
var platform3;
var platform4;

// our boi
var sonic;

// what slope we are currently on - used to setup ignoredSlope after a jump
var currentSlope;

// what slope we ignore after jumping - fixes a bug where sonic is locked onto slope when trying to jump
var ignoredSlope;

var ringCount = 0;  