import { RadialGradientResult, RgExtentKeyword } from './type';
import {
  resolveColorInterp,
  resolvePosition,
  resolveStops,
  split,
  splitByColorInterp,
} from './utils';

const rgExtentKeywords = new Set<RgExtentKeyword>([
  'closest-corner',
  'closest-side',
  'farthest-corner',
  'farthest-side',
]);

function isRgExtentKeyword(v: any): v is RgExtentKeyword {
  return rgExtentKeywords.has(v);
}

function isColor(v: string) {
  if (/(circle|ellipse|at|in)/.test(v) || rgExtentKeywords.has(v as RgExtentKeyword)) return false;
  return /^(rgba?|hwb|hsl|lab|lch|oklab|color|#|[a-zA-Z]+)/.test(v);
}

export function parseRadialGradient(input: string): RadialGradientResult {
  if (!/(repeating-)?radial-gradient/.test(input))
    throw new SyntaxError(`could not find syntax for this item: ${input}`);

  const [, repeating, props] = input
    .replace(/[\n\t]/g, '')
    .match(/(repeating-)?radial-gradient\((.+)\)/)!;
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

  const [prefixStr, colorInterpStr] = splitByColorInterp(properties[0]);

  const prefix = prefixStr.split('at').map(v => v.trim());

  const shape = ((prefix[0] || '').match(/(circle|ellipse)/) || [])[1];
  const unitKeywordReg =
    // eslint-disable-next-line max-len
    /(-?\d+\.?\d*(vw|vh|px|em|rem|%|rad|grad|turn|deg)?|closest-corner|closest-side|farthest-corner|farthest-side)/g;
  const size: string[] = (prefix[0] || '').match(unitKeywordReg) || [];

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

  if (colorInterpStr) {
    result.color = resolveColorInterp(colorInterpStr);
  }

  if (shape || size.length > 0 || prefix[1]) properties.shift();

  return {
    ...result,
    stops: resolveStops(properties),
  };
}

export function stringifyRadialGradient(input: RadialGradientResult) {
  const { repeating, shape, size, position, color, stops } = input;

  const type = repeating ? 'repeating-radial-gradient' : 'radial-gradient';

  const sizes = size.map(s => s.value);

  const posX = position.x.value;
  const posY = position.y.value;
  const pos = posX.trim() || posY.trim() ? 'at ' + `${posX} ${posY}`.trim() : '';

  const prefixArr = [`${shape} ${sizes.join(' ')} ${pos}`];

  if (color && color.space) {
    prefixArr.push(`in ${color.space} ${color.method || ''}`.trim());
  }

  const stopsStr = stops
    .map(s => `${s.color} ${s.offset?.value ?? ''}${s.offset?.unit ?? ''}`.trim())
    .join(', ');

  return `${type}(${prefixArr.join(' ')}, ${stopsStr})`;
}
