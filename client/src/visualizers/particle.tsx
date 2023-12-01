import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const ParticleSystemVisualizer = new Visualizer(
  'ParticleSystem',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;

    p5.background(0, 0, 0, 255);

    const values = analyzer.getValue();

    // Initialize particles as an empty array
    const particles: Particle[] = [];

    // Update and display each particle
    values.forEach((amplitude, index) => {
      if (particles.length <= index) {
        particles.push(new Particle(p5, index, width, height));
      }
      particles[index].update(amplitude as number);
      particles[index].display();
    });
  },
);

class Particle {
  p5: P5;
  x: number;
  y: number;
  size: number;
  color: any; // Replace 'any' with a more specific type if available
  history: any[]; // Store particle positions for creating trails

  constructor(p5: P5, index: number, width: number, height: number) {
    this.p5 = p5;
    this.x = width / 2;
    this.y = height / 2;
    this.size = 20; // Initial size (increased from 10)
    this.color = p5.color(255);
    this.history = [];
  }

  update(amplitude: number) {
    this.size = amplitude * 200; // Adjust the factor as needed (increased from 100)
    this.color = this.p5.color(255, 255 - amplitude * 255, amplitude * 255);

    this.history.push(this.p5.createVector(this.x, this.y));

    if (this.history.length > 50) {
      this.history.splice(0, 1);
    }
  }

  display() {
    for (let i = 0; i < this.history.length; i++) {
      const pos = this.history[i];
      const alpha = this.p5.map(i, 0, this.history.length, 100, 0);
      this.p5.fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], alpha);
      this.p5.ellipse(pos.x, pos.y, this.size, this.size);
    }
  }
}
