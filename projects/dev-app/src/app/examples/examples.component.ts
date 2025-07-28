import { GradientColorpicker, GradientStops } from '@acrodata/gradient-picker';
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
    { color: '#FF0000', offset: { value: '0', unit: '%' } },
    { color: '#00FF00', offset: { value: '50', unit: '%' } },
    { color: '#0000FF', offset: { value: '100', unit: '%' } },
  ];

  color = '#FF0000';

  hideColorInput = false;
}
