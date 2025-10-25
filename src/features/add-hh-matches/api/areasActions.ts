"use server";

import { Area, getAreasCached } from "./getAreasCached";

export const getAreas = async (parentId: string | null) => {
  const areasMap = await getAreasCached();
  if (parentId) {
    const parentArea = areasMap.get(parentId);
    return parentArea
      ? parentArea.areas?.sort((a, b) => Number(a.id) - Number(b.id))
      : [];
  } else {
    return Array.from(areasMap.values()).filter(
      (area) => area.parent_id === null
    );
  }
};

export const getAreasByIdsList = async (ids: string[]) => {
  const areasMap = await getAreasCached();
  const areasList: Area[] = ids
    .map((id) => areasMap.get(id))
    .filter(Boolean) as Area[];
  return areasList;
};

// export const getRootAreas = async () => {
//   const areasMap = await getAreasCached();
//   const rootAreas = [];
//   for (const area of areasMap.values()) {
//     if (area.parent_id === null) {
//       rootAreas.push(area);
//     }
//   }
//   return rootAreas;
// };

// export const getChildAreasByParentId = async (parentId: string) => {
//   const areasMap = await getAreasCached();
//   const parentArea = areasMap.get(parentId);
//   return parentArea ?? [];
// };
