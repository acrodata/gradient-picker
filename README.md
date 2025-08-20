# Gradient Picker

[![npm](https://img.shields.io/npm/v/@acrodata/gradient-picker.svg)](https://www.npmjs.com/package/@acrodata/gradient-picker)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/acrodata/gradient-picker/blob/main/LICENSE)

![gradient-picker-cover](https://github.com/user-attachments/assets/c1b95bba-faec-42f2-9256-30dfbe9398d5)

A powerful and user-friendly CSS gradient picker.

#### Quick links

[Documentation](https://github.com/acrodata/gradient-picker?tab=readme-ov-file#usage) |
[Playground](https://acrodata.github.io/gradient-picker/)

## Installation

```bash
npm install @acrodata/gradient-picker --save
```

## Usage

### Gradient Picker

```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ColorStop,
  GradientPicker,
  LinearGradientPicker,
  RadialGradientPicker,
  ConicGradientPicker,
  GradientStops,
} from '@acrodata/gradient-picker';

@Component({
  selector: 'your-app',
  template: `
    <gradient-picker [(ngModel)]="value" />

    <linear-gradient-picker [(ngModel)]="linearValue" />
    <radial-gradient-picker [(ngModel)]="radialValue" />
    <conic-gradient-picker [(ngModel)]="conicValue" />

    <gradient-stops [(ngModel)]="colorStops" />
  `,
  imports: [
    FormsModule,
    GradientPicker,
    LinearGradientPicker,
    RadialGradientPicker,
    ConicGradientPicker,
    GradientStops,
  ],
})
export class YourAppComponent {
  value = 'linear-gradient(45deg, blue, red)';

  linearValue = 'linear-gradient(45deg, blue, red)';
  radialValue = 'radial-gradient(45deg, blue, red)';
  conicValue = 'conic-gradient(45deg, blue, red)';

  colorStops: ColorStop[] = [{ color: 'red' }, { color: 'lime' }, { color: 'blue' }];
}
```

## License

MIT
