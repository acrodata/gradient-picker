import { ConicGradientResult } from './conic';
import { LinearGradientResult } from './linear';
import { RadialGradientResult } from './radial';

export interface ColorStop {
  color: string;
  offset?: { unit: string; value: number };
  hint?: { unit: string; value: number };
}

export type PositionKeyword = 'center' | 'left' | 'right' | 'top' | 'bottom';

export interface PositionPropertyValue {
  type: 'keyword' | 'length';
  value: string;
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

export type GradientType = 'linear' | 'radial' | 'conic';

export type GradientResult = LinearGradientResult | RadialGradientResult | ConicGradientResult;
