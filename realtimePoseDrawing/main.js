function setup() {
	canvas = createCanvas(550, 550);
	canvas.id = "main-canvas";
	canvas.parent("canvas-holder");
	videoHolder = createCanvas(550, 500);
	videoHolder.parent("video-holder");
	video = createCapture(VIDEO);
	video.hide();
}
function draw() {
	image(video, 0, 0, 550, 500);

}