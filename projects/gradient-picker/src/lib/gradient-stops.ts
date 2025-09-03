import { CdkDrag, CdkDragEnd, CdkDragMove } from '@angular/cdk/drag-drop';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GradientIconButton, GradientInputField } from './form-controls';
import { GradientColorpicker, GradientColorpickerToggle } from './gradient-colorpicker';
import { ColorStop } from './parser';
import {
  convertAngleToPercentage,
  fillUndefinedOffsets,
  interpolateColor,
  reorderElementByCondition,
} from './utils';

export interface SliderColorStop extends ColorStop {
  offset: { value: number; unit: string };
  position: { x: number; y: number };
}

@Component({
  selector: 'gradient-stops',
  standalone: true,
  imports: [
    FormsModule,
    CdkDrag,
    CdkOverlayOrigin,
    GradientColorpicker,
    GradientColorpickerToggle,
    GradientInputField,
    GradientIconButton,
  ],
  templateUrl: './gradient-stops.html',
  styleUrl: './gradient-stops.scss',
  host: {
    class: 'gradient-stops',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GradientStops),
      multi: true,
    },
  ],
})
export class GradientStops implements ControlValueAccessor, AfterViewInit, OnChanges {
  private cdr = inject(ChangeDetectorRef);
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  @ViewChild('sliderTrack') track?: ElementRef<HTMLElement>;

  @Input({ transform: booleanAttribute }) disabled = false;

  @Input() colorStops: ColorStop[] = [];

  @Output() colorStopsChange = new EventEmitter<ColorStop[]>();

  sliderColorStops: SliderColorStop[] = [];

  trackWidth = 0;

  gradientColor = '';

  isDragging = false;

  selectedStop?: SliderColorStop;

