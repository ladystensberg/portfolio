var init = () => {
    class Particle {
        constructor(x, y, vx, vy, radius, color) {
            this.x = x;
            this.y = y;
            this.vx = vx;
            this.vy = vy;
            this.radius = radius;
            this.color = color;
            this.life = 0;
            this.maxLife = Math.floor(Math.random() * 200);
        }
    }

    class ParticleEngine {
        constructor(canvasID) {
            this.particles = [];
            this.canvas = document.getElementById(canvasID)
            this.context = this.canvas.getContext('2d');
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.context.fillStyle = 'black';
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }

        getRandomColor(alpha) {
            let r = Math.round(Math.random() * 256);
            let g = Math.round(Math.random() * 256);
            let b = Math.round(Math.random() * 256);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`
        }

        getRandomNum(minValue, maxValue) {
            let multiplier = maxValue + Math.abs(minValue);
            return Math.round(Math.random() * multiplier - Math.abs(minValue));
        }

        addParticle(interval, particleCount) {
            setInterval(() => {
                for (let i = 0; i < particleCount; i++) {
                    let p = new Particle(this.getRandomNum(0, this.canvas.width),
                                        this.getRandomNum(0, this.canvas.height), 
                                        this.getRandomNum(-5, 5), 
                                        this.getRandomNum(-5, 5), 
                                        25, 
                                        this.getRandomColor(.3));
                    this.particles.push(p);
                    p.id = this.particles.length;
                }
            }, interval)
        }

        drawParticle(particle) {
            this.context.beginPath();
            this.context.fillStyle = particle.color;
            this.context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2, true);
            this.context.closePath();
            this.context.fill();
        }

        moveParticle(particle) {
            particle.x += particle.vx;
            particle.y += particle.vy;
        }

        removeParticle(particle) {
            let particles = this.particles;
            particles.splice(particles.indexOf(particle.id), 1);
        }

        start() {
            setInterval(() => {
                this.context.fillStyle = 'black';
                this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
                for (let particle of this.particles) {
                    particle.life++;
                    if (particle.life == particle.maxLife || particle.life == 100) {
                        this.removeParticle(particle);
                    } else {
                        this.moveParticle(particle)
                        this.drawParticle(particle)
                    }
                }
            }, 0)

        }
    }

    let engine = new ParticleEngine('particle-canvas');
    engine.addParticle(500, 2);
    engine.start()
}

document.addEventListener('DOMContentLoaded', init);