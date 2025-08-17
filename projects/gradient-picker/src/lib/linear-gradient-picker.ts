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
  GradientUnitInput,
} from './form-controls';
import { GradientStops } from './gradient-stops';
import { LinearGradientResult, parseLinearGradient, stringifyLinearGradient } from './parser';
import {
  angleUnits,
  hueInterpolationMethods,
  polarColorSpaces,
  rectangularColorSpaces,
  reverseColorStops,
} from './utils';

@Component({
  selector: 'linear-gradient-picker',
  standalone: true,
  imports: [
    FormsModule,
    GradientStops,
    GradientInputField,
    GradientFormGroup,
    GradientUnitInput,
    GradientCheckbox,
    GradientIconButton,
  ],
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
export class LinearGradientPicker implements ControlValueAccessor {
  private cdr = inject(ChangeDetectorRef);

  @Input({ transform: booleanAttribute }) disabled = false;

  linearGradient: LinearGradientResult = {
    repeating: false,
    orientation: { type: 'directional', value: '' },
    stops: [{ color: '#000000' }],
  };

  value = '';

  angleUnits = angleUnits;

  directionOptions = [
    { label: '↑ top', value: 'top' },
    { label: '↗ top right', value: 'top right' },
    { label: '→ right', value: 'right' },
    { label: '↘ bottom right', value: 'bottom right' },
    { label: '↓ bottom', value: 'bottom' },
    { label: '↙ bottom left', value: 'bottom left' },
    { label: '← left', value: 'left' },
    { label: '↖ top left', value: 'top left' },
  ];

  colorSpaceOptgroups = [
    { label: 'Rectangular', options: rectangularColorSpaces },
    { label: 'Polar', options: polarColorSpaces },
  ];

  hueInterpolationMethodOptions = hueInterpolationMethods;

  get isPolarColorSpace() {
    return polarColorSpaces.includes(this.linearGradient.color?.space || '');
  }

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value || 'linear-gradient(transparent, #000000)';
    this.linearGradient = parseLinearGradient(this.value);
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
    this.value = stringifyLinearGradient(this.linearGradient);
    this.onChange(this.value);
  }

  reverseStops() {
    this.linearGradient.stops = reverseColorStops(this.linearGradient.stops);
    this.onGradientChange();
  }

  onColorSpaceChange() {
    if (!this.isPolarColorSpace && this.linearGradient.color) {
      this.linearGradient.color.method = undefined;
    }
    this.onGradientChange();
  }
}
