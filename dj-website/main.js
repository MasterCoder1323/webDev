var song = "";

var wrists = {
	left: {
		x: 0,
		y: 0,
		score
	},
	right: {
		x: 0,
		y: 0,
		score
	},
	volume: function () {
		return (floor(Number(this.left.score) * 2) / 1000);
	},
	speed: function () {
		return (this.right.score / 200).toFixed(1);
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