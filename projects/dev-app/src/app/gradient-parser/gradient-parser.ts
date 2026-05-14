import { parseGradient } from '@acrodata/gradient-parser';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gradient-parser',
  imports: [FormsModule],
  templateUrl: './gradient-parser.html',
  styleUrl: './gradient-parser.scss',
})
export class GradientParser {
  private gradients = [
    `linear-gradient(90deg, red 0%, green 50%, blue 100%)`,
    `radial-gradient(circle at center, red 0%, green 50%, blue 100%)`,
    `conic-gradient(red 0deg, green 120deg, blue 240deg)`,
  ];

  gradientData = signal(
    this.gradients.map(g => {
      const gradient = signal(g);
      return {
        input: gradient,
        result: computed(() => JSON.stringify(parseGradient(gradient()), null, 2)),
      };
    })
  );
}
