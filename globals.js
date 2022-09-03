// GLOBAL VARIABLES

// developerMode determines whether or not we display hitboxes and statistics
var developerMode = false;

// whether or not we are in "drawing mode" (to draw hitboxes of tiles)
var drawingMode = false;

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

// rings
var rings = [];

// sounds
var deathNoise;
var jumpSound;
var breakNoise;
var spindashSound;
var goalRingSound;
var ringGetSound;
var transformSound;

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

// number of rings player currently has (NOT the total amount they've ever earned)
// rings are converted into score points at the end of the goal
var ringCount = 0;  

// you earn score for destroying enemies, and for rings you still have by the end of the stage
var score = 0;

// the amount of time that a full (uninterrupted) spin dash lasts (in milliseconds, ms)
var spinDuration = 1000;

// timeout interval for spinning (this timeout is cancelled if the spin ends earlier than the timeout expects)
var stopSpinTimeout;

var transformTimeout;

// whether or not shadows are enabled (for performance purposes)
var shadowsEnabled = false;

// CUSTOM FONT
var sonicHUD;