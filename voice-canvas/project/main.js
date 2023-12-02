var x = 0;
var y = 0;

var screen = {
	width: 0,
	height: 0
}

var apple, speakData, toNumber;

drawApple = false;

var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function preload() {
	apple = loadImage("apple.png");
}

function start() {
	var status = document.getElementById("status");
	status.innerHTML = "System is listening please speak";
	alert(status.innerHTML);
	recognition.start();
}

recognition.onresult = function (event) {

	var status = document.getElementById("status");

	console.log(event);

	content = event.results[0][0].transcript;

	status.innerHTML = "The speech has been recognized: " + content;

	toNumber = Number(content);
	if (Number.isInteger(toNumber)) {
		status.innerHTML = "Started drawing apple";
		alert("Started drawing apple");
		drawApple = true;
	} else {
		status.innerHTML = "The speech has not recognized a number"
		alert("The speech has not recognized a number");
	}

}

function setup() {
	screen.width = window.innerWidth;
	screen.height = window.innerHeight;
	canvas = createCanvas(screen.width, screen.height - 150);
	canvas.position(0, 150);
}

function draw() {
	if (drawApple) {
		background(255, 192, 203);
		document.getElementById("status").innerHTML = toNumber + " Apples drawn";
		drawApple = false;
		h = 10
		i1 = 0
		for (let i = 1; i < toNumber + 1; i++) {
			image(apple, (i - i1) * 50, h, 40, 40);
			if ((i - i1) * 50 + 100 > screen.width) {
				h = h + 50;
				i1 = Math.floor(((screen.width / 50) - 1) * ((h - 10) / 50));
			}
			if (h > screen.height) {
				alert("TOO MANY APPLES!!!!!!!!!");
				i = toNumber;
			}
		}
	}
}

function speak() {
	var synth = window.speechSynthesis;

	var utterThis = new SpeechSynthesisUtterance(speak_data);

	synth.speak(utterThis);

	speak_data = "";
}
