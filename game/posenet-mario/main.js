function preload() {
	world_start = loadSound("assets/sounds/world_start.wav");
	setSprites();
	MarioAnimation();
}

function setup() {
	canvas = createCanvas(1240, 336);
	canvas.parent('canvas');
	instializeInSetup(mario);
}

function draw() {
	game()
}

function getControles() {
	if (document.getElementById("arrow-key").checked) {
		return "arrow-keys";
	} else {
		return "posenet";
	}
}




