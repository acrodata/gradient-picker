import { ConicGradientResult } from './type';
import { resolveColorInterp, resolvePosition, resolveStops, split } from './utils';

const set = new Set(['from', 'in', 'at']);

function resolvePrefix(k: string, props: string[], start: number, end: number) {
  switch (k) {
    case 'from':
      return { angle: props.slice(start, end).join(' ') };
    case 'at':
      return { position: resolvePosition(props.slice(start, end).join(' ')) };
    case 'in': {
      const arr = props.slice(start, end);
      return {
        color: resolveColorInterp(arr.join(' ')),
      };
    }
    default:
      return null;
  }
}

export function parseConicGradient(input: string): ConicGradientResult {
  if (!/(repeating-)?conic-gradient/.test(input))
    throw new SyntaxError(`could not find syntax for this item: ${input}`);

  const [, repeating, props] = input
    .replace(/[\n\t]/g, '')
    .match(/(repeating-)?conic-gradient\((.+)\)/)!;
  const result: ConicGradientResult = {
    repeating: Boolean(repeating),
    angle: '0deg',
    position: {
      x: { type: 'keyword', value: 'center' },
      y: { type: 'keyword', value: 'center' },
    },
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

export function stringifyConicGradient(input: ConicGradientResult) {
  const { repeating, angle, position, color, stops } = input;

  const type = repeating ? 'repeating-conic-gradient' : 'conic-gradient';

  const prefixArr: string[] = [];

  if (angle.trim()) {
    prefixArr.push(`from ${angle}`);
  }

  const posX = position.x.value;
  const posY = position.y.value;
  const pos = posX.trim() || posY.trim() ? 'at ' + `${posX} ${posY}`.trim() : '';
  if (pos) {
    prefixArr.push(pos);
  }

  if (color && color.space) {
    prefixArr.push(`in ${color.space} ${color.method || ''}`.trim());
  }

  const props: string[] = [];

  if (prefixArr.length > 0) {
    props.push(prefixArr.join(' '));
  }

  const stopsStr = stops
    .map(s => `${s.color} ${s.offset?.value ?? ''}${s.offset?.unit ?? ''}`.trim())
    .join(', ');

  props.push(stopsStr);

  return `${type}(${props.join(', ')})`;
}
