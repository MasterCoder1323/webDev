var nose = {
	x: 0,
	y: 0
}

var wrists = {
	right: {
		x: 0
	},
	left: {
		x: 0
	},
	differance: function () {
		return this.left.x - this.right.x;
	}
}

// Import PoseNet
var ready = false;

function modelLoaded() {
	console.log("Posenet Ready", model);
}


function setup() {
	//Create Canvases
	canvas = createCanvas(550, 550);
	videoHolder = createGraphics(550, 500, document.getElementById('video-canvas'));
	//Position Canvases
	canvas.parent("canvas-holder");
	videoHolder.parent('video-holder');
	//Make videoHolder visible
	document.getElementById('video-canvas').style.display = "block";
	//Create Capture
	video = createCapture(VIDEO);
	video.hide();
	//Posenet
	posenet = ml5.poseNet(video, modelLoaded);
	posenet.on('pose', gotPoses);
}

function draw() {
	background("white");
	fill("turquoise");
	rect(nose.x, nose.y, wrists.differance(), wrists.differance());
	videoHolder.image(video, 0, 0, 550, 500);
}

function gotPoses(results, error) {
	if (error) {
		console.error(error);
	}
	if (results.length > 0) {
		console.log(results, results[0]);
		nose.x = results[0].pose.nose.x;
		nose.y = results[0].pose.nose.y;
		wrists.right.x = results[0].pose.rightWrist.x;
		wrists.left.x = results[0].pose.leftWrist.x;
		console.log(nose, wrists);
	}
}
