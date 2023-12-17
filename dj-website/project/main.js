function preload() {
	song1 = loadSound("assets/Midnight-Escapade.mp3");
	song2 = loadSound("assets/midnight-chase.mp3");
	song2.pause();
	song1.pause();
}
function setup() {
	canvas = createCanvas(600, 500);
	canvas.parent("canvas-holder");

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}
function modelLoaded() {
	console.log('PoseNet Is Initialized');
}
function draw() {
	image(video, 0, 0, 600, 500);
}
function gotPoses(results) {
	if (results.length > 0) {
		console.log(results, results[0].pose.rightWrist.y, results[0].pose.leftWrist.y);
		if (results[0].pose.rightWrist.y < 250 && song2.isPaused()) {
			song1.pause();
			song2.play();
		} else if (results[0].pose.leftWrist.y < 250 && song1.isPaused()) {
			song2.pause();
			song1.play();
		} else {
			song2.pause();
			song1.pause();
		}
	}
}