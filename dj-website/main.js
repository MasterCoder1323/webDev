var song = "";

var wrists = {
	left: {
		x: 0,
		y: 0,
		score: 1
	},
	right: {
		x: 0,
		y: 0,
		score: 1
	},
	volume: function () {
		return (floor(Number(this.left.score) * 2) / 1000).toFixed(1);
	},
	speed: function () {
		return (floor(Number(this.left.score) * 2) / 1000).toFixed(1);
	}
};
function preload() {
	song = loadSound("assets/Born For This.mp3")
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

function gotPoses(results) {
	if (results.length > 0) {
		wrists.right.score = results[0].pose.keypoints[10].score;
		wrists.left.score = results[0].pose.keypoints[9].score;
		console.log("scoreRightWrist = " + wrists.right.score + " scoreLeftWrist = " + wrists.left.score);

		rightWristX = results[0].pose.rightWrist.x;
		rightWristY = results[0].pose.rightWrist.y;
		console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);

		leftWristX = results[0].pose.leftWrist.x;
		leftWristY = results[0].pose.leftWrist.y;
		console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

	}
}
function draw() {
	image(video, 0, 0, 600, 500);
	song.rate(wrists.speed());
	song.setVolume(wrists.volume());
}
function play() {
	song.play();
	song.setVolume(1);
	song.rate(1);
}