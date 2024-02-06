let player, computer, wall1, wall2, ball, line;
function setup() {
	canvas = createCanvas(700, 600);
	canvas.parent('canvas');
	//Ball
	ball = new createSprite(350, 300, 50, 'dynamic');
	ball.color = 'white';
	ball.bounciness = 1;
	ball.direction = random(140, 220);
	ball.speed = 3;
	ball.maxSpeed = 10;
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
}

function draw() {
	background(0);
	computer.y = ball.y;
	player.y = mouse.y;
}