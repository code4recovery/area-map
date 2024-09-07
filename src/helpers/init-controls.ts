import { selectMap } from "./select-map.ts";
import { initUserDistrict } from "./init-user-district.ts";

import { Area, District } from "./types";

export function initControls(
  map: google.maps.Map,
  areas: Area[],
  districts: District[],
  marker: google.maps.Marker
) {
  // create select
  const select = document.createElement("select");
  select.id = "menu";

  // create first option
  const option = document.createElement("option");
  option.value = "";
  option.innerText = "Select a district";
  select.appendChild(option);

  // create option groups for areas
  areas
    .sort((a, b) => a.area - b.area)
    .forEach(({ districts, name, area }) => {
      const optgroup = document.createElement("optgroup");
      const areaNumber = area.toString().padStart(2, "0");
      optgroup.label = `${areaNumber} ${name}`;
      districts
        .sort((a, b) => a.district.localeCompare(b.district))
        .forEach(({ district, name }) => {
          const option = document.createElement("option");
          const districtNumber = district.toString();
          option.value = `${area}-${district}`;
          option.innerText = name
            ? `${districtNumber} ${name}`
            : `District ${districtNumber}`;
          optgroup.appendChild(option);
        });
      select.appendChild(optgroup);
    });

  // add change event listener
  select.onchange = ({ target }) => {
    const selectedDistrict = districts.find(
      ({ index }) => index === (target as HTMLSelectElement).value
    );
    selectMap(map, districts, selectedDistrict);
  };

  const button = document.createElement("button");
  button.innerText = "Find Me";
  button.onclick = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        marker.setPosition({ lat, lng });
        map.setCenter({ lat, lng });
        // @ts-ignore
        const myDistrict = initUserDistrict(districts, { lat, lng });
        selectMap(map, districts, myDistrict);
        (document.getElementById("address_search") as HTMLInputElement).value =
          "";
      },
      () => {
        alert("Geolocation is not available");
      }
    );
  };

  const input = document.createElement("input");
  input.id = "address_search";
  input.type = "search";
  input.placeholder = "Search for an address";

  const form = document.createElement("form");
  form.appendChild(input);
  form.onsubmit = (event) => {
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
      selectMap(map, districts, myDistrict);
    });
  };

  const topRow = document.createElement("div");
  topRow.id = "top-row";
  topRow.appendChild(select);
  topRow.appendChild(button);

  const controls = document.createElement("div");
  controls.id = "controls";
  controls.appendChild(topRow);
  controls.appendChild(form);

  // add select to map
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(controls);
}
