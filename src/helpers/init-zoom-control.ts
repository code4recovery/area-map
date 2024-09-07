import { zoomControlStyle, zoomInStyle, zoomOutStyle } from "./styles";

export function initZoomControl(map: google.maps.Map) {
  const zoomControlIn = document.createElement("button");
  zoomControlIn.title = "Zoom In";
  Object.assign(zoomControlIn.style, zoomInStyle);

  zoomControlIn.onclick = function () {
    map.setZoom(map.getZoom()! + 1);
  };

  const zoomControlOut = document.createElement("button");
  zoomControlOut.title = "Zoom Out";
  Object.assign(zoomControlOut.style, zoomOutStyle);

  zoomControlOut.onclick = function () {
    map.setZoom(map.getZoom()! - 1);
  };

  const zoomControl = document.createElement("div");
  zoomControl.role = "group";
  Object.assign(zoomControl.style, zoomControlStyle);
  zoomControl.appendChild(zoomControlIn);
  zoomControl.appendChild(zoomControlOut);

  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(zoomControl);
}
