import { Loader } from "@googlemaps/js-api-loader";

import { initClick } from "./helpers/init-click";
import { initDistricts } from "./helpers/init-districts";
import { initPanel } from "./helpers/init-panel";
import { initZoomButtons } from "./helpers/init-zoom-buttons";
import { selectDistricts } from "./helpers/select-districts";
import {
  appParentStyle,
  mapElementStyle,
  panelElementStyle,
} from "./helpers/styles";
import { Area } from "./helpers/types";

(() => {
  const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE,
    libraries: ["geometry"],
  });

  loader.importLibrary("maps").then(async ({ Map }) => {
    const embedElement = document.getElementById("map");

    if (!embedElement) {
      return;
    }

    const appParent = document.createElement("div");
    Object.assign(appParent.style, appParentStyle);

    const mapElement = document.createElement("div");
    Object.assign(mapElement.style, mapElementStyle);

    const panelElement = document.createElement("div");
    Object.assign(panelElement.style, panelElementStyle);
    appParent.appendChild(panelElement);
    appParent.appendChild(mapElement);
    embedElement.appendChild(appParent);

    const map = new Map(mapElement, {
      disableDefaultUI: true,
      renderingType: google.maps.RenderingType.VECTOR,
    });

    const mapData = await fetch(
      `https://generalservice.app/storage/map.json?${new Date().getTime()}`
    );
    const areas = (await mapData.json()) as Area[];

    const marker = new google.maps.Marker({
      map,
    });

    const districts = initDistricts({ areas, map });

    initClick({ districts, map });

    const selectedArea = embedElement.hasAttribute("data-area")
      ? parseInt(embedElement.getAttribute("data-area") as string)
      : null;

    const selectedDistricts =
      areas.find(({ area }) => area === selectedArea)?.districts ?? [];

    if (selectedDistricts.length) {
      selectDistricts({ districts, map, selected: selectedDistricts });
    } else {
      map.setOptions({ center: { lat: 45, lng: -100 }, zoom: 4 });
    }

    initPanel({ areas, districts, map, marker, panelElement, selectedArea });

    initZoomButtons(map);
  });
})();
