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

export function stringifyLinearGradient(input: LinearGradientResult) {
  const type = input.repeating ? 'repeating-linear-gradient' : 'linear-gradient';

  const params: string[] = [];

  const orientation = input.orientation.value.trim()
    ? input.orientation.type === 'angular'
      ? input.orientation.value
      : 'to ' + input.orientation.value
    : '';

  if (orientation) {
    params.push(orientation);
  }

  const stops = input.stops.map(s => `${s.color} ${s.offset?.value}${s.offset?.unit}`);

  params.push(stops.join(', '));

  return `${type}(${params.join(', ')})`;
}
