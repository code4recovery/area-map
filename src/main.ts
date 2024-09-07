import "./style.css";

import { Loader } from "@googlemaps/js-api-loader";

import { initClick } from "./helpers/init-click";
import { initControls } from "./helpers/init-controls";
import { initDistricts } from "./helpers/init-districts";
import { selectMap } from "./helpers/select-map";

function main() {
  const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE,
    version: "weekly",
  });

  loader.load().then(async () => {
    const { Map } = (await google.maps.importLibrary(
      "maps"
    )) as google.maps.MapsLibrary;

    await google.maps.importLibrary("geometry");

    const map = new Map(document.getElementById("map") as HTMLElement, {
      center: { lat: 45, lng: -100 },
      zoom: 4,
      mapTypeControl: false,
      streetViewControl: false,
      mapId: "d4e3a17e37ca67aa", //import.meta.env.VITE_MAP_ID,
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

    initControls(map, areas, districts, marker);
  });
}

main();
