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

export const defaultPolygonStyle = {
  fillOpacity: 0.1,
  strokeOpacity: 0.3,
  strokeWeight: 1,
  zIndex: 1,
};

export const selectedPolygonStyle = {
  fillOpacity: 0.35,
  strokeOpacity: 1,
  strokeWeight: 4,
  zIndex: 1000,
};

export const controlsStyle = {
  width: `calc(100% - ${size.margin * 2}px)`,
  maxWidth: "360px",
};

const backgroundStyle = {
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: `${size.icon}px`,
};

const inputStyle = {
  ...backgroundStyle,
  backgroundColor: color.surface,
  border: "0",
  borderRadius: "4px",
  boxShadow: `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px`,
  color: color.text,
  fontFamily: "Roboto, Arial, sans-serif",
  fontSize: "16px",
  fontWeight: "400",
  outline: "none",
  margin: `${size.margin}px`,
  padding: "8px",
};

export const fullScreenStyle = {
  ...inputStyle,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15' /%3E%3C/svg%3E%0A")`,
  height: `${size.input}px`,
  width: `${size.input}px`,
};

export const searchStyle = {
  ...inputStyle,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z' /%3E%3C/svg%3E%0A")`,
  backgroundPosition: "12px center",
  boxSizing: "border-box",
  height: `${size.input}px`,
  padding: "8px 16px 8px 44px",
  width: "100%",
};

const zoomStyle = {
  ...backgroundStyle,
  width: `${size.icon}px`,
  height: `${size.icon}px`,
};

export const zoomInStyle = {
  ...zoomStyle,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='size-6'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M12 4.5v15m7.5-7.5h-15' /%3E%3C/svg%3E%0A")`,
};

export const zoomOutStyle = {
  ...zoomStyle,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='size-6'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M5 12h14' /%3E%3C/svg%3E%0A")`,
};

export const zoomControlStyle = {
  ...inputStyle,
  display: "flex",
  flexDirection: "column",
  width: `${size.input}px`,
  gap: "8px",
};
