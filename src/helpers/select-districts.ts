import {
  iconInputStyle,
  polygonDefaultStyle,
  polygonSelectedStyle,
  selectedIconInputStyle,
} from "./styles.ts";

import { District } from "./types.ts";

export function selectDistricts({
  districts,
  map,
  selected,
}: {
  districts: District[];
  map: google.maps.Map;
  selected: District[];
}) {
  // reset all districts
  districts
    .filter((district) => !selected.includes(district))
    .forEach((district) => {
      district.polygon?.setOptions(polygonDefaultStyle);
      Object.assign(district.button.style, iconInputStyle);
      district.button.removeAttribute("aria-pressed");
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
    Object.assign(district.button.style, selectedIconInputStyle);
    district.button.setAttribute("aria-pressed", "true");
    bounds.union(district.bounds);
  });

  map.fitBounds(bounds);
}
