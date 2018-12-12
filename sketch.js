let flock = [];
let alignSlider, coheseSlider, seperateSlider;

function setup() {
	createCanvas(windowWidth, windowHeight);
	for (let i = 0; i < 200; i++) {
		flock.push(new Boid());
	}
	alignSlider = createSlider(0, 2, 1, 0.1);
	alignSlider.position(5, 50);
	alignSlider.style('opacity', '0.3');
	coheseSlider = createSlider(0, 2, 1, 0.1);
	coheseSlider.position(5, 100);
	coheseSlider.style('opacity', '0.3');
	seperateSlider = createSlider(0, 2, 1.3, 0.1);
	seperateSlider.position(5, 150);
	seperateSlider.style('opacity', '0.3');
	createP('Alignment').position(10, 10);
	createP('Cohese').position(10, 70);
	createP('Seperate').position(10, 120);
}

function draw() {
	background(51);
	let neighbours = flock;
	for (let i = 0; i < neighbours.length; i++) {
		flock[i].forces(neighbours);
		flock[i].update();
		flock[i].edges();
		flock[i].display();
	}
}

function distSqrd(x1, y1, x2, y2) {
	var dx = x2 - x1;
	var dy = y2 - y1;
	return dx * dx + dy * dy;
}