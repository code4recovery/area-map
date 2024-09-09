import { color } from "./constants.ts";

export function initHover(element: HTMLElement) {
  element.onmouseover = () => {
    if (
      !element.hasAttribute("aria-expanded") &&
      !element.hasAttribute("aria-pressed")
    ) {
      element.style.backgroundColor = color.hover;
    }
  };
  element.onmouseout = () => {
    if (
      !element.hasAttribute("aria-expanded") &&
      !element.hasAttribute("aria-pressed")
    ) {
      element.style.backgroundColor = "";
    }
  };
}
