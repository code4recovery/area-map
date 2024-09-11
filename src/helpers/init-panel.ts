import { selectDistricts } from "./select-districts.ts";
import { initUserDistrict } from "./init-user-district.ts";

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

  const areaList = document.createElement("ul");
  areaList.role = "tree";
  areaList.ariaLabel = "Areas";

  // create accordion of areas
  areas
    .sort((a, b) => a.area - b.area)
    .forEach((area) => {
      const areaItem = document.createElement("li");
      areaItem.role = "treeitem";
      areaItem.ariaExpanded = String(selectedArea === area.area);

      const districtList = document.createElement("ul");
      districtList.role = "group";

      area.districts.forEach((district) => {
        district.button.onclick = () =>
          selectDistricts({
            map,
            districts,
            selected: [district],
          });
        const districtItem = document.createElement("li");
        districtItem.role = "treeitem";
        districtItem.appendChild(district.button);
        districtList.appendChild(districtItem);
      });

      area.button.innerText = formatAreaName(area);
      areaItem.appendChild(area.button);
      areaItem.appendChild(districtList);

      area.button.onclick = () => {
        // remove marker
        marker.setPosition();

        // expand accordion
        if (areaItem.getAttribute("aria-expanded") === "false") {
          areaItem.setAttribute("aria-expanded", "true");
          panelElement.scrollTo({
            top: area.button.offsetTop,
            behavior: "smooth",
          });
          selectDistricts({ map, districts, selected: area.districts });
          return;
        }

        // collapse accordion
        areaItem.setAttribute("aria-expanded", "false");
        selectDistricts({ map, districts, selected: [] });
      };

      areaList.appendChild(areaItem);
    });

  panelElement.appendChild(areaList);

  // @ts-ignore
  selectedAreaButton?.click();
}
