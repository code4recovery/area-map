import chevronRight from "../icons/chevron-right.svg";
import magnifyingGlass from "../icons/magnifying-glass.svg";
import mapPin from "../icons/map-pin.svg";
import minus from "../icons/minus.svg";
import plus from "../icons/plus.svg";

const color = {
  surface: "#fff",
  text: "#222",
  border: "#ccc",
};

const size = {
  icon: 20,
  input: 36,
  margin: 10,
};

const backgroundStyle = {
  backgroundColor: color.surface,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: `${size.icon}px`,
};

const inputStyle = {
  ...backgroundStyle,
  border: "0",
  borderRadius: "4px",
  color: color.text,
  fontFamily: "Roboto, Arial, sans-serif",
  fontSize: "16px",
  fontWeight: "400",
  padding: "8px",
  textAlign: "left",
  width: "100%",
};

const iconInputStyle = {
  ...inputStyle,
  paddingLeft: "44px",
  backgroundPosition: "12px center",
};

const zoomButtonStyle = {
  ...backgroundStyle,
  height: `${size.icon}px`,
  width: `${size.icon}px`,
};

export const appParentStyle = {
  alignItems: "stretch",
  display: "flex",
  height: "100%",
};

export const areaClosedStyle = {
  ...iconInputStyle,
  backgroundImage: `url(${chevronRight})`,
};

export const findMeButtonStyle = {
  ...iconInputStyle,
  backgroundImage: `url(${mapPin})`,
};

export const mapElementStyle = {
  flex: "1",
};

export const panelElementStyle = {
  display: "flex",
  flexDirection: "column",
  backgroundColor: "white",
  width: "300px",
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
  backgroundImage: `url(${magnifyingGlass})`,
};

export const zoomControlStyle = {
  ...inputStyle,
  display: "flex",
  flexDirection: "column",
  margin: `${size.margin}px`,
  width: `${size.input}px`,
  gap: "8px",
};

export const zoomInStyle = {
  ...zoomButtonStyle,
  backgroundImage: `url(${plus})`,
};

export const zoomOutStyle = {
  ...zoomButtonStyle,
  backgroundImage: `url(${minus})`,
};
