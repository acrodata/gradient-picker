import { CdkDrag, CdkDragEnd, CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';
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
import { reorderArrayElement } from './utils';

export interface IColorStop extends ColorStop {
  offset: { value: string; unit: string };
  position: { x: number; y: number };
}

@Component({
  selector: 'gradient-stops',
  standalone: true,
  imports: [FormsModule, CdkDrag],
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

  addStop(e: PointerEvent) {
    const xPercent = Math.round((e.offsetX / this.trackWidth) * 100);
    const newStop = {
      color: 'transparent',
      offset: { value: xPercent.toString(), unit: '%' },
      position: { x: Math.round(e.offsetX), y: 0 },
    };
    this._stops.push(newStop);
    this._stops.sort((a, b) => Number(a.offset.value) - Number(b.offset.value));

    this.getGradientColor();
  }

  onDragStart(e: CdkDragStart) {}

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

  onDragHandleDown(e: PointerEvent) {
    e.stopPropagation();
    this.isDragging = true;
    this.cdr.markForCheck();
  }

  onDragHandleUp(e: PointerEvent) {
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
}
