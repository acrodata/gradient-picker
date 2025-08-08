import { CdkDrag, CdkDragEnd, CdkDragMove } from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GradientIconButton, GradientInputField } from './form-controls';
import { GradientColorpicker, GradientColorpickerToggle } from './gradient-colorpicker';
import { ColorStop } from './parser';
import {
  convertAngleToPercentage,
  fillUndefinedOffsets,
  interpolateColor,
  reorderElementByCondition,
} from './utils';

export interface IColorStop extends ColorStop {
  offset: { value: number; unit: string };
  position: { x: number; y: number };
}

@Component({
  selector: 'gradient-stops',
  standalone: true,
  imports: [
    FormsModule,
    CdkDrag,
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
})
export class GradientStops implements OnChanges, AfterViewInit {
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('sliderTrack') track?: ElementRef<HTMLElement>;

  @Input() colorStops: ColorStop[] = [];

  @Output() colorStopsChange = new EventEmitter<ColorStop[]>();

  sliderColorStops: IColorStop[] = [];

  trackWidth = 0;

  gradientColor = '';

  isDragging = false;

  selectedStop?: IColorStop;

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

  getStops() {
    if (!this.track) {
      return;
    }

    this.trackWidth = this.track.nativeElement.offsetWidth;

    this.sliderColorStops = fillUndefinedOffsets(convertAngleToPercentage(this.colorStops)).map(
      stop => {
        const offset = stop.offset || { value: 0, unit: '%' };
        return {
          ...stop,
          offset,
          position: {
            x: Math.min((offset.value / 100) * this.trackWidth, this.trackWidth),
            y: 0,
          },
        };
      }
    );

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

  addStop(e: MouseEvent) {
    const xPercentVal = Math.round((e.offsetX / this.trackWidth) * 100);
    const newStop = {
      color: this.getInsertStopColor(e.offsetX),
      offset: { value: xPercentVal, unit: '%' },
      position: { x: Math.round(e.offsetX), y: 0 },
    };
    this.sliderColorStops.push(newStop);
    this.sliderColorStops.sort((a, b) => a.offset.value - b.offset.value);

    this.getGradientColor();
    this.onStopsChange();
  }

  onDragMove(e: CdkDragMove, stop: IColorStop, index: number) {
    const position = e.source.getFreeDragPosition();
    const xPercent = Math.round((position.x / this.trackWidth) * 100);
    stop.offset.value = xPercent;
    stop.position.x = position.x;

    const stops = reorderElementByCondition<IColorStop>(
      this.sliderColorStops,
      index,
      (a, b) => a.position.x < b.position.x,
      (a, b) => a.position.x > b.position.x
    );
    this.getGradientColor(stops);
    this.onStopsChange();
  }

  onDragEnd(e: CdkDragEnd, stop: IColorStop) {
    this.sliderColorStops.sort((a, b) => a.offset.value - b.offset.value);
    this.isDragging = false;
    this.cdr.markForCheck();

    this.onStopsChange();
  }

  onDragHandleDown(e: MouseEvent, stop: IColorStop) {
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

  onStopItemClick(stop: IColorStop) {
    this.selectedStop = stop;
  }

  onStopColorChange(stop: IColorStop) {
    this.getGradientColor();
    this.onStopsChange();
  }

  onStopOffsetChange(stop: IColorStop) {
    stop.position = {
      x: (stop.offset.value / 100) * this.trackWidth,
      y: 0,
    };
    this.sliderColorStops.sort((a, b) => a.offset.value - b.offset.value);
    this.getGradientColor();
    this.onStopsChange();
  }

  onStopRemove(stop: IColorStop) {
    this.sliderColorStops = this.sliderColorStops.filter(s => s !== stop);
    this.getGradientColor();
    this.onStopsChange();
  }

  onStopsChange() {
    this.colorStops.forEach(() => this.colorStops.pop());
    this.sliderColorStops.forEach((stop, i) => {
      this.colorStops[i] = { color: stop.color, offset: stop.offset };
    });
    this.colorStops.sort((a, b) => a.offset!.value - b.offset!.value);
    this.colorStopsChange.next(this.colorStops);
  }
}
