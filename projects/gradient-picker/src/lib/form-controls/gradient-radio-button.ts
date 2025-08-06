import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: '[gradientRadioButton]',
  standalone: true,
  imports: [],
  template: `
    <ng-content />
  `,
  styleUrl: './gradient-radio-button.scss',
  host: {
    class: 'gradient-radio-button',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradientRadioButton {}
