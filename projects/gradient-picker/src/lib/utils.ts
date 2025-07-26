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
