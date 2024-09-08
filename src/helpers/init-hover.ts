import { color } from "../constants.ts";

export function initHover(element: HTMLElement) {
  element.addEventListener("mouseover", () => {
    element.style.backgroundColor = color.hover;
  });
  element.addEventListener("mouseout", () => {
    element.style.backgroundColor = "";
  });
}
