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
import { ConicGradientPicker } from './conic-gradient-picker';
import { GradientFormGroup, GradientRadioButton, GradientRadioGroup } from './form-controls';
import { LinearGradientPicker } from './linear-gradient-picker';
import { GradientType } from './parser';
import { RadialGradientPicker } from './radial-gradient-picker';
import { parseGradient, stringifyGradient } from './utils';

@Component({
  selector: 'gradient-picker',
  standalone: true,
  imports: [
    FormsModule,
    LinearGradientPicker,
    RadialGradientPicker,
    ConicGradientPicker,
    GradientFormGroup,
    GradientRadioGroup,
    GradientRadioButton,
  ],
  templateUrl: './gradient-picker.html',
  styleUrl: './gradient-picker.scss',
  host: {
    class: 'gradient-picker',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GradientPicker),
      multi: true,
    },
  ],
})
export class GradientPicker implements ControlValueAccessor {
  private cdr = inject(ChangeDetectorRef);

  @Input({ transform: booleanAttribute }) disabled = false;

  types = [
    { label: 'Linear', value: 'linear' },
    { label: 'Radial', value: 'radial' },
    { label: 'Conic', value: 'conic' },
  ];

  type: GradientType = 'linear';

  gradient = {
    linear: 'linear-gradient(transparent, #000000)',
    radial: 'radial-gradient(transparent, #000000)',
    conic: 'conic-gradient(transparent, #000000)',
  };

  value = this.gradient[this.type];

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    if (!value) {
      this.type = 'linear';
    } else if (value.includes('linear')) {
      this.type = 'linear';
    } else if (value.includes('radial')) {
      this.type = 'radial';
    } else if (value.includes('conic')) {
      this.type = 'conic';
    }
    if (value) {
      this.value = this.gradient[this.type] = value;
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

  onValueChange() {
    this.value = this.gradient[this.type];
    this.onChange(this.value);
  }

  onTypeChange() {
    // Preserve the color stops when switching types
    const { repeating, color, stops } = parseGradient(this.value)!;

    const result = parseGradient(this.gradient[this.type])!;
    result.repeating = repeating;
    result.color = color;
    result.stops = stops;
    this.gradient[this.type] = stringifyGradient(result);

    this.onValueChange();
  }
}
