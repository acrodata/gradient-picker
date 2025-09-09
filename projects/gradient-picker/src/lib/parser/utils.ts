import {
  Color,
  ColorStop,
  HueInterpolationMethod,
  PositionKeyword,
  PositionPropertyValue,
} from './type';

export function split(input: string, separator: string | RegExp = ','): string[] {
  const result = [];
  let l = 0;
  let parentCount = 0;
  separator = new RegExp(separator);

  for (let i = 0; i < input.length; i++) {
    if (input[i] === '(') {
      parentCount++;
    } else if (input[i] === ')') {
      parentCount--;
    }

    if (parentCount === 0 && separator.test(input[i])) {
      result.push(input.slice(l, i).trim());
      l = i + 1;
    }
  }

  result.push(input.slice(l).trim());

  return result;
}

export function resolveStops(v: string[]): ColorStop[] {
  const stops: ColorStop[] = [];

  for (let i = 0, n = v.length; i < n; i++) {
    const [color, offset, offset2] = split(v[i], /\s+/);

    if (isHint(v[i])) {
      stops.push({
        color: '',
        offset: resolveLength(v[i]),
        hint: resolveLength(v[i]),
      });
    } else {
      stops.push({
        color,
        offset: resolveLength(offset),
      });

      if (offset2) {
        stops.push({
          color,
          offset: resolveLength(offset2),
        });
      }
    }
  }

  return stops;
}

const REGEX = /^(-?\d*\.?\d*)(%|vw|vh|px|em|rem|deg|rad|grad|turn|ch|vmin|vmax)?$/;

function isHint(v: string) {
  return REGEX.test(v);
}

export function resolveLength(v?: string) {
  if (!v) return undefined;

  const [, value, unit] = v.trim().match(REGEX) || [];

  return { value: Number(value), unit: unit ?? 'px' };
}

const positionKeyword = new Set<PositionKeyword>(['center', 'left', 'top', 'right', 'bottom']);

function isPositionKeyword(v: any): v is PositionKeyword {
  return positionKeyword.has(v) || isNaN(parseFloat(v));
}

function extendPosition(v: string[]) {
  const res: string[] = Array(2).fill('');
  for (let i = 0; i < 2; i++) {
    // If the x position is the length, the y position should also be the length
    // at 100% => at 100% 50%
    if (!v[i]) res[i] = i == 0 || isPositionKeyword(v[i - 1]) ? 'center' : '50%';
    else res[i] = v[i];
  }

  return res;
}

export function resolvePosition(v = '') {
  let posArr = extendPosition(v.split(' ').filter(v => v));
  // Correct the positions of x and y
  // top center => center top
  // center left => left center
  if (['top', 'bottom'].includes(posArr[0]) || ['left', 'right'].includes(posArr[1])) {
    posArr = posArr.reverse();
  }

  const position: {
    x: PositionPropertyValue;
    y: PositionPropertyValue;
  } = {
    x: { type: 'keyword', value: 'center' },
    y: { type: 'keyword', value: 'center' },
  };

  position.x = isPositionKeyword(posArr[0])
    ? { type: 'keyword', value: posArr[0] }
    : { type: 'length', value: posArr[0] };

  position.y = isPositionKeyword(posArr[1])
    ? { type: 'keyword', value: posArr[1] }
    : { type: 'length', value: posArr[1] };

  return position;
}

export function splitByColorInterp(input: string) {
  const regex = /\bin\s+([a-z0-9-]+(?:\s+(?:shorter|longer|increasing|decreasing)\s+hue)?)\b/i;

  const match = input.match(regex);

  if (!match) {
    return [input];
  }

  // match[0]: in color interpolation method
  const matchedStr = match[0];
  // match[1]: color interpolation method
  const colorInterpMethod = match[1];

  const parts = input.split(matchedStr);
  const remainingStr = (parts[0] + parts[1]).trim();

  return [remainingStr, colorInterpMethod];
}

// https://developer.mozilla.org/en-US/docs/Web/CSS/color-interpolation-method
export function resolveColorInterp(input: string): Color {
  const [space, ...method] = input.split(' ');
  return {
    space: space as Color['space'],
    method: method.length > 0 ? (method.join(' ') as HueInterpolationMethod) : undefined,
  };
}
