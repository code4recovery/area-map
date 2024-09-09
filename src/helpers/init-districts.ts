import { formatDistrictName } from "./format.ts";
import { initHover } from "./init-hover.ts";
import { iconInputStyle, polygonDefaultStyle } from "./styles.ts";

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
        district.index = `${area.area}-${district.district}`;

        district.paths = district.boundary.map(([lng, lat]) => ({
          lat,
          lng,
        }));

        district.polygon = new google.maps.Polygon({
          ...polygonDefaultStyle,
          paths: district.paths,
          fillColor: district.color,
          strokeColor: district.color,
        });

        // create button (set click event in init-panel.ts)
        district.button = document.createElement("button");
        district.button.innerText = formatDistrictName(district);
        Object.assign(district.button.style, iconInputStyle);
        initHover(district.button);

        district.surfaceArea = google.maps.geometry.spherical.computeArea(
          district.paths
        );

        district.bounds = district.paths.reduce((bounds, { lat, lng }) => {
          bounds.extend(new google.maps.LatLng(lat, lng));
          return bounds;
        }, new google.maps.LatLngBounds());

        district.polygon.setMap(map);

        return district;
      })
    )
    .flat();
}
