var model, objects;
var statusVar = document.getElementById('status');

function setup() {
	canvas = createCanvas(640, 480);
	canvas.parent('canvas-holder');
	model = ml5.objectDetector('cocossd', modelLoaded);
	video = createCapture(VIDEO);
	video.size(640, 480);
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
}

function gotResult(error, results) {
	if (error) {
		console.log(error);
		alert(error);
	}
	console.log(results);
	objects = results;
}

