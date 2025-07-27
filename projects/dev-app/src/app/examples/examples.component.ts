import { GradientStops, GradientColorpicker } from '@acrodata/gradient-picker';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-examples',
  standalone: true,
  imports: [GradientStops, GradientColorpicker, FormsModule],
  templateUrl: './examples.component.html',
  styleUrl: './examples.component.scss',
})
export class ExamplesComponent {
  colorStops = [
    { color: '#ff0000', offset: { value: '0', unit: '%' } },
    { color: '#00ff00', offset: { value: '80', unit: '%' } },
  ];

  color = '#ff0000';
}
