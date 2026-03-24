import { GradientType } from '@acrodata/gradient-parser';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ConicGradientPicker } from './conic-gradient-picker';
import { GradientFormGroup, GradientRadioButton, GradientRadioGroup } from './form-controls';
import { LinearGradientPicker } from './linear-gradient-picker';
import { RadialGradientPicker } from './radial-gradient-picker';
import { parseGradient, stringifyGradient } from './utils';

@Component({
  selector: 'gradient-picker',
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

  @Input()
  get value() {
    return this._value;
  }
  set value(newVal: string) {
    if (newVal !== this._value) {
      if (!newVal) {
        this.type = 'linear';
      } else if (newVal.includes('linear')) {
        this.type = 'linear';
      } else if (newVal.includes('radial')) {
        this.type = 'radial';
      } else if (newVal.includes('conic')) {
        this.type = 'conic';
      }
      this._value = this.gradient[this.type] = newVal || 'linear-gradient(transparent, #000000)';
      this.cdr.markForCheck();
    }
  }
  private _value = this.gradient[this.type];

  @Output() valueChange = new EventEmitter<string>();

  @Input({ transform: booleanAttribute }) disabled = false;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.value = value;
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
    this._value = this.gradient[this.type];
    this.valueChange.emit(this._value);
    this.onChange(this._value);
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
