import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  inject,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LinearResult, parseLinearGradient } from 'css-gradient-parser';
import { GradientInputField } from './gradient-input-field';
import { GradientStops } from './gradient-stops';

@Component({
  selector: 'linear-gradient-picker',
  standalone: true,
  imports: [GradientStops, GradientInputField],
  templateUrl: './linear-gradient-picker.html',
  styleUrl: './linear-gradient-picker.scss',
  host: {
    class: 'linear-gradient-picker',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LinearGradientPicker),
      multi: true,
    },
  ],
})
export class LinearGradientPicker implements OnInit, ControlValueAccessor {
  private cdr = inject(ChangeDetectorRef);

  @Input({ transform: booleanAttribute }) disabled = false;

  linearGradient: LinearResult = {
    orientation: {
      type: 'angular',
      value: { value: '', unit: '' },
    },
    repeating: false,
    stops: [{ color: '#000' }],
  };

  value = '';

  ngOnInit(): void {}

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    if (value) {
      this.linearGradient = parseLinearGradient(value);
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

  onGradientChange() {
    this.onChange(this.value);
  }
}
