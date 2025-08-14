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
import { GradientFormGroup, GradientInputField } from './form-controls';
import { LinearGradientPicker } from './linear-gradient-picker';
import { RadialGradientPicker } from './radial-gradient-picker';
import { convertAngleToPercentage, parseGradient } from './utils';

@Component({
  selector: 'gradient-picker',
  standalone: true,
  imports: [
    FormsModule,
    LinearGradientPicker,
    RadialGradientPicker,
    ConicGradientPicker,
    GradientFormGroup,
    GradientInputField,
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

  value = '';

  types = [
    { label: 'Linear', value: 'linear' },
    { label: 'Radial', value: 'radial' },
    { label: 'Conic', value: 'conic' },
  ];

  type: 'linear' | 'radial' | 'conic' = 'linear';

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    if (!value) {
      this.type = 'linear';
    } else if (value.includes('linear')) {
      this.type = 'linear';
    } else if (value.includes('radial')) {
      this.type = 'radial';
    } else if (value.includes('conic')) {
      this.type = 'conic';
    }
    this.value = value;
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
    this.onChange(this.value);
  }

  onTypeChange() {
    const colorStr =
      convertAngleToPercentage(parseGradient(this.value)?.stops || [])
        .map(s => s.color + (s.offset ? ` ${s.offset.value}${s.offset.unit}` : ''))
        .join(', ') || 'transparent, #000000';

    if (this.type === 'linear') {
      this.value = `linear-gradient(${colorStr})`;
    } else if (this.type === 'radial') {
      this.value = `radial-gradient(${colorStr})`;
    } else if (this.type === 'conic') {
      this.value = `conic-gradient(${colorStr})`;
    }

    this.onValueChange();
  }
}
