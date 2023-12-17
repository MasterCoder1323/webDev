var img, url;
var loaded = false;
const fileInput = document.getElementById('fileInput');
var statusVar = document.getElementById('status');
var model;

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
	statusVar.innerHTML = 'Drawing Image, and Identifing Image';
});

function setup() {
	canvas = createCanvas(640, 480);
	canvas.parent('canvas-holder');
	model = ml5.objectDetector('cocossd', modelLoaded());
}

function draw() {
	if (loaded) {
		image(img, 0, 0, 640, 480);
		statusVar.innerHTML = 'Identifing Image';
	}
}

function modelLoaded() {
	console.log("Model Loaded: ", model);
}


