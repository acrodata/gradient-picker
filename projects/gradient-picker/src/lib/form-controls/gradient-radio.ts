/* eslint-disable @angular-eslint/no-output-native */
import {
  AfterContentInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  EventEmitter,
  forwardRef,
  inject,
  InjectionToken,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

let nextUniqueId = 0;

export class GradientRadioChange {
  constructor(
    public source: GradientRadioButton,
    public value: any
  ) {}
}

export const GRADIENT_RADIO_GROUP = new InjectionToken<GradientRadioGroup>('GradientRadioGroup');

@Directive({
  selector: 'gradient-radio-group',
  standalone: true,
  host: {
    class: 'gradient-radio-group',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GradientRadioGroup),
      multi: true,
    },
    {
      provide: GRADIENT_RADIO_GROUP,
      useExisting: GradientRadioGroup,
    },
  ],
})
export class GradientRadioGroup implements AfterContentInit, OnDestroy, ControlValueAccessor {
  private _changeDetector = inject(ChangeDetectorRef);

  private _isInitialized = false;

  @ContentChildren(forwardRef(() => GradientRadioButton), { descendants: true })
  _radios!: QueryList<GradientRadioButton>;

  @Input()
  get name() {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
    this._updateRadioButtonNames();
  }
  private _name = `gradient-radio-group-${nextUniqueId++}`;

  @Input()
  get value() {
    return this._value;
  }
  set value(newValue: any) {
    if (this._value !== newValue) {
      this._value = newValue;

      this._updateSelectedRadioFromValue();
      this._checkSelectedRadioButton();
    }
  }
  private _value: any = null;

  @Input()
  get selected() {
    return this._selected;
  }
  set selected(selected: GradientRadioButton | null) {
    this._selected = selected;
    this.value = selected ? selected.value : null;
    this._checkSelectedRadioButton();
  }
  private _selected: GradientRadioButton | null = null;

  @Input({ transform: booleanAttribute })
  get required() {
    return this._required;
  }
  set required(value: boolean) {
    this._required = value;
    this._markRadiosForCheck();
  }
  private _required = false;

  @Input({ transform: booleanAttribute })
  get disabled() {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = value;
    this._markRadiosForCheck();
  }
  private _disabled = false;

  @Output() readonly change = new EventEmitter<GradientRadioChange>();

  private _buttonChanges = Subscription.EMPTY;

  _onChange: (value: any) => void = () => {};
  _onTouched: () => void = () => {};

  ngAfterContentInit() {
    this._isInitialized = true;

    this._buttonChanges = this._radios.changes.subscribe(() => {
      if (this.selected && !this._radios.find(radio => radio === this.selected)) {
        this._selected = null;
      }
    });
  }

  ngOnDestroy(): void {
    this._buttonChanges.unsubscribe();
  }

  _checkSelectedRadioButton() {
    if (this._selected && !this._selected.checked) {
      this._selected.checked = true;
    }
  }

  _emitChangeEvent(): void {
    if (this._isInitialized) {
      this.change.emit(new GradientRadioChange(this._selected!, this.value));
    }
  }

  _markRadiosForCheck() {
    if (this._radios) {
      this._radios.forEach(radio => radio._markForCheck());
    }
  }

  writeValue(value: any): void {
    this.value = value;
    this._changeDetector.markForCheck();
  }

  registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this._changeDetector.markForCheck();
  }

  private _updateRadioButtonNames(): void {
    if (this._radios) {
      this._radios.forEach(radio => {
        radio.name = this.name;
        radio._markForCheck();
      });
    }
  }

  private _updateSelectedRadioFromValue(): void {
    const isAlreadySelected = this._selected !== null && this._selected.value === this._value;

    if (this._radios && !isAlreadySelected) {
      this._selected = null;
      this._radios.forEach(radio => {
        radio.checked = this.value === radio.value;
        if (radio.checked) {
          this._selected = radio;
        }
      });
    }
  }
}

@Component({
  selector: 'gradient-radio-button',
  standalone: true,
  template: `
    <input
      type="radio"
      [id]="inputId"
      [name]="name"
      [attr.name]="name"
      [value]="value"
      [checked]="checked"
      [disabled]="disabled"
      [required]="required"
      (change)="_onInputChange($event)"
    />
    <label [for]="inputId">
      <ng-content />
    </label>
  `,
  styleUrl: './gradient-radio.scss',
  host: {
    class: 'gradient-radio-button',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradientRadioButton implements OnInit {
  private _changeDetector = inject(ChangeDetectorRef);

  private _uniqueId = `gradient-radio-${++nextUniqueId}`;

  @Input() id = this._uniqueId;

  @Input() name = '';

  @Input({ transform: booleanAttribute })
  get checked() {
    return this._checked;
  }
  set checked(value: boolean) {
    if (this._checked !== value) {
      this._checked = value;
      this._changeDetector.markForCheck();
    }
  }
  private _checked = false;

  @Input()
  get value() {
    return this._value;
  }
  set value(value: any) {
    if (this._value !== value) {
      this._value = value;
      if (this.radioGroup !== null) {
        if (!this.checked) {
          this.checked = this.radioGroup.value === value;
        }
      }
    }
  }
  private _value: any = null;

  @Input({ transform: booleanAttribute })
  get required() {
    return this._required || (this.radioGroup !== null && this.radioGroup.required);
  }
  set required(value: boolean) {
    if (value !== this._required) {
      this._changeDetector.markForCheck();
    }
    this._required = value;
  }
  private _required = false;

  @Input({ transform: booleanAttribute })
  get disabled() {
    return this._disabled || (this.radioGroup !== null && this.radioGroup.disabled);
  }
  set disabled(value: boolean) {
    this._setDisabled(value);
  }
  private _disabled = false;

  @Output() readonly change = new EventEmitter<GradientRadioChange>();

  radioGroup = inject(GRADIENT_RADIO_GROUP, { optional: true });

  get inputId() {
    return `${this.id || this._uniqueId}-input`;
  }

  ngOnInit(): void {
    if (this.radioGroup) {
      this.name = this.radioGroup.name;
    }
  }

  private _emitChangeEvent(): void {
    this.change.emit(new GradientRadioChange(this, this.value));
  }

  _onInputChange(event: Event) {
    event.stopPropagation();

    this.checked = true;
    this._emitChangeEvent();

    if (this.radioGroup) {
      this.radioGroup._onChange(this.value);
      this.radioGroup._emitChangeEvent();
    }
  }

  _markForCheck() {
    this._changeDetector.markForCheck();
  }

  protected _setDisabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._changeDetector.markForCheck();
    }
  }
}
