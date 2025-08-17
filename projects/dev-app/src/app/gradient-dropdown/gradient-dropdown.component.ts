import { GradientPicker } from '@acrodata/gradient-picker';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gradient-dropdown',
  standalone: true,
  imports: [FormsModule, GradientPicker, CdkConnectedOverlay, CdkOverlayOrigin],
  templateUrl: './gradient-dropdown.component.html',
  styleUrl: './gradient-dropdown.component.scss',
})
export class GradientDropdownComponent {
  @Input() value = '';

  isOpen = false;
}
