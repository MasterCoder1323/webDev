function preload() {
	world_start = loadSound("assets/sounds/world_start.wav");
	setSprites();
	MarioAnimation();
}

function setup() {
	canvas = createCanvas(1240, 336);
	instializeInSetup(mario);
}

function draw() {
	game()
}






