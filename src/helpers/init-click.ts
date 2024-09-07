import { selectMap } from "./select-map.ts";

import { District } from "./types";

export function initClick(map: google.maps.Map, districts: District[]) {
  districts.forEach((district) => {
    district.polygon?.addListener(
      "click",
      ({ latLng }: { latLng: google.maps.LatLng }) => {
        const clickedDistricts = districts
          .filter(
            ({ polygon }) =>
              polygon &&
              google.maps.geometry.poly.containsLocation(latLng, polygon)
          )
          .sort((a, b) => a.area - b.area);
        selectMap(map, districts, clickedDistricts[0]);
      }
    );
  });
}
