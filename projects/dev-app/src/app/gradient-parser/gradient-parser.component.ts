import { parseGradient } from '@acrodata/gradient-parser';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gradient-parser',
  imports: [FormsModule],
  templateUrl: './gradient-parser.component.html',
  styleUrl: './gradient-parser.component.scss',
})
export class GradientParserComponent implements OnInit {
  gradients = [
    {
      input: `linear-gradient(90deg, red 0%, green 50%, blue 100%)`,
      result: '',
    },
    {
      input: `radial-gradient(circle at center, red 0%, green 50%, blue 100%)`,
      result: '',
    },
    {
      input: `conic-gradient(red 0deg, green 120deg, blue 240deg)`,
      result: '',
    },
  ];

  onGradientChange(gradient: { input: string; result: string }) {
    const parsedResult = parseGradient(gradient.input);
    gradient.result = JSON.stringify(parsedResult, null, 2);
    // Log the parsed gradient object
    console.log(parsedResult);
  }

  ngOnInit(): void {
    this.gradients.forEach(g => this.onGradientChange(g));
  }
}
