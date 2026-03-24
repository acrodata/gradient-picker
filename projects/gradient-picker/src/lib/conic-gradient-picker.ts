import {
  ConicGradientResult,
  parseConicGradient,
  stringifyConicGradient,
} from '@acrodata/gradient-parser';
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
import {
  GradientCheckbox,
  GradientFormGroup,
  GradientIconButton,
  GradientInputField,
  GradientUnitInput,
} from './form-controls';
import { GradientStops } from './gradient-stops';
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

  @Input()
  get value() {
    return this._value;
  }
  set value(newVal: string) {
    if (newVal !== this._value) {
      this._value = newVal || 'conic-gradient(transparent, #000000)';
      this.conicGradient = parseConicGradient(this._value);
      this.cdr.markForCheck();
    }
  }
  private _value = '';

  @Output() valueChange = new EventEmitter<string>();

  @Input({ transform: booleanAttribute }) disabled = false;

  conicGradient: ConicGradientResult = {
    repeating: false,
    angle: '0deg',
    position: {
      x: { type: 'keyword', value: 'center' },
      y: { type: 'keyword', value: 'center' },
    },
    stops: [{ color: 'transparent' }, { color: '#000000' }],
  };

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

  onGradientChange() {
    this._value = stringifyConicGradient(this.conicGradient);
    this.valueChange.emit(this._value);
    this.onChange(this._value);
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
