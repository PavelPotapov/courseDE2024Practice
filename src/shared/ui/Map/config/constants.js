import { BarIcon, CenterMapIcon } from "#shared/ui/Icons/index.js";

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
  ["1"]: BarIcon({ iconColor: "var(--colorRed)" }),
  ["2"]: BarIcon({ iconColor: "var(--colorRed)" }),
  ["3"]: BarIcon({ iconColor: "var(--colorRed)" }),
  ["4"]: BarIcon({ iconColor: "var(--colorRed)" }),
  ["5"]: BarIcon({ iconColor: "var(--colorRed)" }),
  centerMarker: CenterMapIcon({ iconColor: "var(--colorGray)" }),
};

export const yandexMapCustomEventNames = {
  markClicked: "yandexMap::markClicked",
};
