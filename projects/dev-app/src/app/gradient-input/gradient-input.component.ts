import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GradientDropdownComponent } from '../gradient-dropdown/gradient-dropdown.component';

@Component({
  selector: 'app-gradient-input',
  standalone: true,
  imports: [FormsModule, GradientDropdownComponent],
  templateUrl: './gradient-input.component.html',
  styleUrl: './gradient-input.component.scss',
})
export class GradientInputComponent {
  @Input() value = '';
}
