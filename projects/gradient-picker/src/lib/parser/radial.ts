import { ColorStop, PositionPropertyValue } from './type';
import { resolvePosition, resolveStops, split } from './utils';

export type RgExtentKeyword =
  | 'closest-corner'
  | 'closest-side'
  | 'farthest-corner'
  | 'farthest-side';

export interface RadialGradientResult {
  repeating: boolean;
  shape: 'circle' | 'ellipse';
  size: PositionPropertyValue[];
  position: {
    x: PositionPropertyValue;
    y: PositionPropertyValue;
  };
  stops: ColorStop[];
}

const rgExtentKeyword = new Set<RgExtentKeyword>([
  'closest-corner',
  'closest-side',
  'farthest-corner',
  'farthest-side',
]);

function isRgExtentKeyword(v: any): v is RgExtentKeyword {
  return rgExtentKeyword.has(v);
}

export function parseRadialGradient(input: string): RadialGradientResult {
  if (!/(repeating-)?radial-gradient/.test(input))
    throw new SyntaxError(`could not find syntax for this item: ${input}`);

  const [, repeating, props] = input.match(/(repeating-)?radial-gradient\((.+)\)/)!;
  const result: RadialGradientResult = {
    repeating: Boolean(repeating),
    shape: 'ellipse',
    size: [
      {
        type: 'keyword',
        value: 'farthest-corner',
      },
    ],
    position: {
      x: { type: 'keyword', value: 'center' },
      y: { type: 'keyword', value: 'center' },
    },
    stops: [],
  };

  const properties = split(props);
  // handle like radial-gradient(rgba(0,0,0,0), #ee7621)
  if (isColor(properties[0])) {
    return { ...result, stops: resolveStops(properties) };
  }

  const prefix = properties[0].split('at').map(v => v.trim());

  const shape = ((prefix[0] || '').match(/(circle|ellipse)/) || [])[1];
  const size: string[] =
    (prefix[0] || '').match(
      // eslint-disable-next-line max-len
      /(-?\d+\.?\d*(vw|vh|px|em|rem|%|rad|grad|turn|deg)?|closest-corner|closest-side|farthest-corner|farthest-side)/g
    ) || [];

  if (!shape) {
    if (size.length === 1 && !isRgExtentKeyword(size[0])) {
      result.shape = 'circle';
    } else {
      result.shape = 'ellipse';
    }
  } else {
    result.shape = shape as RadialGradientResult['shape'];
  }

  if (size.length === 0) {
    size.push('farthest-corner');
  }

  result.size = size.map(v => {
    if (isRgExtentKeyword(v)) {
      return { type: 'keyword', value: v };
    } else {
      return { type: 'length', value: v };
    }
  });

  result.position = resolvePosition(prefix[1]);

  if (shape || size.length > 0 || prefix[1]) properties.shift();

  return {
    ...result,
    stops: resolveStops(properties),
  };
}

function isColor(v: string) {
  if (/(circle|ellipse|at)/.test(v) || rgExtentKeyword.has(v as RgExtentKeyword)) return false;
  return /^(rgba?|hwb|hsl|lab|lch|oklab|color|#|[a-zA-Z]+)/.test(v);
}

export function stringifyRadialGradient(input: RadialGradientResult) {
  const type = input.repeating ? 'repeating-radial-gradient' : 'radial-gradient';

  const shape = input.shape;
  const sizes = input.size.map(s => s.value);
  const posX = input.position.x.value;
  const posY = input.position.y.value;
  const pos = posX.trim() || posY.trim() ? `at ${posX} ${posY}` : '';

  const stops = input.stops.map(s => `${s.color} ${s.offset?.value}${s.offset?.unit}`);

  return `${type}(${shape} ${sizes.join(' ')} ${pos}, ${stops.join(', ')})`;
}
