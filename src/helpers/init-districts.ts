import { formatDistrictName } from "./format.ts";
import { polygonDefaultStyle } from "./styles.ts";

import { Area } from "./types";

export function initDistricts({
  areas,
  map,
}: {
  areas: Area[];
  map: google.maps.Map;
}) {
  return areas
    .map((area) =>
      area.districts.map((district) => {
        const paths = district.boundary.map(([lng, lat]) => ({
          lat,
          lng,
        }));

        district.polygon = new google.maps.Polygon({
          ...polygonDefaultStyle,
          paths,
          fillColor: district.color,
          strokeColor: district.color,
        });

        // create button (set click event in init-panel.ts)
        district.button = document.createElement("button");
        district.button.innerText = formatDistrictName(district);

        district.description?.split("\n").forEach((line) => {
          const p = document.createElement("p");
          p.innerText = line;
          district.button.appendChild(p);
        });

        district.surfaceArea =
          google.maps.geometry.spherical.computeArea(paths);

        district.bounds = paths.reduce((bounds, { lat, lng }) => {
          bounds.extend(new google.maps.LatLng(lat, lng));
          return bounds;
        }, new google.maps.LatLngBounds());

        district.polygon.setMap(map);

        return district;
      })
    )
    .flat();
}
