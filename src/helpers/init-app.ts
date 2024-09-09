import { appParentStyle, mapElementStyle, panelElementStyle } from "./styles";

export function initApp() {
  const embedElement = document.getElementById("map");

  if (!embedElement) {
    throw Error("No map element found");
  }

  const appParent = document.createElement("div");
  Object.assign(appParent.style, appParentStyle);

  const mapElement = document.createElement("div");
  Object.assign(mapElement.style, mapElementStyle);

  const panelElement = document.createElement("div");
  Object.assign(panelElement.style, panelElementStyle);
  appParent.appendChild(panelElement);
  appParent.appendChild(mapElement);
  embedElement.appendChild(appParent);

  const selectedArea = embedElement.hasAttribute("data-area")
    ? parseInt(embedElement.getAttribute("data-area") as string)
    : null;

  return { mapElement, panelElement, selectedArea };
}
