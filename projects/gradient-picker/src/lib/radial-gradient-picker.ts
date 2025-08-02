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
import { parseRadialGradient, RadialResult } from 'css-gradient-parser';
import { GradientInputField } from './gradient-input-field';
import { GradientStops } from './gradient-stops';

@Component({
  selector: 'radial-gradient-picker',
  standalone: true,
  imports: [GradientStops, GradientInputField, FormsModule],
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

  radialGradient: RadialResult = {
    shape: 'ellipse',
    size: [],
    position: {
      x: { type: 'keyword', value: '' },
      y: { type: 'keyword', value: '' },
    },
    repeating: false,
    stops: [{ color: '#000' }],
  };

  value = '';

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    if (value) {
      this.radialGradient = parseRadialGradient(value);
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
    // TODO: 封装 srting 函数
    const stops = this.radialGradient.stops.map(
      s => `${s.color} ${s.offset?.value}${s.offset?.unit}`
    );
    const posX =
      this.radialGradient.position.x.type === 'length'
        ? this.radialGradient.position.x.value.value + this.radialGradient.position.x.value.unit
        : this.radialGradient.position.x.value;
    const posY =
      this.radialGradient.position.y.type === 'length'
        ? this.radialGradient.position.y.value.value + this.radialGradient.position.y.value.unit
        : this.radialGradient.position.y.value;
    const shape = this.radialGradient.shape;
    const sizes = this.radialGradient.size.map(s => {
      if (s.type === 'length') {
        return s.value.value + s.value.unit;
      } else {
        return s.value;
      }
    });
    this.value = `radial-gradient(${shape} ${sizes.join(' ')} at ${posX} ${posY}, ${stops.join(',')})`;

    this.onChange(this.value);
  }
}
