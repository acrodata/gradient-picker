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
import {
  GradientCheckbox,
  GradientFormGroup,
  GradientIconButton,
  GradientInputField,
  GradientRadioButton,
  GradientUnitInput,
} from './form-controls';
import { GradientStops } from './gradient-stops';
import { parseRadialGradient, RadialGradientResult, stringifyRadialGradient } from './parser';
import { lengthUnits, reverseColorStops } from './utils';

@Component({
  selector: 'radial-gradient-picker',
  standalone: true,
  imports: [
    FormsModule,
    GradientStops,
    GradientInputField,
    GradientFormGroup,
    GradientUnitInput,
    GradientCheckbox,
    GradientRadioButton,
    GradientIconButton,
  ],
  templateUrl: './radial-gradient-picker.html',
  styleUrl: './radial-gradient-picker.scss',
  host: {
    class: 'radial-gradient-picker',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadialGradientPicker),
      multi: true,
    },
  ],
})
export class RadialGradientPicker implements ControlValueAccessor {
  private cdr = inject(ChangeDetectorRef);

  @Input({ transform: booleanAttribute }) disabled = false;

  radialGradient: RadialGradientResult = {
    shape: 'ellipse',
    size: [],
    position: {
      x: { type: 'keyword', value: '' },
      y: { type: 'keyword', value: '' },
    },
    repeating: false,
    stops: [{ color: '#000000' }],
  };

  value = '';

  lengthUnits = lengthUnits;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value || 'radial-gradient(transparent, #000000)';
    this.radialGradient = parseRadialGradient(this.value);
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
    this.value = stringifyRadialGradient(this.radialGradient);
    this.onChange(this.value);
  }

  reverseStops() {
    this.radialGradient.stops = reverseColorStops(this.radialGradient.stops);
    this.onGradientChange();
  }
}
