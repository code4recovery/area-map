import { Loader } from "@googlemaps/js-api-loader";

import { Area } from "./helpers/types";
import { initApp } from "./helpers/init-app";
import { initClick } from "./helpers/init-click";
import { initDistricts } from "./helpers/init-districts";
import { initPanel } from "./helpers/init-panel";
import { initZoomButtons } from "./helpers/init-zoom-buttons";
import { selectDistricts } from "./helpers/select-districts";

(async () => {
  const { mapElement, panelElement, selectedArea } = initApp();

  const { Map } = await new Loader({
    apiKey: import.meta.env.VITE_GOOGLE,
    libraries: ["geometry"],
  }).importLibrary("maps");

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

  const selectedDistricts =
    areas.find(({ area }) => area === selectedArea)?.districts ?? [];

  if (selectedDistricts.length) {
    selectDistricts({ districts, map, selected: selectedDistricts });
  } else {
    map.setOptions({ center: { lat: 45, lng: -100 }, zoom: 4 });
  }

  initPanel({ areas, districts, map, marker, panelElement, selectedArea });

  initZoomButtons(map);
})();
