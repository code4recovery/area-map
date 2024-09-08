import { selectMap } from "./select-map.ts";
import { initUserDistrict } from "./init-user-district.ts";

import { Area, District } from "./types.ts";
import { searchStyle, areaClosedStyle, findMeButtonStyle } from "./styles.ts";

export function initPanel({
  areas,
  districts,
  map,
  marker,
  panelElement,
}: {
  areas: Area[];
  districts: District[];
  map: google.maps.Map;
  marker: google.maps.Marker;
  panelElement: HTMLElement;
}) {
  const form = document.createElement("form");

  console.log(areas.length);

  const input = document.createElement("input");
  input.type = "search";
  input.placeholder = "Search for an address";
  Object.assign(input.style, searchStyle);
  form.appendChild(input);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: input.value }, (results, status) => {
      if (status !== "OK" || !results) {
        alert("Address not found");
        return;
      }
      const result = results[0];
      input.value = result.formatted_address;
      map.setCenter(result.geometry.location);
      marker.setPosition(result.geometry.location);
      const myDistrict = initUserDistrict(districts, result.geometry.location);
      selectMap({ map, districts, district: myDistrict });
      input.blur();
    });
  });

  panelElement.appendChild(form);

  const findMeButton = document.createElement("button");
  findMeButton.innerText = "Find Me";
  Object.assign(findMeButton.style, findMeButtonStyle);
  findMeButton.onclick = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        marker.setPosition({ lat, lng });
        map.setCenter({ lat, lng });
        // @ts-ignore
        const myDistrict = initUserDistrict(districts, { lat, lng });
        selectMap({ map, districts, district: myDistrict });
        (document.getElementById("address_search") as HTMLInputElement).value =
          "";
      },
      () => {
        alert("Geolocation is not available");
      }
    );
  };
  panelElement.appendChild(findMeButton);

  // create option groups for areas
  areas
    .sort((a, b) => a.area - b.area)
    .forEach(({ districts, name, area }) => {
      const buttonElement = document.createElement("button");
      buttonElement.innerText = `${area.toString().padStart(2, "0")}: ${name}`;
      Object.assign(buttonElement.style, areaClosedStyle);
      panelElement.appendChild(buttonElement);
      console.log(districts);
    });
}
