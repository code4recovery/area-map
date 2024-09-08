import { polygonDefaultStyle, polygonSelectedStyle } from "./styles.ts";

import { District } from "./types.ts";

export function selectDistricts({
  selected,
  districts,
  map,
}: {
  selected: District[];
  districts: District[];
  map: google.maps.Map;
}) {
  const menu = document.getElementById("menu") as HTMLSelectElement | null;

  if (!selected.length) {
    map.setCenter({ lat: 48, lng: -100 });
    map.setZoom(4);
    if (menu) {
      menu.value = "";
    }

    return;
  }

  // reset all districts
  districts.forEach((district) => {
    district.polygon?.setOptions(polygonDefaultStyle);
  });

  // set selected districts
  const bounds = new google.maps.LatLngBounds();
  selected.forEach((district) => {
    district.polygon?.setOptions(polygonSelectedStyle);
    bounds.union(district.bounds);
  });

  map.fitBounds(bounds);
}
