import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  inject,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GradientInputField } from './gradient-input-field';
import { GradientStops } from './gradient-stops';
import { LinearResult, parseLinearGradient } from './parser';

@Component({
  selector: 'linear-gradient-picker',
  standalone: true,
  imports: [GradientStops, GradientInputField, FormsModule],
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
export class LinearGradientPicker implements OnInit, ControlValueAccessor {
  private cdr = inject(ChangeDetectorRef);

  @Input({ transform: booleanAttribute }) disabled = false;

  linearGradient: LinearResult = {
    orientation: { type: 'directional', value: '' },
    repeating: false,
    stops: [{ color: '#000000' }],
  };

  value = 'linear-gradient(transparent, #000000)';

  ngOnInit(): void {}

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    if (value) {
      this.value = value;
    }
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
    // TODO: 封装 srting 函数
    const stops = this.linearGradient.stops.map(
      s => `${s.color} ${s.offset?.value}${s.offset?.unit}`
    );
    const orientation =
      this.linearGradient.orientation.type === 'angular'
        ? this.linearGradient.orientation.value
        : 'to ' + this.linearGradient.orientation.value;
    this.value = `linear-gradient(${orientation}, ${stops.join(',')})`;

    this.onChange(this.value);
  }
}
