var mario;
function preload() {
	world_start = loadSound("assets/sounds/world_start.wav");
	mario = {
		jump: loadSound("assets/sounds/jump.wav"),
		//coin: loadSound("assets/sounds/coin.wav"),
		kick: loadSound("assets/sounds/kick.wav"),
		die: loadSound("assets/sounds/mariodie.wav")
	}
	gameoversound = loadSound("assets/sounds/gameover.wav");
	setSprites();
	MarioAnimation();
}

function setup() {
	canvas = createCanvas(1240, 336);
	canvas.parent('canvas');

	video = createCapture(VIDEO);
	video.size(800, 400);
	video.parent("game_console");

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);

	instializeInSetup(mario);
}

function modelLoaded() {
	console.log("Model Has Been Loaded:", poseNet);
}

function gotPoses(results, error) {
	if (error) {
		console.log(error);
	} else if (results.length > 0) {
		console.log('Successful Results', results);
		nose = results[0].pose.nose;
	}
}

function draw() {
	game()
}

function getControles() {
	if (document.getElementById("arrow-key").checked) {
		return true;
	} else {
		return false;
	}
}




