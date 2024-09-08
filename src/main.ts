import { Loader } from "@googlemaps/js-api-loader";

import { initClick } from "./helpers/init-click";
import { initDistricts } from "./helpers/init-districts";
import { initPanel } from "./helpers/init-panel";
import { initZoomButtons } from "./helpers/init-zoom-buttons";
import { selectMap } from "./helpers/select-map";
import {
  appParentStyle,
  mapElementStyle,
  panelElementStyle,
} from "./helpers/styles";

(() => {
  const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE,
    libraries: ["geometry"],
  });

  loader.importLibrary("maps").then(async ({ Map }) => {
    const appParent = document.createElement("div");
    Object.assign(appParent.style, appParentStyle);

    const mapElement = document.createElement("div");
    Object.assign(mapElement.style, mapElementStyle);

    const panelElement = document.createElement("div");
    Object.assign(panelElement.style, panelElementStyle);
    appParent.appendChild(panelElement);
    appParent.appendChild(mapElement);
    document.getElementById("map")?.appendChild(appParent);

    const map = new Map(mapElement, {
      center: { lat: 45, lng: -100 },
      disableDefaultUI: true,
      zoom: 4,
    });

    const mapData = await fetch(
      `https://generalservice.app/storage/map.json?${new Date().getTime()}`
    );
    const areas = await mapData.json();

    const marker = new google.maps.Marker({
      map,
    });

    const districts = initDistricts({ areas, map });

    initClick({ districts, map });

    selectMap({ districts, map });

    initPanel({ areas, districts, map, marker, panelElement });

    initZoomButtons(map);
  });
})();
