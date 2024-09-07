import { District } from "./types";

export function initUserDistrict(
  districts: District[],
  userPosition: google.maps.LatLng
) {
  const containingDistricts = districts.filter(
    ({ polygon }) =>
      polygon &&
      google.maps.geometry.poly.containsLocation(userPosition, polygon)
  );
  if (!containingDistricts.length) {
    return null;
  }
  if (containingDistricts.length > 1) {
    const userLanguage = navigator.language.split("-")[0];
    const languageDistrict = containingDistricts.find(
      ({ language }) => language === userLanguage
    );
    if (languageDistrict) {
      return languageDistrict;
    }
  }
  return containingDistricts[0];
}
