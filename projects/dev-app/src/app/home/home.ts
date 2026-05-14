import { GradientPicker } from '@acrodata/gradient-picker';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GradientDropdown } from '../gradient-dropdown/gradient-dropdown';
import { GradientInput } from '../gradient-input/gradient-input';

@Component({
  selector: 'app-home',
  imports: [FormsModule, GradientPicker, GradientDropdown, GradientInput],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  gradient = signal('linear-gradient(to right, #03001e, #7303c0, #ec38bc, #fdeff9)');

  gradients = [
    'linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)',
    'linear-gradient(0.5turn, #4285f4, #34a853, #fbbc05, #ea4335)',
    'linear-gradient(45deg, #5fc9f8, #fecb2e, #fd9426, #fc3158, #147efb, #53d769)',
  ];
}
