import "./style.css";

import { Loader } from "@googlemaps/js-api-loader";

function main() {
  const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE,
    version: "weekly",
  });

  loader.load().then(async () => {
    const { Map } = (await google.maps.importLibrary(
      "maps"
    )) as google.maps.MapsLibrary;

    new Map(document.getElementById("map") as HTMLElement, {
      center: { lat: 45, lng: -100 },
      zoom: 4,
      mapTypeControl: false,
      streetViewControl: false,
    });
  });
}

main();
