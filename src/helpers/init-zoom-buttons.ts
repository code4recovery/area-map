import minus from "../icons/minus.svg";
import plus from "../icons/plus.svg";

export function initZoomButtons(map: google.maps.Map) {
  const zoomControlIn = document.createElement("button");
  zoomControlIn.title = "Zoom In";
  zoomControlIn.style.backgroundImage = `url("${plus}")`;

  zoomControlIn.onclick = function () {
    map.setZoom(map.getZoom()! + 1);
  };

  const zoomControlOut = document.createElement("button");
  zoomControlOut.title = "Zoom Out";
  zoomControlOut.style.backgroundImage = `url("${minus}")`;

  zoomControlOut.onclick = function () {
    map.setZoom(map.getZoom()! - 1);
  };

  const zoomControl = document.createElement("div");
  zoomControl.role = "group";
  zoomControl.appendChild(zoomControlIn);
  zoomControl.appendChild(zoomControlOut);

  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(zoomControl);
}
