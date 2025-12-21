import { ColorPicker } from '@acrodata/color-picker';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  inject,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'gradient-colorpicker-toggle',
  standalone: true,
  imports: [],
  template: `
    <button
      type="button"
      [class.gradient-colorpicker-empty-color]="!color"
      [style.background-color]="color"
      (click)="onClick($event)"
      (dblclick)="onDblClick($event)"
    >
      toggle
    </button>
  `,
  host: {
    class: 'gradient-colorpicker-toggle',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradientColorpickerToggle implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private elementRef = inject(ElementRef);

  @Input('for') colorpicker: GradientColorpicker | null = null;

  @Input() triggerEvent: 'click' | 'dblclick' = 'click';

  @Input() overlayOrigin: CdkOverlayOrigin | ElementRef | HTMLElement = this.elementRef;

  @Input() color = '';

  ngOnInit(): void {
    if (this.colorpicker) {
      this.colorpicker.overlayOrigin = this.overlayOrigin;
    }
  }

  onClick(e: MouseEvent) {
    if (this.colorpicker && this.triggerEvent === 'click') {
      this.colorpicker.overlayOrigin = this.overlayOrigin;
      this.colorpicker.toggle();
    }
  }

  onDblClick(e: MouseEvent) {
    if (this.colorpicker && this.triggerEvent === 'dblclick') {
      this.colorpicker.overlayOrigin = this.overlayOrigin;
      this.colorpicker.toggle();
    }
  }
}

@Component({
  selector: 'gradient-colorpicker',
  standalone: true,
  imports: [FormsModule, ColorPicker, CdkConnectedOverlay],
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
  private elementRef = inject(ElementRef);

  @Input({ transform: booleanAttribute }) disabled = false;

  @Input() overlayOrigin: CdkOverlayOrigin | ElementRef | HTMLElement = this.elementRef;

  isOpen = false;

  color = '';

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    if (value) {
      this.color = value;
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

  onColorChange(color: string) {
    this.onChange(color);
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
