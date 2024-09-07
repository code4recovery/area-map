import { fullScreenStyle } from "./styles";

export function initFullscreenControl(map: google.maps.Map) {
  const elementToSendFullscreen = map.getDiv().firstChild as HTMLElement;
  const fullscreenControl = document.createElement("button");
  fullscreenControl.title = "Toggle Fullscreen";
  Object.assign(fullscreenControl.style, fullScreenStyle);

  fullscreenControl.onclick = function () {
    if (elementToSendFullscreen == document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    } else {
      if (elementToSendFullscreen.requestFullscreen) {
        elementToSendFullscreen.requestFullscreen();
      }
    }
  };

  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(fullscreenControl);
}
