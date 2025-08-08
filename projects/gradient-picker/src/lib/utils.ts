import { TinyColor } from '@ctrl/tinycolor';
import { ColorStop } from './parser';

/**
 * Reorder an element at a specified index by condition
 *
 * @param array The original array
 * @param index The element at this index will be checked and moved to its correct sorted location.
 * @param compareWith1 The comparison function used to determine if the element needs to move left.
 * @param compareWith2 The comparison function used to determine if the element needs to move right.
 * @returns
 */
export function reorderElementByCondition<T = any>(
  array: T[] = [],
  index = 0,
  compareWith1: (a: T, b: T) => boolean = (a, b) => a < b,
  compareWith2: (a: T, b: T) => boolean = (a, b) => a > b
): T[] {
  // Make a copy to avoid modifying the original array reference
  const newArr = [...array];

  if (index < 0 || index >= newArr.length) {
    return array;
  }

  // Now, we need to move this potentially out-of-place element
  // to its correct sorted position.
  // This is essentially an insertion sort pass for a single element.

  let i = index;

  while (i > 0 && compareWith1(newArr[i], newArr[i - 1])) {
    // Swap elements
    [newArr[i], newArr[i - 1]] = [newArr[i - 1], newArr[i]];
    i--;
  }

  while (i < newArr.length - 1 && compareWith2(newArr[i], newArr[i + 1])) {
    // Swap elements
    [newArr[i], newArr[i + 1]] = [newArr[i + 1], newArr[i]];
    i++;
  }

  return newArr;
}

/**
 * Linearly interpolate between two colors.
 *
 * @param fromColor The starting color in any format supported by TinyColor.
 * @param toColor The ending color in any format supported by TinyColor.
 * @param percentage The interpolation percentage between 0 (`fromColor`) and 1 (`toColor`)
 * @returns
 */
export function interpolateColor(fromColor: string, toColor: string, percentage = 0.5) {
  const c1 = new TinyColor(fromColor);
  const c2 = new TinyColor(toColor);

  // Convert to premultiplied alpha
  const c1_pre = {
    r: c1.r * c1.a,
    g: c1.g * c1.a,
    b: c1.b * c1.a,
    a: c1.a,
  };
  const c2_pre = {
    r: c2.r * c2.a,
    g: c2.g * c2.a,
    b: c2.b * c2.a,
    a: c2.a,
  };

  // Linearly interpolate the premultiplied RGBA components
  const interpolatedR_pre = c1_pre.r * (1 - percentage) + c2_pre.r * percentage;
  const interpolatedG_pre = c1_pre.g * (1 - percentage) + c2_pre.g * percentage;
  const interpolatedB_pre = c1_pre.b * (1 - percentage) + c2_pre.b * percentage;
  const interpolatedA = c1_pre.a * (1 - percentage) + c2_pre.a * percentage;

  // Convert back to non-premultiplied alpha format (if alpha is not 0)
  const finalR = interpolatedA > 0 ? interpolatedR_pre / interpolatedA : 0;
  const finalG = interpolatedA > 0 ? interpolatedG_pre / interpolatedA : 0;
  const finalB = interpolatedA > 0 ? interpolatedB_pre / interpolatedA : 0;

  const finalColor = new TinyColor({
    r: Math.round(finalR),
    g: Math.round(finalG),
    b: Math.round(finalB),
    a: interpolatedA,
  });

  return interpolatedA === 1 ? finalColor.toHexString() : finalColor.toRgbString();
}

/**
 * Fill undefined offset in stops.
 *
 * @param array The stops array
 * @returns
 */
export function fillUndefinedOffsets(array: ColorStop[]): ColorStop[] {
  // Ensure the start and end positions are defined.
  if (!array[0] || array[0].offset == null) {
    array[0].offset = { value: 0, unit: '%' };
  }
  if (!array[array.length - 1] || array[array.length - 1].offset == null) {
    array[array.length - 1].offset = { value: 100, unit: '%' };
  }

  array.forEach((item, index) => {
    if (item.offset != null) {
      return;
    }

    // Find the nearest defined offset to the left of the current item by using
    // findIndex to search backward from the current index.
    const startIndex = array
      .slice(0, index)
      .reverse()
      .findIndex(x => x.offset != null);
    const prevDefinedIndex = index - 1 - startIndex;
    const startOffsetValue = array[prevDefinedIndex].offset!.value;

    // Find the nearest defined offset to the right of the current item by using
    // findIndex to search forward from the current index.
    const endIndex = array.slice(index + 1).findIndex(x => x.offset != null);
    const nextDefinedIndex = index + 1 + endIndex;
    const endOffsetValue = array[nextDefinedIndex].offset!.value;

    // Calculate the number of gaps between two defined values.
    const totalGaps = nextDefinedIndex - prevDefinedIndex;
    const totalDifference = endOffsetValue - startOffsetValue;

    // Calculate the index of the current undefined value within the entire gaps.
    const gapIndex = index - prevDefinedIndex;
    const newOffsetValue = startOffsetValue + (gapIndex / totalGaps) * totalDifference;

    item.offset = { value: newOffsetValue, unit: '%' };
  });

  return array;
}

/**
 * Reverse the color stops array.
 *
 * @param stops
 * @returns
 */
export function reverseColorStops(stops: ColorStop[]) {
  return stops.reverse().map(stop => {
    if (stop.offset?.value != null) {
      stop.offset.value = 100 - stop.offset.value;
    }
    return stop;
  });
}

/**
 * Convert angle to percentage (e.g. `45deg`, `0.25turn`, `3.14rad`, `100grad`).
 *
 * @param value
 * @param unit
 * @returns
 */
export function angleToPercentage(value: number, unit: string) {
  let degrees;
  switch (unit) {
    case 'deg':
      degrees = value;
      break;
    case 'rad':
      degrees = value * (180 / Math.PI);
      break;
    case 'turn':
      degrees = value * 360;
      break;
    case 'grad':
      degrees = value * 0.9;
      break;
    default:
      return value;
  }

  // Calculate the percentage within 360 degrees and ensure the
  // percentage value is between 0 and 100.
  let percentage = (degrees / 360) * 100;

  // Handle negative values or values exceeding 360 degrees by using
  // the modulo operator to constrain the angle within [0, 360).
  if (percentage < 0) {
    percentage = (percentage % 100) + 100;
  } else if (percentage >= 100) {
    percentage = percentage % 100;
  }

  return percentage;
}

/**
 * Convert angle values in the gradient stops array to percentages.
 *
 * @param stops
 * @returns
 */
export function convertAngleToPercentage(stops: ColorStop[]) {
  return stops.map(stop => {
    if (stop.offset && stop.offset.unit !== '%') {
      const { value, unit } = stop.offset;
      stop.offset.value = angleToPercentage(value, unit);
      stop.offset.unit = '%';
    }
    return stop;
  });
}

export const angleUnits = ['deg', 'rad', 'turn', 'grad'];

export const lengthUnits = ['%', 'px', 'em', 'rem', 'vw', 'vh', 'ch'];
