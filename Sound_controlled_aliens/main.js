function setup() {
	navigator.mediaDevices.getUserMedia({ audio: true });
	classifier = ml5.soundClassifier('https://teachablemachine.withgoogle.com/models/reeqLyN9K/model.json', loaded);
}
function loaded() {
	console.log('Model loaded');
	console.log(classifier);
}
function start() {
	classifier.classify(gotResults);
}
function gotResults(error, results) {
	if (error) {
		console.error('Something went Wrong');
		console.error(error);
	} else {
		console.log("Results: ")
		console.log(results);
		random_number_r = Math.floor(Math.random() * 255) + 1;
		random_number_g = Math.floor(Math.random() * 255) + 1;
		random_number_b = Math.floor(Math.random() * 255) + 1;

		document.getElementById("label").innerHTML = 'I can hear - ' + results[0].label;
		document.getElementById("confidence").innerHTML = 'Accuracy - ' + (results[0].confidence * 100).toFixed(2) + " %";
		document.getElementById("label").style.color = "rgb(" + random_number_r + "," + random_number_g + "," + random_number_r + ")";
		document.getElementById("confidence").style.color = "rgb(" + random_number_r + "," + random_number_g + "," + random_number_r + ")";

		img = document.getElementById('alien-1');
		img1 = document.getElementById('alien-2');
		img2 = document.getElementById('alien-3');
		img3 = document.getElementById('alien-4');

		if (results[0].label == "Cat") {
			img.src = 'aliens-01.gif';
			img1.src = 'aliens-02.png';
			img2.src = 'aliens-03.png';
			img3.src = 'aliens-04.png';
		} else if (results[0].label == "Dog") {
			img.src = 'aliens-01.png';
			img1.src = 'aliens-02.gif';
			img2.src = 'aliens-03.png';
			img3.src = 'aliens-04.png';
		} else if (results[0].label == "Owl") {
			img.src = 'aliens-01.png';
			img1.src = 'aliens-02.png';
			img2.src = 'aliens-03.gif';
			img3.src = 'aliens-04.png';
		} else {
			img.src = 'aliens-01.png';
			img1.src = 'aliens-02.png';
			img2.src = 'aliens-03.png';
			img3.src = 'aliens-04.gif';
		}
	}
}