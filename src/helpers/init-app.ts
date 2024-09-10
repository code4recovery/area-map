export function initApp() {
  const embedElement = document.getElementById("map");

  if (!embedElement) {
    throw Error("No map element found");
  }

  const mapElement = document.createElement("main");

  const panelElement = document.createElement("aside");
  Object.assign(panelElement.style);
  embedElement.appendChild(panelElement);
  embedElement.appendChild(mapElement);

  const selectedArea = embedElement.hasAttribute("data-area")
    ? parseInt(embedElement.getAttribute("data-area") as string)
    : null;

  return { mapElement, panelElement, selectedArea };
}
