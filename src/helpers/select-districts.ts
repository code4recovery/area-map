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
  // reset all districts
  districts.forEach((district) => {
    district.polygon?.setOptions(polygonDefaultStyle);
  });

  // reset map if no districts selected
  if (!selected.length) {
    map.setCenter({ lat: 48, lng: -100 });
    map.setZoom(4);
    return;
  }

  // set selected districts
  const bounds = new google.maps.LatLngBounds();
  selected.forEach((district) => {
    district.polygon?.setOptions(polygonSelectedStyle);
    bounds.union(district.bounds);
  });

  map.fitBounds(bounds);
}
