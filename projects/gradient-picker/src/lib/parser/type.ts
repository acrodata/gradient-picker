export interface ColorStop {
  color: string;
  offset?: { unit: string; value: number };
  hint?: { unit: string; value: number };
}

export type XYZSpace = 'xyz' | 'xyz-d50' | 'xyz-d65';
export type RectangularColorSpace =
  | 'srgb'
  | 'srgb-linear'
  | 'display-p3'
  | 'a98-rgb'
  | 'prophoto-rgb'
  | 'rec2020'
  | 'lab'
  | 'oklab'
  | XYZSpace;
export type PolarColorSpace = 'hsl' | 'hwb' | 'lch' | 'oklch';
export type HueInterpolationMethod = `${'shorter' | 'longer' | 'increasing' | 'decreasing'} hue`;

export interface Color {
  space: RectangularColorSpace | PolarColorSpace;
  method?: HueInterpolationMethod;
}

export interface LinearOrientation {
  type: 'directional' | 'angular';
  value: string;
}

export interface LinearGradientResult {
  repeating: boolean;
  orientation: LinearOrientation;
  color?: Color;
  stops: ColorStop[];
}

export type PositionKeyword = 'center' | 'left' | 'right' | 'top' | 'bottom';

export type RgExtentKeyword =
  | 'closest-corner'
  | 'closest-side'
  | 'farthest-corner'
  | 'farthest-side';

export interface PositionPropertyValue {
  type: 'keyword' | 'length';
  value: string;
}

export interface RadialGradientResult {
  repeating: boolean;
  shape: 'circle' | 'ellipse';
  size: PositionPropertyValue[];
  position: {
    x: PositionPropertyValue;
    y: PositionPropertyValue;
  };
  color?: Color;
  stops: ColorStop[];
}

export interface ConicGradientResult {
  repeating: boolean;
  angle: string;
  position: {
    x: PositionPropertyValue;
    y: PositionPropertyValue;
  };
  color?: Color;
  stops: ColorStop[];
}

export type GradientType = 'linear' | 'radial' | 'conic';

export type GradientResult = LinearGradientResult | RadialGradientResult | ConicGradientResult;
