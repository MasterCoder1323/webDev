const { VisionClient } = require('@google-cloud/vision');
const p5 = require('node-p5');

const client = new VisionClient();

function setup() {
	console.log('success');
}

function draw() {
	identify("../../../Sound_controlled_aliens/aliens-01.png");
}

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
