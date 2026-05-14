import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GradientDropdown } from '../gradient-dropdown/gradient-dropdown';

@Component({
  selector: 'app-gradient-input',
  imports: [FormsModule, GradientDropdown],
  templateUrl: './gradient-input.html',
  styleUrl: './gradient-input.scss',
})
export class GradientInput {
  @Input() value = '';
}
