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
  GradientRadioGroup,
  GradientUnitInput,
} from './form-controls';
import { GradientStops } from './gradient-stops';
import { parseRadialGradient, RadialGradientResult, stringifyRadialGradient } from './parser';
import {
  hueInterpolationMethods,
  lengthUnits,
  polarColorSpaces,
  positionXKeywords,
  positionYKeywords,
  rectangularColorSpaces,
  reverseColorStops,
} from './utils';

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
    GradientRadioGroup,
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
    repeating: false,
    shape: 'ellipse',
    size: [],
    position: {
      x: { type: 'keyword', value: 'center' },
      y: { type: 'keyword', value: 'center' },
    },
    stops: [{ color: '#000000' }],
  };

  value = '';

  sizeKeywords = ['farthest-corner', 'farthest-side', 'closest-corner', 'closest-side'];

  lengthUnits = lengthUnits;

  posXOptions = positionXKeywords;

  posYOptions = positionYKeywords;

  colorSpaceOptgroups = [
    { label: 'Rectangular', options: rectangularColorSpaces },
    { label: 'Polar', options: polarColorSpaces },
  ];

  hueInterpolationMethodOptions = hueInterpolationMethods;

  get isPolarColorSpace() {
    return polarColorSpaces.includes(this.radialGradient.color?.space || '');
  }

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
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

  onColorSpaceChange() {
    if (!this.isPolarColorSpace && this.radialGradient.color) {
      this.radialGradient.color.method = undefined;
    }
    this.onGradientChange();
  }

  correctSizeByShape() {
    if (this.radialGradient.shape === 'ellipse') {
      this.radialGradient.size = [
        { type: 'length', value: '50%' },
        { type: 'length', value: '50%' },
      ];
    } else {
      this.radialGradient.size = [{ type: 'length', value: '50px' }];
    }
  }

  switchShape() {
    const hasLengthSize = this.radialGradient.size.some(size => size.type === 'length');
    if (hasLengthSize) {
      this.correctSizeByShape();
    }
    this.onGradientChange();
  }

  switchSizeType() {
    const hasKeywordSize = this.radialGradient.size.some(size => size.type === 'keyword');
    if (hasKeywordSize) {
      this.correctSizeByShape();
    } else {
      this.radialGradient.size = [{ type: 'keyword', value: 'farthest-corner' }];
    }
    this.onGradientChange();
  }

  switchPositionType() {
    const hasKeywordPosition =
      this.radialGradient.position.x.type === 'keyword' ||
      this.radialGradient.position.y.type === 'keyword';
    if (hasKeywordPosition) {
      this.radialGradient.position = {
        x: { type: 'length', value: '50%' },
        y: { type: 'length', value: '50%' },
      };
    } else {
      this.radialGradient.position = {
        x: { type: 'keyword', value: 'center' },
        y: { type: 'keyword', value: 'center' },
      };
    }
    this.onGradientChange();
  }
}
