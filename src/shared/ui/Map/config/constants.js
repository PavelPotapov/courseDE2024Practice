import {
  BarIcon,
  CenterMapIcon,
  CinemaIcon,
  MusicIcon,
  RestIcon,
  TheatreIcon,
} from "#shared/ui/Icons/index.js";

export const classNames = {
  ballonContent: "yandexMap__ballonContent",
  ballonLayout: "yandexMap__ballonLayout",
  mark: "yandexMap__mark",
  centerMarker: "yandexMap__centerMarker",
};

export const iconShapeCfg = {
  type: "Circle",
  coordinates: [0, 0],
  radius: 50,
};

export const iconsPresets = {
  ["bars"]: BarIcon({ iconColor: "var(--colorRed)" }),
  ["cinema"]: CinemaIcon({ iconColor: "var(--colorRed)" }),
  ["theatre"]: TheatreIcon({ iconColor: "var(--colorRed)" }),
  ["restaurant"]: RestIcon({ iconColor: "var(--colorRed)" }),
  ["trk"]: MusicIcon({ iconColor: "var(--colorRed)" }),
  centerMarker: CenterMapIcon({ iconColor: "var(--colorGray)" }),
};

export const yandexMapCustomEventNames = {
  markClicked: "yandexMap::markClicked",
};
