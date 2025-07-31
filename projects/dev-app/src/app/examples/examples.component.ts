import {
  GradientColorpicker,
  GradientColorpickerToggle,
  GradientStops,
} from '@acrodata/gradient-picker';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
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
    CdkOverlayOrigin,
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
}
