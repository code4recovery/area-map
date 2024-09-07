import { defaultPolygonStyle, selectedPolygonStyle } from "./styles.ts";

import { District } from "./types";

export function selectMap(
  map: google.maps.Map,
  districts: District[],
  district?: District | null
) {
  const menu = document.getElementById("menu") as HTMLSelectElement | null;

  if (!district) {
    map.setCenter({ lat: 48, lng: -100 });
    map.setZoom(4);
    if (menu) {
      menu.value = "";
    }

    return;
  }
  districts.forEach((district) => {
    district.polygon?.setOptions(defaultPolygonStyle);
  });
  district.polygon?.setOptions(selectedPolygonStyle);

  if (menu && district.index) {
    menu.value = district.index;
  }

  map.fitBounds(district.bounds);
}
