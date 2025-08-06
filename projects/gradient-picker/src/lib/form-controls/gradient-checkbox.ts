import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[gradientCheckbox]',
  standalone: true,
  imports: [],
  template: `
    <ng-content />
  `,
  styleUrl: './gradient-checkbox.scss',
  host: {
    class: 'gradient-checkbox',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradientCheckbox {}
