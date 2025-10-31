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
import { ConicGradientResult, parseConicGradient, stringifyConicGradient } from './parser';
import {
  angleUnits,
  hueInterpolationMethods,
  lengthUnits,
  polarColorSpaces,
  positionXKeywords,
  positionYKeywords,
  rectangularColorSpaces,
  reverseColorStops,
} from './utils';

@Component({
  selector: 'conic-gradient-picker',
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
    repeating: false,
    angle: '',
    position: {
      x: { type: 'keyword', value: 'center' },
      y: { type: 'keyword', value: 'center' },
    },
    stops: [{ color: '#000000' }],
  };

  value = '';

  angleUnits = angleUnits;

  lengthUnits = lengthUnits;

  posXOptions = positionXKeywords;

  posYOptions = positionYKeywords;

  colorSpaceOptgroups = [
    { label: 'Rectangular', options: rectangularColorSpaces },
    { label: 'Polar', options: polarColorSpaces },
  ];

  hueInterpolationMethodOptions = hueInterpolationMethods;

  get isPolarColorSpace() {
    return polarColorSpaces.includes(this.conicGradient.color?.space || '');
  }

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
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

  reverseStops() {
    this.conicGradient.stops = reverseColorStops(this.conicGradient.stops);
    this.onGradientChange();
  }

  onColorSpaceChange() {
    if (!this.isPolarColorSpace && this.conicGradient.color) {
      this.conicGradient.color.method = undefined;
    }
    this.onGradientChange();
  }

  switchPositionType() {
    const hasKeywordPosition =
      this.conicGradient.position.x.type === 'keyword' ||
      this.conicGradient.position.y.type === 'keyword';
    if (hasKeywordPosition) {
      this.conicGradient.position = {
        x: { type: 'length', value: '50%' },
        y: { type: 'length', value: '50%' },
      };
    } else {
      this.conicGradient.position = {
        x: { type: 'keyword', value: 'center' },
        y: { type: 'keyword', value: 'center' },
      };
    }
    this.onGradientChange();
  }
}
