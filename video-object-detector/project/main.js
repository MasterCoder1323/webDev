version https://git-lfs.github.com/spec/v1
oid sha256: efed63fe584afbef42f50bf84281f46420ea685f63e32ab94c6cc1e626233040
size 1128
var model, objects;
var statusVar = document.getElementById('status');
var finding = "cell phone";

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
		found = false;
		objects.forEach(function (object) {
			if (object.label == finding) {
				found = true;
			}
			fill(255, 0, 0);
			text(object.label + " " + (object.confidence * 100).toFixed(2) + "%", object.x + 15, object.y + 15);
			noFill();
			stroke(255, 0, 0);
			rect(object.x, object.y, object.width, object.height);
		});
		if (found) {
			statusVar.innerHTML = "Found";
		} else {
			statusVar.innerHTML = "Not Found";
		}
	}
}

function modelLoaded() {
	console.log("Model Loaded: ", model);
}

function gotResult(error, results) {
	if (error) {
		console.log(error);
	}
	console.log(results);
	objects = results;
}

function changeObject() {
	finding = document.getElementById("object-to-find").value;
}