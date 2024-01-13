//Webcam Settings
Webcam.set({
	width: 350,
	height: 300,
	image_format: 'png',
	png_quality: 90
});
Webcam.attach('#camera');

function cheese() {
	Webcam.snap(function (data_uri) {
		document.getElementById("result").innerHTML = '<img id="captured-image" src="' + data_uri + '"/>';
	});
}

//ML5 Classifier
console.log('ML5.js Version: ' + ml5.version);
var classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/ZfqjATARH/model.json', modelLoaded);

function modelLoaded() {
	let img = document.createElement('img');
	img.src = 'test.jpg';
	img.width = 150;
	img.height = 100;
	console.log('Model Loaded!');
	console.log("Model: ", classifier);
	console.log('Testing Model');
	classifier.classify(img, testResult);
}

function testResult(error, results) {
	if (error) {
		console.error('Error: ', error);
		document.getElementById('checker').disabled = true;
		document.getElementById('checker').innerHTML = "SOMETHING WENT WRONG, PLEASE RELOAD";
	} else {
		console.log("Success");
		console.log("Results: ", results);
		document.getElementById('checker').disabled = false;
	}
}

//Speach Synthesis
function speak(text) {
	var synth = window.speechSynthesis;
	var utterThis = new SpeechSynthesisUtterance(text);
	synth.speak(utterThis);
}

//Classifiing
function check() {
	img = document.getElementById('captured-image');
	classifier.classify(img, gotResult);
}


function gotResult(error, results) {
	if (error) {
		console.error(error);
	} else {
		console.log(results);
		document.getElementById("emotion-name-1").innerHTML = results[0].label;
		document.getElementById("emotion-name-2").innerHTML = results[1].label;
		prediction_1 = results[0].label;
		prediction_2 = results[1].label;
		speak("I think you are " + prediction_1 + ", but you may be " + prediction_2);
		if (results[0].label == "happy") {
			document.getElementById("update-emoji").innerHTML = "&#128522;";
		}
		if (results[0].label == "sad") {
			document.getElementById("update-emoji").innerHTML = "&#128532;";
		}
		if (results[0].label == "angry") {
			document.getElementById("update-emoji").innerHTML = "&#128548;";
		}

		if (results[1].label == "happy") {
			document.getElementById("update-emoji-2").innerHTML = "&#128522;";
		}
		if (results[1].label == "sad") {
			document.getElementById("update-emoji-2").innerHTML = "&#128532;";
		}
		if (results[1].label == "angry") {
			document.getElementById("update-emoji-2").innerHTML = "&#128548;";
		}
	}
}

