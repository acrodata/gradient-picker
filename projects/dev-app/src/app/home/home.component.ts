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
    'linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)',
    'linear-gradient(0.5turn, #4285f4, #34a853, #fbbc05, #ea4335)',
    'linear-gradient(45deg, #5fc9f8, #fecb2e, #fd9426, #fc3158, #147efb, #53d769)',
  ];
}
