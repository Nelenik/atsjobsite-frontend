/**
 * Sorts an array of objects based on a custom order of IDs.
 *
 * - Items with IDs present in the `order` array are sorted according to that order.
 * - Items **not** in the `order` are placed **at the beginning** of the result (e.g., newly added).
 *
 * @template T - Item type, must include a numeric `id` property.
 * @param {T[]} array - The original array of items to sort.
 * @param {number[]} order - Array of item IDs representing the desired order.
 * @returns {T[]} - New sorted array without mutating the original.
 *
 * @example
 * const data = [{ id: 3 }, { id: 1 }, { id: 2 }];
 * const order = [1, 2];
 * const sorted = syncByOrder(data, order);
 * // Result: [{ id: 3 }, { id: 1 }, { id: 2 }] — id 3 is new and goes first
 */
export const syncByOrder = <T extends { id: number }>(
  array: T[],
  order: number[]
) =>
  array.toSorted((a: T, b: T) => {
    const indexA = order.indexOf(a.id);
    const indexB = order.indexOf(b.id);
    return indexA - indexB;
  });
