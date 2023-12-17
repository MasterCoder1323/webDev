function preload() {
	song1 = loadSound("assets/Midnight-Escapade.mp3");
	song2 = loadSound("assets/midnight-chase.mp3");
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
		console.log(results);
		if (results[0].pose.rightWrist.y < 250 && results[0].pose.rightWrist.confidence > 65) {
			song = 
		}
	}
}