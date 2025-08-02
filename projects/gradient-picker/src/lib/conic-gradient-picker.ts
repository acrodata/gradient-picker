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
import { ColorStop, parseConicGradient } from 'css-gradient-parser';
import { GradientStops } from './gradient-stops';
import { GradientInputField } from './gradient-input-field';

export interface ConicGradient {
  angle: string;
  repeating: boolean;
  position: string;
  stops: ColorStop[];
}

@Component({
  selector: 'conic-gradient-picker',
  standalone: true,
  imports: [GradientStops, GradientInputField, FormsModule],
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

  conicGradient: ConicGradient = {
    angle: '',
    position: '',
    repeating: false,
    stops: [{ color: '#000' }],
  };

  value = '';

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    if (value) {
      this.conicGradient = parseConicGradient(value);
      console.log(this.conicGradient);
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
    const stops = this.conicGradient.stops.map(
      s => `${s.color} ${s.offset?.value}${s.offset?.unit}`
    );
    const { angle, position } = this.conicGradient;
    this.value = `conic-gradient(from ${angle} at ${position}, ${stops.join(',')})`;

    this.onChange(this.value);
  }
}
