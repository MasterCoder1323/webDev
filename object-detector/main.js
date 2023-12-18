var img, url, model, objects;
var loaded = false;
var detected = false;
const fileInput = document.getElementById('fileInput');
var statusVar = document.getElementById('status');
fileInput.addEventListener("change", function (event) {
	const selectedFile = event.target.files[0];
	statusVar.innerHTML = 'Generating URL';
	url = URL.createObjectURL(selectedFile);
	console.log("URL: ", url);
	statusVar.innerHTML = 'Reading Image';
	img = loadImage(url);
	console.log("Image: ", img);
	loaded = true;
	document.getElementById('sButton').disabled = false;
	statusVar.innerHTML = 'Drawing Image';
});

function setup() {
	canvas = createCanvas(640, 480);
	canvas.parent('canvas-holder');
	model = ml5.objectDetector('cocossd', modelLoaded);
}

function draw() {
	if (loaded) {
		image(img, 0, 0, 640, 480);
		if (detected) {
			objects.forEach(function (object) {
				fill(255, 0, 0);
				text(object.label + " " + (object.confidence * 100).toFixed(2) + "%", object.x + 15, object.y + 15);
				noFill();
				stroke(255, 0, 0);
				rect(object.x, object.y, object.width, object.height);
				statusVar.innerHTML = 'Complete!';
			});
		} else {
			statusVar.innerHTML = 'Ready for Submit';
		}
	}
}

function modelLoaded() {
	console.log("Model Loaded: ", model);
}

function submit() {
	model.detect(img, gotResult);
}

function gotResult(error, results) {
	statusVar.innerHTML = 'Detecting';
	if (error) {
		console.log(error);
		alert(error);
	}
	console.log(results);
	objects = results;
	detected = true;
}

