import { ColorStop } from './type';
import { resolveStops, split } from './utils';

interface LinearOrientation {
  type: 'directional' | 'angular';
  value: string;
}

export interface LinearResult {
  orientation: LinearOrientation;
  repeating: boolean;
  stops: ColorStop[];
}

export function parseLinearGradient(input: string): LinearResult {
  if (!/^(repeating-)?linear-gradient/.test(input))
    throw new SyntaxError(`could not find syntax for this item: ${input}`);

  const [, repeating, props] = input.match(/(repeating-)?linear-gradient\((.+)\)/)!;
  const result: LinearResult = {
    orientation: { type: 'directional', value: 'bottom' },
    repeating: Boolean(repeating),
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
