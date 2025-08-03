import { ColorStop } from './type';

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

  for (let i = 0, n = v.length; i < n; ) {
    const [color, offset] = split(v[i], /\s+/);

    if (isHint(v[i + 1])) {
      stops.push({
        color,
        offset: resolveLength(offset),
        hint: resolveLength(v[i + 1]),
      });
      i += 2;
    } else {
      stops.push({
        color,
        offset: resolveLength(offset),
      });
      i++;
    }
  }

  return stops;
}

const REGEX = /^(-?\d+\.?\d*)(%|vw|vh|px|em|rem|deg|rad|grad|turn|ch|vmin|vmax)?$/;

function isHint(v: string) {
  return REGEX.test(v);
}

export function resolveLength(v?: string) {
  if (!v) return undefined;

  const [, value, unit] = v.trim().match(REGEX) || [];

  return { value: Number(value), unit: unit ?? 'px' };
}
