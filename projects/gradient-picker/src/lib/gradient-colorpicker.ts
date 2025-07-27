import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TinyColor } from '@ctrl/tinycolor';
import { ColorEvent } from 'ngx-color';
import { ColorChromeModule } from 'ngx-color/chrome';

@Component({
  selector: 'gradient-colorpicker',
  standalone: true,
  imports: [FormsModule, ColorChromeModule, CdkConnectedOverlay, CdkOverlayOrigin],
  templateUrl: './gradient-colorpicker.html',
  styleUrl: './gradient-colorpicker.scss',
  host: {
    class: 'gradient-colorpicker',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GradientColorpicker),
      multi: true,
    },
  ],
})
export class GradientColorpicker implements ControlValueAccessor {
  private cdr = inject(ChangeDetectorRef);

  @Input({ transform: booleanAttribute }) disabled = false;

  isOpen = false;

  color = '';

  format: 'hex' | 'rgb' | 'hsl' | 'hsv' = 'hex';

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    if (value) {
      this.color = value;
      this.getFormat();
    }
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  onColorChange(e: ColorEvent) {
    this.color = {
      hex: e.color.rgb.a === 1 ? e.color.hex : new TinyColor(e.color.rgb).toHex8String(),
      rgb: new TinyColor(e.color.rgb).toRgbString(),
      hsl: new TinyColor(e.color.hsl).toHslString(),
      hsv: new TinyColor(e.color.hsv).toHsvString(),
    }[this.format];
    this.cdr.markForCheck();
    this.onChange(this.color);
  }

  onColorInput() {
    this.onChange(this.color);
    this.getFormat();
  }

  getFormat() {
    const color = new TinyColor(this.color);
    if (color.format === 'rgb' || color.format === 'hsl' || color.format === 'hsv') {
      this.format = color.format;
    } else {
      this.format = 'hex';
    }
    this.cdr.markForCheck();
  }
}
