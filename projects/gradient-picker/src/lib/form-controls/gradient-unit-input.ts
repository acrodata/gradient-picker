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
import { resolveLength } from '../parser/utils';

@Component({
  selector: 'gradient-unit-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './gradient-unit-input.html',
  styleUrl: './gradient-unit-input.scss',
  host: {
    class: 'gradient-unit-input',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GradientUnitInput),
      multi: true,
    },
  ],
})
export class GradientUnitInput implements ControlValueAccessor {
  private cdr = inject(ChangeDetectorRef);

  @Input({ transform: booleanAttribute }) disabled = false;

  @Input() units: string[] = [];

  value: number | null = null;

  unit = '';

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    const vu = resolveLength(value);
    if (vu) {
      this.value = vu.value;
      this.unit = vu.unit;
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

  onValueChange() {
    const value = this.value ? this.value + this.unit : '';
    this.onChange(value);
  }
}
