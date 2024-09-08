import { selectDistricts } from "./select-districts.ts";

import { District } from "./types";

export function initClick({
  districts,
  map,
}: {
  districts: District[];
  map: google.maps.Map;
}) {
  districts.forEach((district) => {
    district.polygon?.addListener(
      "click",
      ({ latLng }: { latLng: google.maps.LatLng }) => {
        const selected = districts
          .filter(
            ({ polygon }) =>
              polygon &&
              google.maps.geometry.poly.containsLocation(latLng, polygon)
          )
          .sort((a, b) => a.area - b.area);
        selectDistricts({ map, districts, selected: [selected[0]] });
      }
    );
  });
}
