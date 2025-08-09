import { resolveStops, split } from './utils';
import { ColorStop } from './type';

type RectColorSpace = 'srgb' | 'srgb-linear' | 'lab' | 'oklab' | 'xyz' | 'xyz-d50' | 'xyz-d65';
type PolarColorSpace = 'hsl' | 'hwb' | 'lch' | 'oklch';
type HueInterpolationMethod = `${'shorter' | 'longer' | 'increasing' | 'decreasing'} hue`;

interface Color {
  space: RectColorSpace | PolarColorSpace;
  method?: HueInterpolationMethod;
}

export interface ConicGradientResult {
  repeating: boolean;
  angle: string;
  position: string;
  color?: Color;
  stops: ColorStop[];
}

const set = new Set(['from', 'in', 'at']);

export function parseConicGradient(input: string): ConicGradientResult {
  if (!/(repeating-)?conic-gradient/.test(input))
    throw new SyntaxError(`could not find syntax for this item: ${input}`);

  const [, repeating, props] = input.match(/(repeating-)?conic-gradient\((.+)\)/)!;
  const result: ConicGradientResult = {
    repeating: Boolean(repeating),
    angle: '0deg',
    position: 'center',
    stops: [],
  };

  const properties = split(props).map(v => v.trim());

  const prefix = split(properties[0], /\s+/);

  let k = '';
  let j = 0;
  for (let i = 0, n = prefix.length; i < n; i++) {
    if (set.has(prefix[i])) {
      if (i > 0) {
        Object.assign(result, resolvePrefix(k, prefix, j, i));
      }
      k = prefix[i];
      j = i + 1;
    }
  }

  if (k) {
    Object.assign(result, resolvePrefix(k, prefix, j, prefix.length));
    properties.shift();
  }

  return { ...result, stops: resolveStops(properties) };
}

function resolvePrefix(k: string, props: string[], start: number, end: number) {
  switch (k) {
    case 'from':
      return { angle: props.slice(start, end).join(' ') };
    case 'at':
      return { position: props.slice(start, end).join(' ') };
    case 'in': {
      const [space, ...method] = props.slice(start, end);
      return {
        color: {
          space: space as Color['space'],
          method: method.length > 0 ? (method.join(' ') as HueInterpolationMethod) : undefined,
        },
      };
    }
    default:
      return null;
  }
}

export function stringifyConicGradient(input: ConicGradientResult) {
  const type = input.repeating ? 'repeating-conic-gradient' : 'conic-gradient';

  const { angle, position } = input;

  const fromAt: string[] = [];
  if (angle.trim()) {
    fromAt.push(`from ${angle}`);
  }
  if (position.trim()) {
    fromAt.push(`at ${position}`);
  }

  const params: string[] = [];

  if (fromAt.join(' ').trim()) {
    params.push(fromAt.join(' '));
  }

  const stops = input.stops.map(s => `${s.color} ${s.offset?.value}${s.offset?.unit}`);

  params.push(stops.join(', '));

  return `${type}(${params.join(', ')})`;
}
