import { Loader } from "@googlemaps/js-api-loader";

import { initClick } from "./helpers/init-click";
import { initSearch } from "./helpers/init-search";
import { initDistricts } from "./helpers/init-districts";
import { selectMap } from "./helpers/select-map";
import { initFullscreenControl } from "./helpers/init-fullscreen-control";
import { initZoomControl } from "./helpers/init-zoom-control";

(() => {
  const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE,
    libraries: ["geometry"],
  });

  loader.importLibrary("maps").then(async ({ Map }) => {
    const map = new Map(document.getElementById("map") as HTMLElement, {
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

    const districts = initDistricts(map, areas);

    initClick(map, districts);

    selectMap(map, districts);

    initSearch(map, areas, districts, marker);

    initFullscreenControl(map);

    initZoomControl(map);
  });
})();
