import { LinearGradientResult, LinearOrientation } from './type';
import { resolveColorInterp, resolveStops, split, splitByColorInterp } from './utils';

function normalizeDirectionalValue(v: string) {
  v = v.trim().replace(/\s+/g, ' ');
  const map: Record<string, string> = {
    'left top': 'top left',
    'right top': 'top right',
    'left bottom': 'bottom left',
    'right bottom': 'bottom right',
  };
  return map[v] || v;
}

function resolveLinearOrientation(angle: string): LinearOrientation | null {
  if (angle.startsWith('to ')) {
    return {
      type: 'directional',
      value: normalizeDirectionalValue(angle.replace('to ', '')),
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

  const [, repeating, props] = input
    .replace(/[\n\t]/g, '')
    .match(/(repeating-)?linear-gradient\((.+)\)/)!;
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

  const stopsStr = stops
    .map(s => `${s.color} ${s.offset?.value ?? ''}${s.offset?.unit ?? ''}`.trim())
    .join(', ');

  props.push(stopsStr);

  return `${type}(${props.join(', ')})`;
}
