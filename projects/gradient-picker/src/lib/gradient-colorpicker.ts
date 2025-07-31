/* eslint-disable @angular-eslint/no-input-rename */
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  forwardRef,
  inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TinyColor } from '@ctrl/tinycolor';
import { ColorEvent } from 'ngx-color';
import { ColorChromeModule } from 'ngx-color/chrome';

@Directive({
  selector: '[gradientColorpickerTriggerFor]',
  standalone: true,
  host: {
    '(click)': 'onClick($event)',
    '(dblclick)': 'onDblClick($event)',
  },
})
export class GradientColorpickerTrigger {
  private elementRef = inject(ElementRef);

  @Input('gradientColorpickerTriggerFor') colorpicker: GradientColorpicker | null = null;

  @Input('gradientColorpickerTriggerOn') triggerEvent: 'click' | 'dblclick' = 'click';

  @Input('gradientColorpickerTargetAt') triggerOrigin?: CdkOverlayOrigin;

  onClick(e: MouseEvent) {
    if (!this.colorpicker) {
      return;
    }

    this.colorpicker.triggerOrigin =
      this.triggerOrigin || (this.elementRef.nativeElement as CdkOverlayOrigin);

    if (this.triggerEvent === 'click') {
      this.colorpicker.toggle();
    }
  }

  onDblClick(e: MouseEvent) {
    if (!this.colorpicker) {
      return;
    }

    this.colorpicker.triggerOrigin =
      this.triggerOrigin || (this.elementRef.nativeElement as CdkOverlayOrigin);

    if (this.triggerEvent === 'dblclick') {
      this.colorpicker.toggle();
    }
  }
}

@Component({
  selector: 'gradient-colorpicker',
  standalone: true,
  imports: [FormsModule, ColorChromeModule, CdkConnectedOverlay],
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

  @Input() triggerOrigin!: CdkOverlayOrigin;

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

  getFormat() {
    const color = new TinyColor(this.color);
    if (color.format === 'rgb' || color.format === 'hsl' || color.format === 'hsv') {
      this.format = color.format;
    } else {
      this.format = 'hex';
    }
    this.cdr.markForCheck();
  }

  open() {
    this.isOpen = true;
    this.cdr.markForCheck();
  }

  close() {
    this.isOpen = false;
    this.cdr.markForCheck();
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.cdr.markForCheck();
  }
}
