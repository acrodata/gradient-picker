import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'gradient-form-group',
  standalone: true,
  imports: [],
  templateUrl: './gradient-form-group.html',
  styleUrl: './gradient-form-group.scss',
  host: {
    class: 'gradient-form-group',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradientFormGroup {
  @Input() label = '';
}
