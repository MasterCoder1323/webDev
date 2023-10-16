// Create a Vision client.
const visionClient = new VisionClient();

// Identify the objects in the image.
async function identifyObjects() {
	const image = new VisionClient.Image({
		source: {
			imageUri: document.querySelector("id").src,
		},
	});

	const results = await visionClient.annotateImage({
		image,
		features: ['WEB_DETECTION', 'LANDMARK_DETECTION', 'TEXT_DETECTION'],
	});

	const webAnnotations = results.webDetection.webEntities;

	return webAnnotations;
}

// Display the results to the user.
async function displayResults(webAnnotations) {

	for (const annotation of webAnnotations) {
		console.log(annotation.description);
	}
}

// Identify the objects in the image when the user clicks the button.
document.querySelector('button').addEventListener('click', async () => {
	const webAnnotations = await identifyObjects();
	await displayResults(webAnnotations);
});
