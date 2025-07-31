import { CdkDrag, CdkDragEnd, CdkDragMove } from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorStop } from 'css-gradient-parser';
import { GradientColorpicker, GradientColorpickerToggle } from './gradient-colorpicker';
import { GradientInputField } from './gradient-input-field';
import { interpolateColor, reorderArrayElement } from './utils';

export interface IColorStop extends ColorStop {
  offset: { value: string; unit: string };
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
  ],
  templateUrl: './gradient-stops.html',
  styleUrl: './gradient-stops.scss',
  host: {
    class: 'gradient-stops',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradientStops implements OnInit, AfterViewInit {
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('sliderTrack') track!: ElementRef<HTMLElement>;

  @Input() colorStops: ColorStop[] = [];

  _stops: IColorStop[] = [];

  trackWidth = 0;

  gradientColor = '';

  isDragging = false;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.trackWidth = this.track.nativeElement.offsetWidth;

    this._stops = this.colorStops.map(stop => {
      const offset = stop.offset || { value: '0', unit: '%' };
      return {
        ...stop,
        offset,
        position: {
          x: Math.min((Number(offset.value) / 100) * this.trackWidth, this.trackWidth),
          y: 0,
        },
      };
    });

    this.getGradientColor();

    this.cdr.markForCheck();
  }

  getGradientColor(stops = this._stops) {
    const colors = stops.map(({ color, offset }) => `${color} ${offset.value}${offset.unit}`);
    this.gradientColor = `linear-gradient(to right, ${colors.join(',')})`;
    this.cdr.markForCheck();
  }

  addStop(e: MouseEvent) {
    const xPercentVal = Math.round((e.offsetX / this.trackWidth) * 100);
    const newStop = {
      color: this.getInsertStopColor(e.offsetX),
      offset: { value: xPercentVal.toString(), unit: '%' },
      position: { x: Math.round(e.offsetX), y: 0 },
    };
    this._stops.push(newStop);
    this._stops.sort((a, b) => Number(a.offset.value) - Number(b.offset.value));

    this.getGradientColor();
  }

  onDragMove(e: CdkDragMove, stop: IColorStop, index: number) {
    const position = e.source.getFreeDragPosition();
    const xPercent = Math.round((position.x / this.trackWidth) * 100);
    stop.offset.value = xPercent.toString();
    stop.position.x = position.x;

    const stops = reorderArrayElement<IColorStop>(
      this._stops,
      index,
      (a, b) => a.position.x < b.position.x,
      (a, b) => a.position.x > b.position.x
    );
    this.getGradientColor(stops);
  }

  onDragEnd(e: CdkDragEnd, stop: IColorStop) {
    this._stops.sort((a, b) => Number(a.offset.value) - Number(b.offset.value));
    this.isDragging = false;
    this.cdr.markForCheck();
  }

  onDragHandleDown(e: MouseEvent) {
    e.stopPropagation();
    this.isDragging = true;
    this.cdr.markForCheck();
  }

  onDragHandleUp(e: MouseEvent) {
    e.stopPropagation();
    this.isDragging = false;
    this.cdr.markForCheck();
  }

  onStopColorChange(stop: IColorStop) {
    this.getGradientColor();
  }

  onStopOffsetChange(stop: IColorStop) {
    stop.position = {
      x: (Number(stop.offset.value) / 100) * this.trackWidth,
      y: 0,
    };
    this._stops.sort((a, b) => Number(a.offset.value) - Number(b.offset.value));
    this.getGradientColor();
  }

  onStopRemove(stop: IColorStop) {
    this._stops = this._stops.filter(s => s !== stop);
    this.getGradientColor();
  }

  getInsertStopColor(offsetX: number) {
    const prevStop = this._stops.filter(s => s.position.x < offsetX).pop();
    const nextStop = this._stops.filter(s => s.position.x > offsetX).shift();
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
}
