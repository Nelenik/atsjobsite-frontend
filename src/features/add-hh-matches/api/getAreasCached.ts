"use server";

import { cache } from "react";

export type Area = {
  id: string;
  name: string;
  parent_id: string | null;
  areas?: Area[];
};

// Cache the areas data and traverse to create a map for quick lookup
export const getAreasCached = cache(async (): Promise<Map<string, Area>> => {
  const res = await fetch("https://api.hh.ru/areas", {
    // next: {
    //   revalidate: 86400,
    // },
  });
  const data: Area[] = await res.json();

  const map = new Map<string, Area>();
  /**
   * this function traverses the areas tree and adds areas to the map. For the first 2 levels of the tree, it also keeps the nested areas in the map to avoid additional lookups when fetching child areas. For deeper levels, it only adds the area itself to the map without nested areas to save memory, as we won't need to fetch child areas for those levels.
   * @param nodes
   * @param level
   */
  const traverse = (nodes: Area[], level = 0) => {
    nodes.forEach((node) => {
      const { areas, ...nodeRest } = node;
      if (level < 2) {
        map.set(node.id, {
          ...nodeRest,
          areas: areas?.map((area) => {
            return { id: area.id, name: area.name, parent_id: area.parent_id };
          }),
        });
        traverse(node.areas || [], level + 1);
      } else {
        map.set(node.id, { ...nodeRest });
      }
    });
  };
  traverse(data);
  return map;
});
