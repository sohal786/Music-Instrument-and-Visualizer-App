// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const multipleVisualizer = new Visualizer(
  'Multiple',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(0, 0, 0, 255);

    const barWidth = width / 6; // Divide the canvas width into 5 bars
    const barSpacing = barWidth / 35; // Add some spacing between the bars

    p5.strokeWeight(barWidth * 0.3); // Adjust the stroke weight based on bar width
    p5.stroke(255, 255, 255, 255);
    p5.noFill();

    // Ensure that values is explicitly of type Float32Array
    const values: Float32Array = analyzer.getValue() as Float32Array;

    for (let i = 0; i < 5; i++) {
      // Calculate the start and end indices for each bar
      const startIndex = Math.floor((i / 10) * values.length);
      const endIndex = Math.floor(((i + 1) / 10) * values.length);

      // Calculate the x-coordinate for the center of the bar
      const x = i * (barWidth + barSpacing) + barWidth / 2;

      // Calculate the average amplitude within the bar range
      const averageAmplitude: number =
        Array.from(values.slice(startIndex, endIndex)).reduce((acc, val) => acc + val, 0) /
        (endIndex - startIndex);

      // Calculate the bar height based on the average amplitude
      const barHeight: number = height * 0.5 * averageAmplitude;

      // Draw a vertical line (bar) at the calculated position
      p5.line(x, height / 2, x, height / 2 - barHeight);
    }
  },
);
