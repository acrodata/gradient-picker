import { Color, ColorStop } from './type';
import { resolveColorInterp, resolveStops, split, splitByColorInterp } from './utils';

interface LinearOrientation {
  type: 'directional' | 'angular';
  value: string;
}

export interface LinearGradientResult {
  repeating: boolean;
  orientation: LinearOrientation;
  color?: Color;
  stops: ColorStop[];
}

function resolveLinearOrientation(angle: string): LinearOrientation | null {
  if (angle.startsWith('to ')) {
    return {
      type: 'directional',
      value: angle.replace('to ', ''),
    };
  }

  if (['turn', 'deg', 'grad', 'rad'].some(unit => angle.endsWith(unit))) {
    return {
      type: 'angular',
      value: angle,
    };
  }

  return null;
}

export function parseLinearGradient(input: string): LinearGradientResult {
  if (!/^(repeating-)?linear-gradient/.test(input))
    throw new SyntaxError(`could not find syntax for this item: ${input}`);

  const [, repeating, props] = input.match(/(repeating-)?linear-gradient\((.+)\)/)!;
  const result: LinearGradientResult = {
    repeating: Boolean(repeating),
    orientation: { type: 'directional', value: 'bottom' },
    stops: [],
  };

  const properties = split(props);

  const [prefixStr, colorInterpStr] = splitByColorInterp(properties[0]);

  const orientation = resolveLinearOrientation(prefixStr);
  if (orientation) {
    result.orientation = orientation;
  }

  if (colorInterpStr) {
    result.color = resolveColorInterp(colorInterpStr);
  }

  if (orientation || colorInterpStr) {
    properties.shift();
  }

  return { ...result, stops: resolveStops(properties) };
}

export function stringifyLinearGradient(input: LinearGradientResult) {
  const { repeating, orientation, color, stops } = input;

  const type = repeating ? 'repeating-linear-gradient' : 'linear-gradient';

  const prefixArr: string[] = [];

  const orientationVal = orientation.value.trim()
    ? orientation.type === 'angular'
      ? orientation.value
      : 'to ' + orientation.value
    : '';

  if (orientationVal) {
    prefixArr.push(orientationVal);
  }

  if (color && color.space) {
    prefixArr.push(`in ${color.space} ${color.method || ''}`.trim());
  }

  const props: string[] = [];

  if (prefixArr.length > 0) {
    props.push(prefixArr.join(' '));
  }

  const colorStr = stops
    .map(s => `${s.color} ${s.offset?.value}${s.offset?.unit}`.trim())
    .join(', ');

  props.push(colorStr);

  return `${type}(${props.join(', ')})`;
}
