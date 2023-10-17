const model = ml5.imageClassifier('MobileNet', modelLoaded);
var ready = false;

function modelLoaded() {
	console.log("Model Loaded", model);
	ready = true;
}

function setup() {
	canvas = createCanvas(windowWidth / 2 - 50, 400);
	canvas.parent('canvas-parent');
	console.log(canvas);
	video = createCapture(VIDEO);
	video.hide();
}

function draw() {
	image(video, 0, 0, canvas.width, canvas.height);
	if (ready) {
		identify();
	}
}

function identify() {
	model.classify(canvas, gotResult);
}

function
	gotResult(error, results) {
	if (error) {
		console.error(error);
	}
	console.log(results[0].label);
	document.getElementById('object-name-mobilenet').innerHTML = results[0].label;
	utterThis = new SpeechSynthesisUtterance(label);
	synth.speak(utterThis);
}
