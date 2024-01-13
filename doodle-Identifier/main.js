
function setup() {
	canvas = createCanvas(280, 280);
	background("white");
	canvas.mouseReleased(classifyCanvas);
	synth = window.speechSynthesis;
}
function preload() {
	classifier = ml5.imageClassifier("DoodleNet");
}
function clearCanvas() {
	background("white");
}
function draw() {
	//Center Canvas 
	var x = (windowWidth - width) / 2;
	canvas.position(x);
	// Set strokeweight to 13 
	strokeWeight(13);
	// Set stroke color to black
	stroke(0);
	// If mouse is pressed, draw line between previous and current mouse positions 
	if (mouseIsPressed) {
		line(pmouseX,
			pmouseY, mouseX, mouseY);
	}
}
function classifyCanvas() {
	classifier.classify(canvas, gotResult);
}
function
	gotResult(error, results) {
	if (error) {
		console.error(error);
	}
	console.log(results); let label = results[0].label.replace("_", " ");
	document.getElementById('label').innerHTML = 'Label: ' + label;
	document.getElementById('confidence').innerHTML = 'Confidence: ' + Math.round(results[0].confidence * 100) + '%';
	utterThis = new SpeechSynthesisUtterance(label);
	synth.speak(utterThis);
}
