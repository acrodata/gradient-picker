import { GradientColorpicker, GradientStops } from '@acrodata/gradient-picker';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GradientStops, GradientColorpicker, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dev-app';

  colorStops = [
    { color: '#ff0000', offset: { value: '0', unit: '%' } },
    { color: '#00ff00', offset: { value: '80', unit: '%' } },
  ];

  color = '#ff0000';
}
