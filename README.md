# Gradient Picker

[![npm](https://img.shields.io/npm/v/@acrodata/gradient-picker.svg)](https://www.npmjs.com/package/@acrodata/gradient-picker)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/acrodata/gradient-picker/blob/main/LICENSE)

## Installation

```bash
npm install @acrodata/gradient-picker --save
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
  standalone: true,
  imports: [FormsModule, GradientPicker],
})
export class YourAppComponent {
  value = 'linear-gradient(45deg, blue, red)';
}
```

## License

MIT
