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

  trackWidth = 0;

  _stops: IColorStop[] = [];

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

  onClickDragHandle(e: PointerEvent) {
    e.stopPropagation();
    this.isDragging = true;
    this.cdr.markForCheck();
  }

  onDragStart(e: CdkDragStart) {}

  onDragMove(e: CdkDragMove, stop: IColorStop, index: number) {
    const position = e.source.getFreeDragPosition();
    const xPercent = Math.round((position.x / this.trackWidth) * 100);
    stop.offset.value = xPercent.toString();
    stop.position.x = position.x;

    this.getGradientColor(this.reorderStops(index));
  }

  onDragEnd(e: CdkDragEnd, stop: IColorStop) {
    this._stops.sort((a, b) => Number(a.offset.value) - Number(b.offset.value));
    this.isDragging = false;
    this.cdr.markForCheck();
  }

  reorderStops(index: number) {
    // Make a copy to avoid modifying the original array reference
    const newArr = [...this._stops];

    // Now, we need to move this potentially out-of-place element
    // to its correct sorted position.
    // This is essentially an insertion sort pass for a single element.

    let i = index;

    while (i > 0 && +newArr[i].offset.value < +newArr[i - 1].offset.value) {
      // Swap elements
      [newArr[i], newArr[i - 1]] = [newArr[i - 1], newArr[i]];
      i--;
    }

    while (i < newArr.length - 1 && +newArr[i].offset.value > +newArr[i + 1].offset.value) {
      // Swap elements
      [newArr[i], newArr[i + 1]] = [newArr[i + 1], newArr[i]];
      i++;
    }

    return newArr;
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
}
