import { GradientPicker } from '@acrodata/gradient-picker';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GradientDropdownComponent } from '../gradient-dropdown/gradient-dropdown.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, GradientPicker, GradientDropdownComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  gradient = 'linear-gradient(to right, #03001e, #7303c0, #ec38bc, #fdeff9)';

  gradients = [
    'linear-gradient(#e66465, #9198e5)',
    'linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)',
    'linear-gradient(to left, #333, #333 50%, #eee 75%, #333 75%)',
    'linear-gradient(217deg, rgba(255, 0, 0, 0.8), rgba(255, 0, 0, 0) 70.71%)',
    'radial-gradient(#e66465, #9198e5)',
    'radial-gradient(closest-side, #3f87a6, #ebf8e1, #f69d3c)',
    'radial-gradient(circle at 100%, #333, #333 50%, #eee 75%, #333 75%)',
    'radial-gradient(ellipse at top, #e66465, transparent)',
    'radial-gradient(ellipse 50% 50px, red, yellow 10%, #1e90ff 50%, beige)',
    'conic-gradient(red, orange, yellow, green, blue)',
    'conic-gradient(from 0.25turn at 50% 30%, #f69d3c, 10deg, #3f87a6, 350deg, #ebf8e1)',
    'conic-gradient(from 3.1416rad at 10% 50%, #e66465, #9198e5)',
    'conic-gradient(red 6deg, orange 6deg 18deg, yellow 18deg 45deg, green 45deg 110deg, blue 110deg 200deg, purple 200deg)',
  ];
}
