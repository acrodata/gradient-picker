# Gradient Picker

[![npm](https://img.shields.io/npm/v/@acrodata/gradient-picker.svg)](https://www.npmjs.com/package/@acrodata/gradient-picker)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/acrodata/gradient-picker/blob/main/LICENSE)

![cover](https://repository-images.githubusercontent.com/895835449/3c634479-9634-4183-9766-8623d41c6885)

A powerful and beautiful gradient picker.

#### Quick links

[Documentation](https://github.com/acrodata/gradient-picker?tab=readme-ov-file#usage) |
[Playground](https://acrodata.github.io/gradient-picker/)

## Features

- Full CSS gradient syntax support
- Full Touch Support
- A11y and keyboard support
- Multiple modular components
- Multiple CSS variables

## Installation

```bash
npm install @acrodata/gradient-picker ngx-color --save
```

## Usage

### Gradient Picker

```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GradientPicker } from '@acrodata/gradient-picker';

@Component({
  selector: 'your-app',
  template: `
    <gradient-picker [(ngModel)]="value" />
  `,
  imports: [FormsModule, GradientPicker],
})
export class YourAppComponent {
  value = 'linear-gradient(45deg, blue, red)';
}
```

### Modular Gradient Pickers

```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LinearGradientPicker, RadialGradientPicker, ConicGradientPicker } from '@acrodata/gradient-picker';

@Component({
  selector: 'your-app',
  template: `
    <linear-gradient-picker [(ngModel)]="linearValue" />
    <radial-gradient-picker [(ngModel)]="radialValue" />
    <conic-gradient-picker [(ngModel)]="conicValue" />
  `,
  imports: [FormsModule, LinearGradientPicker, RadialGradientPicker, ConicGradientPicker],
})
export class YourAppComponent {
  linearValue = 'linear-gradient(blue, red)';
  radialValue = 'radial-gradient(blue, red)';
  conicValue = 'conic-gradient(blue, red)';
}
```

### Gradient Stops

```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorStop, GradientStops } from '@acrodata/gradient-picker';

@Component({
  selector: 'your-app',
  template: `
    <gradient-stops [(ngModel)]="colorStops" />
  `,
  imports: [FormsModule, GradientStops],
})
export class YourAppComponent {
  colorStops: ColorStop[] = [{ color: 'red' }, { color: 'lime' }, { color: 'blue' }];
}
```

## CSS Variables

```css
--gp-container-width
--gp-container-shape
--gp-container-vertical-padding
--gp-container-horizontal-padding
--gp-container-margin
--gp-container-elevation-shadow
--gp-container-background-color
--gp-container-text-color
--gp-container-text-font
--gp-container-text-size

--gp-input-height
--gp-input-padding
--gp-input-shape
--gp-input-background-color
--gp-input-outline-color
--gp-input-hover-outline-color
--gp-input-focus-outline-color
--gp-unit-select-hover-background-color

--gp-icon-button-shape
--gp-icon-button-text-color
--gp-icon-button-background-color
--gp-icon-button-hover-background-color
--gp-icon-button-active-background-color
--gp-icon-button-focus-background-color
--gp-icon-button-focus-outline-color

--gp-stops-slider-height
--gp-stops-slider-bar-outline-color
--gp-stops-slider-thumb-shadow
--gp-stops-slider-thumb-background-color
--gp-stops-slider-thumb-toggle-outline-color
--gp-stop-list-max-height
--gp-stop-item-active-color
```

## License

MIT
