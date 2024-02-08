let player, computer, wall1, wall2, ball, line, poseNet;
let playerPoints = 0;
let computerPoints = 0;
let dificulty = 0.05;
function setup() {
	canvas = createCanvas(700, 600);
	canvas.parent('canvas');
	//Ball
	ball = new createSprite(350, 300, 50, 'dynamic');
	ball.color = 'white';
	ball.bounciness = 1;
	ball.direction = random(360);
	ball.speed = 3;
	//Walls
	wall1 = new Sprite([[0, 600], [700, 600]], 's');
	wall2 = new Sprite([[0, 0], [700, 0]], 's');
	//Line
	line = new Sprite([[350, 0], [350, 600]]);
	line.overlaps(allSprites);
	line.color = 'orange';
	//Computer
	computer = new Sprite(695, 300, 5, 100, 'k');
	computer.color = 'red';
	computer.bounciness = 1;
	//Player
	player = new Sprite(5, 300, 5, 100, 'k');
	player.color = 'red';
	player.bounciness = 1.5;
	video = createCapture(VIDEO);
	video.size(800, 400);
	video.parent("game_console");
}

function draw() {
	background(0);
	computer.moveTowards(695, ball.y, dificulty);
	fill(255);
	textSize(24);
	text('You: ' + playerPoints, 50, 30);
	text('Computer: ' + computerPoints, 50, 50);
	if (document.getElementById('arrow-key').checked) {
		poseNet = false;
		player.y = mouse.y;
	} else {
		if (!poseNet) {
			poseNet = ml5.poseNet(video, modelLoaded);
		}
		poseNet.on("pose", gotPoses);
	}
	if (ball.x < 0) {
		ball.x = 350;
		ball.y = 300;
		ball.direction = random(140, 220);
		ball.speed = 3;
		computerPoints++;
		console.log('You:' + playerPoints, 'Computer:' + computerPoints);
	} else if (ball.x > 700) {
		ball.x = 350;
		ball.y = 300;
		ball.direction = random(140, 220);
		ball.speed = 3;
		playerPoints++;
		console.log('You:' + playerPoints, 'Computer:' + computerPoints);
	}
	if (ball.speed > 30) {
		ball.speed = 30;
	}
	if (ball.velocity.x < 2 && ball.velocity.x > -2) {
		if (ball.velocity.x >= 0) {
			ball.velocity.x = 2;
		} else {
			ball.velocity.x = -2
		}
	}
}
function gotPoses(results, error) {
	if (error) {
		console.log(error);
	}
	console.log(results);
	player.y = results[0].pose.rightWrist.y;
}

function modelLoaded() {
	console.log(poseNet);
}