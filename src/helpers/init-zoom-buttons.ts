import { initHover } from "./init-hover";
import { zoomControlStyle, zoomInStyle, zoomOutStyle } from "./styles";

export function initZoomButtons(map: google.maps.Map) {
  const zoomControlIn = document.createElement("button");
  zoomControlIn.title = "Zoom In";
  Object.assign(zoomControlIn.style, zoomInStyle);
  initHover(zoomControlIn);

  zoomControlIn.onclick = function () {
    map.setZoom(map.getZoom()! + 1);
  };

  const zoomControlOut = document.createElement("button");
  zoomControlOut.title = "Zoom Out";
  Object.assign(zoomControlOut.style, zoomOutStyle);
  initHover(zoomControlOut);

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
