function preload() {
	song1 = loadSound("assets/Born For This.mp3");
}
function setup() {
	canvas = createCanvas(600, 500);
	canvas.parent("canvas-parent");

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}
function modelLoaded() {
	console.log('PoseNet Is Initialized');
}