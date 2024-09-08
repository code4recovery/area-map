import { selectDistricts } from "./select-districts.ts";
import { initUserDistrict } from "./init-user-district.ts";

import { Area, District } from "./types.ts";
import { searchStyle, areaClosedStyle, findMeButtonStyle } from "./styles.ts";
import { initHover } from "./init-hover.ts";
import { strings } from "../constants.ts";

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

  const input = document.createElement("input");
  input.type = "search";
  input.placeholder = strings.search;
  Object.assign(input.style, searchStyle);
  form.appendChild(input);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: input.value }, (results, status) => {
      if (status !== "OK" || !results) {
        alert(strings.errorGeocoding);
        return;
      }
      const result = results[0];
      input.value = result.formatted_address;
      map.panTo(result.geometry.location);
      marker.setPosition(result.geometry.location);
      const myDistrict = initUserDistrict(districts, result.geometry.location);
      selectDistricts({
        map,
        districts,
        selected: myDistrict ? [myDistrict] : [],
      });
      input.blur();
    });
  });

  panelElement.appendChild(form);

  const findMeButton = document.createElement("button");
  findMeButton.innerText = strings.findMe;
  Object.assign(findMeButton.style, findMeButtonStyle);
  findMeButton.onclick = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        marker.setPosition({ lat, lng });
        map.panTo({ lat, lng });
        // @ts-ignore
        const myDistrict = initUserDistrict(districts, { lat, lng });
        selectDistricts({
          map,
          districts,
          selected: myDistrict ? [myDistrict] : [],
        });
        (document.getElementById("address_search") as HTMLInputElement).value =
          "";
      },
      () => alert(strings.errorGeolocation)
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
      initHover(buttonElement);
      panelElement.appendChild(buttonElement);
      console.log(districts);
    });
}
