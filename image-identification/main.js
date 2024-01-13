var camera = document.getElementById('camera');

//ML5
console.log('ML5 Version: ', ml5.version);
const model = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/xyMArcjO9/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
    console.log('Model:  ', model);
}

async function classifyImage(image) {
    console.log(model);
    let result = await model.classify(image, (error, results) => {
        if (error) {
            console.error(error);
        } else {
            console.log(results);
            return results;
        }
    });
    console.log(result);
    result = result[0];
    console.log(result);
    return result;
}

//Webcam
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

Webcam.attach(camera);

function getUri() {
    let return1;
    Webcam.snap(function(data_uri) {
        return1 = data_uri;
    })
    return return1;
}

//Functions

function takeSnapshot() {
    document.getElementById('result').innerHTML = '<img id="image" src="' + getUri() + '">';
}

async function identify() {
    let img = document.getElementById('image');
    let result = await classifyImage(img)
    document.getElementById('object').innerHTML = result.label;
    document.getElementById('accuracy').innerHTML = (result.confidence * 100) + '%';
}