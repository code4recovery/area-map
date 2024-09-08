import { polygonDefaultStyle, polygonSelectedStyle } from "./styles.ts";

import { District } from "./types.ts";

export function selectMap({
  district,
  districts,
  map,
}: {
  district?: District | null;
  districts: District[];
  map: google.maps.Map;
}) {
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
    district.polygon?.setOptions(polygonDefaultStyle);
  });
  district.polygon?.setOptions(polygonSelectedStyle);

  if (menu && district.index) {
    menu.value = district.index;
  }

  map.fitBounds(district.bounds);
}
