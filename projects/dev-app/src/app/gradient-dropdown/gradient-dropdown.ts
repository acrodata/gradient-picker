import { GradientPicker } from '@acrodata/gradient-picker';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gradient-dropdown',
  imports: [FormsModule, GradientPicker, CdkConnectedOverlay, CdkOverlayOrigin],
  templateUrl: './gradient-dropdown.html',
  styleUrl: './gradient-dropdown.scss',
})
export class GradientDropdown {
  @Input() value = '';

  @Output() valueChange = new EventEmitter<string>();

  isOpen = false;

  onValueChange() {
    this.valueChange.emit(this.value);
  }
}