  private onChange: (value: ColorStop[]) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['colorStops']) {
      this.getStops();
      this.getGradientColor();
    }
  }

  ngAfterViewInit(): void {
    this.getStops();
    this.getGradientColor();
  }

  writeValue(value: ColorStop[]): void {
    if (Array.isArray(value)) {
      this.colorStops = value;
      this.getStops();
      this.getGradientColor();
    }
  }

  registerOnChange(fn: (value: ColorStop[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  getStops() {
    if (!this.track) return;

    this.trackWidth = this.track.nativeElement.offsetWidth;

    this.sliderColorStops = fillUndefinedOffsets(convertAngleToPercentage(this.colorStops)).map(
      stop => {
        const offset = stop.offset || { value: 0, unit: '%' };
        const posX = Math.min(
          offset.unit === '%' ? (offset.value / 100) * this.trackWidth : offset.value,
          this.trackWidth
        );
        return {
          ...stop,
          offset,
          position: { x: posX, y: 0 },
        };
      }
    );

    this.selectedStop = undefined;

    this.cdr.markForCheck();
  }

  getGradientColor(stops = this.sliderColorStops) {
    const colors = stops.map(({ color, offset }) => `${color} ${offset.value}${offset.unit}`);
    this.gradientColor = `linear-gradient(to right, ${colors.join(',')})`;
    this.cdr.markForCheck();
  }

  getInsertStopColor(offsetX: number) {
    const prevStop = this.sliderColorStops.filter(s => s.position.x < offsetX).pop();
    const nextStop = this.sliderColorStops.filter(s => s.position.x > offsetX).shift();
    if (prevStop && nextStop) {
      const percentage =
        (offsetX - prevStop.position.x) / (nextStop.position.x - prevStop.position.x);
      return interpolateColor(prevStop.color, nextStop.color, percentage);
    } else if (prevStop) {
      return prevStop.color;
    } else if (nextStop) {
      return nextStop.color;
    } else {
      return '#000000';
    }
  }

  getNewStopOffsetX(stops = this.sliderColorStops) {
    if (stops.length === 0) return 0;

    if (stops.length === 1) {
      const newOffset = stops[0].offset.value < 50 ? 100 : 0;
      return (newOffset / 100) * this.trackWidth;
    }

    const currentIndex = this.selectedStop
      ? stops.findIndex(stop => stop === this.selectedStop)
      : 0;
    const neighborIndex = currentIndex === stops.length - 1 ? currentIndex - 1 : currentIndex + 1;
    const newOffset = (stops[currentIndex].offset.value + stops[neighborIndex].offset.value) / 2;
    return (newOffset / 100) * this.trackWidth;
  }

  addStop(e?: MouseEvent) {
    const offsetX = e ? e.offsetX : this.getNewStopOffsetX();
    const newStop = {
      color: this.getInsertStopColor(offsetX),
      offset: { value: Math.round((offsetX / this.trackWidth) * 100), unit: '%' },
      position: { x: Math.round(offsetX), y: 0 },
    };

    this.selectedStop = newStop;
    this.sliderColorStops.push(newStop);
    this.sliderColorStops.sort(this.sortFn);

    this.getGradientColor();
    this.onStopsChange();
  }

  onDragMove(e: CdkDragMove, stop: SliderColorStop, index: number) {
    const position = e.source.getFreeDragPosition();
    const xPercent = Math.round((position.x / this.trackWidth) * 100);
    stop.offset.value = stop.offset.unit === '%' ? xPercent : position.x;
    stop.position.x = position.x;

    const stops = reorderElementByCondition<SliderColorStop>(
      this.sliderColorStops,
      index,
      (a, b) => a.position.x < b.position.x,
      (a, b) => a.position.x > b.position.x
    );
    this.getGradientColor(stops);
    this.onStopsChange();
  }

  onDragEnd(e: CdkDragEnd, stop: SliderColorStop) {
    this.sliderColorStops.sort(this.sortFn);
    this.restoreFocus(this.track!.nativeElement.querySelectorAll('button'), stop);
    this.onStopsChange();

    this.isDragging = false;
    this.cdr.markForCheck();
  }

  onDragHandleDown(e: MouseEvent, stop: SliderColorStop) {
    e.stopPropagation();
    this.selectedStop = stop;
    this.isDragging = true;
    this.cdr.markForCheck();
  }

  onDragHandleUp(e: MouseEvent) {
    e.stopPropagation();
    this.isDragging = false;
    this.cdr.markForCheck();
  }

  onStopItemClick(stop: SliderColorStop) {
    this.selectedStop = stop;
  }

  onStopColorChange(stop: SliderColorStop) {
    this.getGradientColor();
    this.onStopsChange();
  }

  onStopOffsetChange(stop: SliderColorStop) {
    stop.position = {
      x: Math.min(
        stop.offset.unit === '%' ? (stop.offset.value / 100) * this.trackWidth : stop.offset.value,
        this.trackWidth
      ),
      y: 0,
    };
    this.sliderColorStops.sort(this.sortFn);
    this.restoreFocus(
      this.elementRef.nativeElement.querySelectorAll('.gradient-stop-item-offset input'),
      stop
    );
    this.getGradientColor();
    this.onStopsChange();
  }

  onStopRemove(stop: SliderColorStop) {
    if (this.sliderColorStops.length === 1) return;

    this.sliderColorStops = this.sliderColorStops.filter(s => s !== stop);
    this.selectedStop = undefined;
    this.getGradientColor();
    this.onStopsChange();
  }

  onStopsChange() {
    this.colorStops.forEach(() => this.colorStops.pop());
    this.sliderColorStops.forEach((stop, i) => {
      this.colorStops[i] = { color: stop.color, offset: stop.offset };
    });
    this.colorStops.sort(this.sortFn);
    this.onChange(this.colorStops);
    this.colorStopsChange.next(this.colorStops);
  }

  /** Move selected stop by arrow keys. */
  moveStop(e: Event, stop: SliderColorStop, index: number, step: number) {
    e.preventDefault();

    stop.offset.value = Math.min(
      stop.offset.unit === '%' ? 100 : this.trackWidth,
      Math.max(0, stop.offset.value + step)
    );
    stop.position = {
      x: stop.offset.unit === '%' ? (stop.offset.value / 100) * this.trackWidth : stop.offset.value,
      y: 0,
    };

    const stops = reorderElementByCondition<SliderColorStop>(
      this.sliderColorStops,
      index,
      (a, b) => a.position.x < b.position.x,
      (a, b) => a.position.x > b.position.x,
      () => {
        this.sliderColorStops.sort(this.sortFn);
        this.restoreFocus(this.track!.nativeElement.querySelectorAll('button'), stop);
      }
    );
    this.getGradientColor(stops);
    this.onStopsChange();
  }

  /** Restoring focus to the selected stop after sorting. */
  restoreFocus(nodeList: NodeListOf<HTMLElement>, stop: SliderColorStop) {
    const newIndex = this.sliderColorStops.findIndex(s => s === stop);
    const elements = Array.from(nodeList);
    elements[newIndex].focus();
  }

  /** Comparison function to sort color stops by their offset values. */
  sortFn = (a: ColorStop, b: ColorStop) => {
    const aOffset = a.offset!;
    const bOffset = b.offset!;
    if (aOffset.unit === bOffset.unit) {
      return aOffset.value - bOffset.value;
    } else {
      const aVal = aOffset.unit === '%' ? (aOffset.value / 100) * this.trackWidth : aOffset.value;
      const bVal = bOffset.unit === '%' ? (bOffset.value / 100) * this.trackWidth : bOffset.value;
      return aVal - bVal;
    }
  };
}
