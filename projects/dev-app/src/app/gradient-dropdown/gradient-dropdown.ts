import { GradientPicker } from '@acrodata/gradient-picker';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Component, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gradient-dropdown',
  imports: [FormsModule, GradientPicker, CdkConnectedOverlay, CdkOverlayOrigin],
  templateUrl: './gradient-dropdown.html',
  styleUrl: './gradient-dropdown.scss',
})
export class GradientDropdown {
  readonly value = model('');

  isOpen = signal(false);

  toggleMenu() {
    this.isOpen.update(v => !v);
  }

  closeMenu() {
    this.isOpen.set(false);
  }
}
