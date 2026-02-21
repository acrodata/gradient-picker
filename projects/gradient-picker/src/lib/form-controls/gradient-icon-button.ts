import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'gradient-icon-button',
  imports: [],
  template: `
    <ng-content />
  `,
  styleUrl: './gradient-icon-button.scss',
  host: {
    class: 'gradient-icon-button',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradientIconButton {}
