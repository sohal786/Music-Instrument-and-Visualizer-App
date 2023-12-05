import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const TriangleVisualizer = new Visualizer(
	'Triangle Visualizer',
	(p5: P5, analyzer: Tone.Analyser) => {
		const width = window.innerWidth;
		const height = window.innerHeight / 2;
		const dim = Math.min(width, height);

		p5.background(0, 0, 0, 255);

		// Get frequency data from analyzer
		const values = analyzer.getValue();
		const particles = [];
		const sizeScale = 0.6;

		for (let i = 0; i < values.length; i++) {
			const amplitude = values[i] as number;
			const x = p5.random(width);
			const y = p5.random(height);
			const size = (dim / 2) * amplitude * sizeScale;

			const angle = p5.map(i, 0, values.length, 0, p5.TWO_PI);
			const r = p5.abs(p5.sin(angle) / 0.6) * 255;
			const g = p5.abs(p5.cos(angle) / 0.3) * 255;
			const b = p5.abs(p5.sin(angle + p5.PI / 5)) * 255;

			const fillColor = p5.color(r, g, b);
			particles.push({ x, y, size, color: fillColor });
		}

		// Draw particles as triangles
		for (let i = 0; i < particles.length; i++) {
			const particle = particles[i];
			p5.noStroke();
			p5.fill(particle.color);
			const x1 = particle.x + particle.size * p5.cos(p5.TWO_PI / 3);
			const y1 = particle.y + particle.size * p5.sin(p5.TWO_PI / 3);
			const x2 = particle.x + particle.size * p5.cos((p5.TWO_PI / 3) * 2);
			const y2 = particle.y + particle.size * p5.sin((p5.TWO_PI / 3) * 2);
			const x3 = particle.x + particle.size * p5.cos(p5.TWO_PI);
			const y3 = particle.y + particle.size * p5.sin(p5.TWO_PI);
			p5.triangle(x1, y1, x2, y2, x3, y3);
		}
	}
);
