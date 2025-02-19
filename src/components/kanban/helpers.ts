import { Active, Over } from "@dnd-kit/core";

export const hasDraggableData = (entry: Active | Over) =>
  entry?.data?.current?.type === "column" ||
  entry?.data?.current?.type === "item";

/**
 * Checks whether a drag event is valid based on the provided active and over states.
 *
 * A drag event is considered valid if:
 * - The `over` state is not null.
 * - The `over` element has associated data.
 * - The `over` element's ID does not match the `active` element's ID.
 *
 * @param active - The current active drag item in the DnD Kit.
 * @param over - The element that the active item is being dragged over, or null if no element is being hovered.
 * @returns `true` if the drag event is valid, otherwise `false`.
 */
export const isValidDragEvent = (
  active: Active,
  over: Over | null
): boolean => {
  if (!over || !over.data.current || over.id === active.id) return false;
  return hasDraggableData(active);
};

export const findItemStatus = <T extends { id: string | number }[]>(
  groups: Record<string, T>,
  itemId: string
) => {
  return Object.keys(groups).find((status) =>
    groups[status].some((vac) => String(vac.id) === itemId)
  );
};
