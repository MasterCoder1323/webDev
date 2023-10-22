const model = ml5.imageClassifier('MobileNet', modelLoaded);
var ready = false;

const client = new ImageAnnotatorClient({
	keyFilename: 'keys/serviceAccountKey.json', // Replace with your actual key file path
});

var objects, img;

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

video.on('data', (data) => {
	img = data;
});

function draw() {
	image(video, 0, 0, canvas.width, canvas.height);
	if (ready) {
		identify();
		vision(img);
	}
}

function identify() {
	model.classify(canvas, gotResult);
}

function gotResult(error, results) {
	if (error) {
		console.error(error);
	}
	console.log(results[0].label);
	document.getElementById('object-name-mobilenet').innerHTML = results[0].label;
}

async function vision(image) {
	const [result] = await client.labelDetection(image);
	const labels = result.labelAnnotations;
	console.log('Labels:');
	labels.forEach(label => {
		console.log(label.description);
	});
	document.getElementById("object-name-google").innerHTML = labels[0];
}
