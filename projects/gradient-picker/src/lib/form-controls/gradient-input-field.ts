import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'gradient-input-field',
  standalone: true,
  imports: [],
  templateUrl: './gradient-input-field.html',
  styleUrl: './gradient-input-field.scss',
  host: {
    class: 'gradient-input-field',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradientInputField {}
