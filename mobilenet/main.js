const model = ml5.imageClassifier('MobileNet', modelLoaded);
var ready = false;

function modelLoaded() {
	console.log("Model Loaded", model);
	ready = true;
}

function setup() {
	canvas = createCanvas(300, 300);
	canvas.parent("canvas-parent");
	video = createCapture(VIDEO);
	video.hide();
}

function draw() {
	image(video, 0, 0, 300, 300);
	if (ready) {
		identify();
	}
}

function identify() {

}