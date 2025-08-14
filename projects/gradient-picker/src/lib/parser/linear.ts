import { ColorStop } from './type';
import { resolveStops, split } from './utils';

interface LinearOrientation {
  type: 'directional' | 'angular';
  value: string;
}

export interface LinearGradientResult {
  repeating: boolean;
  orientation: LinearOrientation;
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

  const properties: string[] = split(props);
  const orientation = resolveLinearOrientation(properties[0]);
  if (orientation) {
    result.orientation = orientation;
    properties.shift();
  }

  return { ...result, stops: resolveStops(properties) };
}

export function stringifyLinearGradient(input: LinearGradientResult) {
  const { repeating, orientation, stops } = input;

  const type = repeating ? 'repeating-linear-gradient' : 'linear-gradient';

  const params: string[] = [];

  const orientationVal = orientation.value.trim()
    ? orientation.type === 'angular'
      ? orientation.value
      : 'to ' + orientation.value
    : '';

  if (orientationVal) {
    params.push(orientationVal);
  }

  const colorStr = stops
    .map(s => `${s.color} ${s.offset?.value}${s.offset?.unit}`.trim())
    .join(', ');

  params.push(colorStr);

  return `${type}(${params.join(', ')})`;
}
