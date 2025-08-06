import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'gradient-input-field',
  standalone: true,
  imports: [],
  template: `
    <ng-content />
  `,
  styleUrl: './gradient-input-field.scss',
  host: {
    class: 'gradient-input-field',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradientInputField {}
