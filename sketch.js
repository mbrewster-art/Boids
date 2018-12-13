let flock = [];
let alignSlider, coheseSlider, seperateSlider;
let trunk, qt;

function setup() {
	createCanvas(windowWidth, windowHeight);
	for (let i = 0; i < 50; i++) {
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
	trunk = new Rectangle(width / 2, height / 2, width / 2, height / 2);
	qt = new QuadTree(trunk, 4);
}

function draw() {
	background(51);
	let flockSnap = flock;
	for (let i = 0; i < flock.length; i++) {
		qt.insert(flock[i]);
		flock[i].forces(flockSnap);
		flock[i].update();
		flock[i].edges();
		flock[i].display();
		noFill();
		stroke(255, 0, 0);
		ellipse(flock[i].vision.x, flock[i].vision.y, flock[i].vision.r);
	}
	//noLoop();
}