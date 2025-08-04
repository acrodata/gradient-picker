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
import { GradientFormGroup, GradientUnitInput } from './form-controls';
import { GradientInputField } from './form-controls/gradient-input-field';
import { GradientStops } from './gradient-stops';
import { ConicGradientResult, parseConicGradient, stringifyConicGradient } from './parser';
import { angelUnits } from './utils';

@Component({
  selector: 'conic-gradient-picker',
  standalone: true,
  imports: [FormsModule, GradientStops, GradientInputField, GradientFormGroup, GradientUnitInput],
  templateUrl: './conic-gradient-picker.html',
  styleUrl: './conic-gradient-picker.scss',
  host: {
    class: 'conic-gradient-picker',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ConicGradientPicker),
      multi: true,
    },
  ],
})
export class ConicGradientPicker implements ControlValueAccessor {
  private cdr = inject(ChangeDetectorRef);

  @Input({ transform: booleanAttribute }) disabled = false;

  conicGradient: ConicGradientResult = {
    angle: '',
    position: '',
    repeating: false,
    stops: [{ color: '#000000' }],
  };

  value = '';

  angelUnits = angelUnits;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value || 'conic-gradient(transparent, #000000)';
    this.conicGradient = parseConicGradient(this.value);
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
    this.value = stringifyConicGradient(this.conicGradient);
    this.onChange(this.value);
  }
}
