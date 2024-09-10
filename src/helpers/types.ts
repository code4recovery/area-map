export type Area = {
  area: number;
  name: string;
  website: string;
  districts: District[];
};

export type District = {
  id: number;
  district: string;
  name: string | null;
  description: string | null;
  website: string | null;
  language: "en" | "es" | "fr";
  color: string;
  boundary: [number, number][];

  // added in init-districts.ts
  button: HTMLButtonElement;
  polygon: google.maps.Polygon;
  bounds: google.maps.LatLngBounds;
  surfaceArea: number;
};
