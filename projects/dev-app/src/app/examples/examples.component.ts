import {
  GradientColorpicker,
  GradientColorpickerToggle,
  GradientStops,
  LinearGradientPicker,
} from '@acrodata/gradient-picker';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-examples',
  standalone: true,
  imports: [
    FormsModule,
    GradientStops,
    GradientColorpicker,
    GradientColorpickerToggle,
    LinearGradientPicker,
    MatMenuModule,
  ],
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

  linearGradients = [
    '',
    'linear-gradient(#e66465, #9198e5)',
    'linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)',
    'linear-gradient(to left, #333, #333 50%, #eee 75%, #333 75%)',
    'linear-gradient(217deg, rgba(255, 0, 0, 0.8), rgba(255, 0, 0, 0) 70.71%)',
  ];
  linearGradient = '';

  onColorStopsChange(e: any) {}
}
