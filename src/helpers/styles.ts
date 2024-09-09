import { color, size } from "./constants";

import chevronDown from "../icons/chevron-down.svg";
import chevronRight from "../icons/chevron-right.svg";
import magnifyingGlass from "../icons/magnifying-glass.svg";
import mapPin from "../icons/map-pin.svg";
import minus from "../icons/minus.svg";
import plus from "../icons/plus.svg";

const backgroundStyle = {
  backgroundColor: color.surface,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: `${size.icon}px`,
};

const inputStyle = {
  ...backgroundStyle,
  border: "0",
  color: color.text,
  fontFamily: "ui-sans-serif, system-ui, sans-serif",
  fontSize: "16px",
  fontWeight: "400",
  padding: "8px",
  textAlign: "left",
  width: "100%",
};

export const iconInputStyle = {
  ...inputStyle,
  backgroundPosition: "12px center",
  borderBottom: `1px solid ${color.hover}`,
  paddingLeft: "40px",
  paddingRight: "16px",
  width: "100%",
};

export const selectedIconInputStyle = {
  ...iconInputStyle,
  backgroundColor: color.hover,
};

export const appParentStyle = {
  alignItems: "stretch",
  display: "flex",
  height: "100%",
};

export const areaClosedStyle = {
  ...iconInputStyle,
  backgroundImage: `url("${chevronRight}")`,
};

export const areaOpenStyle = {
  ...iconInputStyle,
  backgroundImage: `url("${chevronDown}")`,
  backgroundColor: color.hover,
};

export const findMeButtonStyle = {
  ...iconInputStyle,
  backgroundImage: `url("${mapPin}")`,
};

export const mapElementStyle = {
  flex: "1",
};

export const panelElementStyle = {
  backgroundColor: color.surface,
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
  position: "relative",
  width: `${size.panelWidth}px`,
};

export const polygonDefaultStyle = {
  fillOpacity: 0.1,
  strokeOpacity: 0.3,
  strokeWeight: 1,
  zIndex: 1,
};

export const polygonSelectedStyle = {
  fillOpacity: 0.35,
  strokeOpacity: 1,
  strokeWeight: 4,
  zIndex: 1000,
};

export const searchStyle = {
  ...iconInputStyle,
  backgroundImage: `url("${magnifyingGlass}")`,
};

const zoomButtonStyle = {
  ...backgroundStyle,
  height: `${size.input}px`,
  width: `${size.input}px`,
};

export const zoomControlStyle = {
  ...inputStyle,
  borderRadius: "4px",
  display: "grid",
  margin: `${size.margin}px`,
  overflow: "hidden",
  padding: 0,
  width: `${size.input}px`,
};

export const zoomInStyle = {
  ...zoomButtonStyle,
  backgroundImage: `url("${plus}")`,
};

export const zoomOutStyle = {
  ...zoomButtonStyle,
  backgroundImage: `url("${minus}")`,
};
