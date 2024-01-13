var speechRecognition = window.webkitSpeechRecognition;
var recognition = new speechRecognition();
var camera = document.getElementById('camera');

Webcam.set({
    width: 360,
    height: 250,
    image_format: 'png',
    png_quality: 90
});

function startSelfies() {
    recognition.start();
    Webcam.attach(camera);
}

function speak(text, rate = 2) {
    let synth = window.speechSynthesis;

    if (synth.speaking) {
        synth.cancel();
    }
    let speech_data = new SpeechSynthesisUtterance(text);
    speech_data.rate = rate;
    synth.speak(speech_data);
}

function take_selfie(id, id1) {
    Webcam.snap(function(data_uri) {
        document.getElementById(id).innerHTML = '<img id="' + id1 + '" src="' + data_uri + '"/>';
    });
    save();
}

function save() {
    let link1 = document.getElementById('download1');
    let link2 = document.getElementById('download2');
    let link3 = document.getElementById('download3');
    let image1 = document.getElementById('image1').src;
    let image2 = document.getElementById('image2').src;
    let image3 = document.getElementById('image3').src;
    link1.href = image1;
    link2.href = image2;
    link3.href = image3;
}

recognition.onresult = function(event) {
    let output = event.results[0][0].transcript;
    console.log(output);
    if (output == 'selfie') {
        speak('Taking Selfies');

        setTimeout(() => {
            speak('First Selfie');
            take_selfie('result1', 'image1');
        }, 5000);
        setTimeout(() => {
            speak('Second Selfie');
            take_selfie('result2', 'image2');
        }, 10000);
        setTimeout(() => {
            speak('Third Selfie');
            take_selfie('result3', 'image3');
            save();
        }, 15000);
    }
}