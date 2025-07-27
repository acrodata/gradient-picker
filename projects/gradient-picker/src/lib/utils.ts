import { TinyColor } from '@ctrl/tinycolor';

/**
 * Reorders an element at a specified index
 *
 * @param array The original array
 * @param index The element at this index will be checked and moved to its correct sorted location.
 * @param compareWith1 The comparison function used to determine if the element needs to move left.
 * @param compareWith2 The comparison function used to determine if the element needs to move right.
 * @returns
 */
export function reorderArrayElement<T = any>(
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
