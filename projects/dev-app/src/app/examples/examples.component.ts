import {
  ConicGradientPicker,
  GradientColorpicker,
  GradientColorpickerToggle,
  GradientPicker,
  GradientStops,
  LinearGradientPicker,
  RadialGradientPicker,
} from '@acrodata/gradient-picker';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-examples',
  standalone: true,
  imports: [
    FormsModule,
    GradientStops,
    GradientColorpicker,
    GradientColorpickerToggle,
    LinearGradientPicker,
    RadialGradientPicker,
    ConicGradientPicker,
    GradientPicker,
    CdkOverlayOrigin,
    CdkConnectedOverlay,
  ],
  templateUrl: './examples.component.html',
  styleUrl: './examples.component.scss',
})
export class ExamplesComponent {
  colorStops = [
    { color: '#FF0000', offset: { value: 0, unit: '%' } },
    { color: '#00FF00', offset: { value: 50, unit: '%' } },
    { color: '#0000FF', offset: { value: 100, unit: '%' } },
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

  radialGradients = [
    '',
    'radial-gradient(#e66465, #9198e5)',
    'radial-gradient(closest-side, #3f87a6, #ebf8e1, #f69d3c)',
    'radial-gradient(circle at 100%, #333, #333 50%, #eee 75%, #333 75%)',
    'radial-gradient(ellipse at top, #e66465, transparent)',
    'radial-gradient(ellipse 50% 50px, red, yellow 10%, #1e90ff 50%, beige)',
  ];
  radialGradient = '';

  conicGradients = [
    '',
    'conic-gradient(red, orange, yellow, green, blue)',
    'conic-gradient(from 0.25turn at 50% 30%, #f69d3c, 10deg, #3f87a6, 350deg, #ebf8e1)',
    'conic-gradient(from 3.1416rad at 10% 50%, #e66465, #9198e5)',
    'conic-gradient(red 6deg, orange 6deg 18deg, yellow 18deg 45deg, green 45deg 110deg, blue 110deg 200deg, purple 200deg)',
  ];
  conicGradient = '';

  gradients = this.linearGradients.concat(this.radialGradients, this.conicGradients);

  gradient = '';

  isOpen = false;

  theme: 'light' | 'dark' = 'light';

  onThemeChange() {
    if (this.theme === 'light') {
      document.querySelector('html')!.classList.remove('theme-dark');
    } else if (this.theme === 'dark') {
      document.querySelector('html')!.classList.add('theme-dark');
    }
  }

  onColorStopsChange(e: any) {}
}
