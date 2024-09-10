import { selectDistricts } from "./select-districts.ts";
import { initUserDistrict } from "./init-user-district.ts";

import chevronDown from "../icons/chevron-down.svg";
import chevronRight from "../icons/chevron-right.svg";
import magnifyingGlass from "../icons/magnifying-glass.svg";
import mapPin from "../icons/map-pin.svg";

import { Area, District } from "./types.ts";
import { strings } from "./constants.ts";
import { formatAreaName } from "./format.ts";

export function initPanel({
  areas,
  districts,
  map,
  marker,
  panelElement,
  selectedArea,
}: {
  areas: Area[];
  districts: District[];
  map: google.maps.Map;
  marker: google.maps.Marker;
  panelElement: HTMLElement;
  selectedArea: number | null;
}) {
  const form = document.createElement("form");

  const input = document.createElement("input");
  input.type = "search";
  input.placeholder = strings.search;
  input.style.backgroundImage = `url("${magnifyingGlass}")`;
  form.appendChild(input);

  form.onsubmit = (event) => {
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
  };

  panelElement.appendChild(form);

  const findMeButton = document.createElement("button");
  findMeButton.innerText = strings.findMe;
  findMeButton.style.backgroundImage = `url("${mapPin}")`;
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

  let selectedAreaButton: HTMLButtonElement | null = null;

  // create accordion of areas
  areas
    .sort((a, b) => a.area - b.area)
    .forEach((area) => {
      const areaButton = document.createElement("button");
      areaButton.innerText = formatAreaName(area);
      areaButton.style.backgroundImage = `url("${chevronRight}")`;

      if (selectedArea === area.area) {
        selectedAreaButton = areaButton;
      }

      const districtsContainer = document.createElement("div");
      districtsContainer.style.display = "none";
      area.districts.forEach((district) => {
        district.button.onclick = () =>
          selectDistricts({
            map,
            districts,
            selected: [district],
          });
        districtsContainer.appendChild(district.button);
      });

      areaButton.onclick = () => {
        // remove marker
        marker.setPosition();

        // expand accordion
        if (districtsContainer.style.display === "none") {
          areaButton.style.backgroundImage = `url("${chevronDown}")`;
          districtsContainer.style.display = "block";
          areaButton.setAttribute("aria-expanded", "true");
          panelElement.scrollTo({
            top: areaButton.offsetTop,
            behavior: "smooth",
          });
          selectDistricts({ map, districts, selected: area.districts });
          return;
        }

        // collapse accordion
        areaButton.style.backgroundImage = `url("${chevronRight}")`;
        districtsContainer.style.display = "none";
        areaButton.style.backgroundColor = "";
        areaButton.removeAttribute("aria-expanded");
        selectDistricts({ map, districts, selected: [] });
      };

      panelElement.appendChild(areaButton);
      panelElement.appendChild(districtsContainer);
    });

  // @ts-ignore
  selectedAreaButton?.click();
}
