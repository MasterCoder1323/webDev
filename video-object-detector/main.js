version https://git-lfs.github.com/spec/v1
oid sha256: 6c14e6acc3d6f81fcac965fa8924c9d6117914bd4cd8b2e01089be7f67e48c9f
size 1036
var model, objects, video;
var statusVar = document.getElementById('status');

function preload() {
	video = createVideo(["assets/video.mp4", "assets/video.webm"]);
}

function setup() {
	canvas = createCanvas(640, 480);
	canvas.parent('canvas-holder');
	model = ml5.objectDetector('cocossd', modelLoaded);
	video.hide();
}

function draw() {
	image(video, 0, 0, 640, 480);
	model.detect(video, gotResult);
	if (objects) {
		objects.forEach(function (object) {
			fill(255, 0, 0);
			text(object.label + " " + (object.confidence * 100).toFixed(2) + "%", object.x + 15, object.y + 15);
			noFill();
			stroke(255, 0, 0);
			rect(object.x, object.y, object.width, object.height);
		});
		document.getElementById("numO").innerHTML = objects.length;
	}
}

function modelLoaded() {
	console.log("Model Loaded: ", model);
	statusVar.innerHTML = "Detecting Objects";
	video.loop();
	video.volume(0.5);
}

function gotResult(error, results) {
	if (error) {
		console.log(error);
		alert(error);
	}
	console.log(results);
	objects = results;
}


