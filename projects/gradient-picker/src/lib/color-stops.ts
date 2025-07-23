import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
  selector: 'gradient-color-stops',
  standalone: true,
  imports: [CdkDrag],
  templateUrl: './color-stops.html',
  styleUrl: './color-stops.scss',
  host: {
    class: 'gradient-color-stops',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradientColorStops {
  stops = [
    { color: '#ff0000', offset: 0.3 },
    { color: '#00ff00', offset: 0.5 },
  ];

  test(e: CdkDragEnd) {
    const res = `linear-gradient(217deg, rgba(255, 0, 0, 0.8), rgba(255, 0, 0, 0) 70.71%),
      linear-gradient(127deg, rgba(0, 255, 0, 0.8), rgba(0, 255, 0, 0) 70.71%),
      linear-gradient(336deg, rgba(0, 0, 255, 0.8), rgba(0, 0, 255, 0) 70.71%);`;
    console.log(e.source.getFreeDragPosition(), res);
  }
}
