const { VisionClient } = require('@google-cloud/vision');
const p5 = require('node-p5');

const client = new VisionClient();

function setup() {
	console.log('success');
	video = createCapture(VIDEO);
}

function draw() {
	identify(video);
}
setup();

function identify(image) {
	var objects = client.detectObjects(image, (err, results) => {
		if (err) {
			console.log(err);
			return;
		}

		const objects = results[0].objectAnnotations;

		console.log(objects);
		return objects;
	});
	return objects;
}

p5.setup();
p5.draw();
