import P5 from 'p5';
import * as Tone from 'tone';
import { Visualizer } from '../Visualizers';

export const EllipticalVisualizer = new Visualizer(
  'Elliptical',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(50); // Darker background
    p5.strokeWeight(dim * 0.005);
    p5.stroke(255, 204, 0); // Yellow color
    p5.noFill();

    const values = analyzer.getValue();
    p5.beginShape();
    for (let i = 0; i < values.length; i++) {
      // Check if value is a number or an array, and handle accordingly
      const amplitude = Array.isArray(values[i]) ? 0 : values[i] as number;
      const angle = p5.map(i, 0, values.length, 0, 2 * p5.PI);
      const radius = dim / 2 * (1 + amplitude);

      const x = width / 2 + radius * p5.cos(angle);
      const y = height / 2 + radius * p5.sin(angle);

      if (i > 0) {
        const prevAmplitude = Array.isArray(values[i - 1]) ? 0 : values[i - 1] as number;
        const prevRadius = dim / 2 * (1 + prevAmplitude);
        const prevX = width / 2 + prevRadius * p5.cos(angle - 2 * p5.PI / values.length);
        const prevY = height / 2 + prevRadius * p5.sin(angle - 2 * p5.PI / values.length);

        p5.line(prevX, prevY, x, y);
      }
    }
    p5.endShape();
  },
);
