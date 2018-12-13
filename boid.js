class Boid {

    constructor() {
        this.position = createVector(random(width), random(height));
        this.acceleration = createVector(0, 0);
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 4));
        this.maxForce = 0.2;
        this.maxSpeed = 4;
        this.r = 1;
        this.neighbours;
        this.vision;
    }

    getNeighbours() {
        this.neighbours = [];
        this.neighbours = qt.query(this.vision, this.neighbours);
        //console.log(this.neighbours);
    }

    align() {
        let total = 0;
        let steering = createVector();
        for (let agent of this.neighbours) {
            let proximity = distSqrd(this.position.x, this.position.y, agent.position.x, agent.position.y);
            if (agent != this) {
                steering.add(agent.velocity);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
            //this.acceleration.add(desired);
        }
        return steering;
    }

    cohese(pop) {
        let total = 0;
        let steering = createVector(0, 0);
        for (let agent of this.neighbours) {
            let proximity = distSqrd(this.position.x, this.position.y, agent.position.x, agent.position.y);
            if (agent != this) {
                steering.add(agent.position)
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.sub(this.position);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
            //strokeWeight(8);
            //stroke(255, 0, 0);
            //point(steering.x, steering.y);
        }
        return steering;
    }

    seperate(pop) {
        let total = 0;
        let vision = 50;
        let steering = createVector(0, 0);
        for (let agent of this.neighbours) {
            let proximity = distSqrd(this.position.x, this.position.y, agent.position.x, agent.position.y);
            if (agent != this && proximity < vision * vision) {
                let diff = p5.Vector.sub(this.position, agent.position);
                diff.div(proximity * proximity);
                steering.add(diff)
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    forces(pop) {
        this.vision = new Circle(this.position.x, this.position.y, 100);
        this.getNeighbours();
        this.acceleration.mult(0);
        let alignment = this.align();
        alignment.mult(alignSlider.value());
        let cohese = this.cohese(pop)
        cohese.mult(coheseSlider.value());
        let seperate = this.seperate(pop);
        seperate.mult(seperateSlider.value());
        this.acceleration.add(alignment);
        //this.acceleration.add(cohese);
        //this.acceleration.add(seperate);
    }

    edges() {
        if (this.position.x < 0) {
            this.position.x = width;
        } else if (this.position.x > width) {
            this.position.x = 0;
        }
        if (this.position.y < 0) {
            this.position.y = height;
        } else if (this.position.y > height) {
            this.position.y = 0;
        }
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
    }

    display() {
        let theta = this.velocity.heading() + radians(90);
        fill(127);
        stroke(200);
        push();
        translate(this.position.x, this.position.y);
        rotate(theta);
        beginShape();
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape(CLOSE);
        pop();
    }

}

function distSqrd(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    return dx * dx + dy * dy;
}