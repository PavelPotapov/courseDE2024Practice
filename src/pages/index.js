import { PlaceSwitchGroup } from "#features/PlaceSwitchGroup";
import { Button } from "#shared/ui/Button/index";
import { CustomSelect } from "#shared/ui/CustomSelect/index";
import {
  CheckIcon,
  CancelIcon,
  BarIcon,
  CinemaIcon,
  RestIcon,
  MusicIcon,
  TheatreIcon,
} from "#shared/ui/Icons/index";
import { Switch } from "#shared/ui/Switch/index";

/**
 * Страница приложения
 * @return {string}
 */
const IndexPage = () => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Home Page</title>
    </head>
    <body>
      <header>
        <h1>Welcome to the Home Page</h1>
      </header>
      <main>
        <p>Hello world! 12</p>
        <div class="isFlex mb16 gap8">
          ${Button({ text: "Да", iconSlot: CheckIcon(), extraClasses: ["btn--isGreenLightIcon"] })}
          ${Button({ text: "Нет", iconSlot: CancelIcon(), extraClasses: ["btn--isRedIcon"] })}
        </div>
        <div class="isFlex mb16 gap8">
          ${Switch({
            label: "Привет мир",
            extraInputAttrs: [
              { name: "name", value: "rememberMe" },
              { name: "form", value: "formAuth" },
            ],
          })}
          
          ${Switch({
            label: "Привет мир",
            extraClasses: ["switch--isRightLabel"],
            extraInputAttrs: [
              { name: "name", value: "rememberMe" },
              { name: "form", value: "formAuth" },
              { name: "checked", value: "true" },
            ],
          })}
        </div>

        <div style="max-width: 279px">
          ${CustomSelect({
            extraAttrs: [{ name: "id", value: "select-type-mark" }],
            cfg: {
              preset: "default",
              itemSelectText: "",
              searchEnabled: false,
              choices: [
                {
                  value: "Ресторан",
                  label: "Ресторан",
                  selected: true,
                  customProperties: {
                    icon: RestIcon({ iconColor: "var(--colorRed)" }),
                  },
                },
                {
                  value: "Ночной клуб",
                  label: "Ночной клуб",
                  selected: false,
                  customProperties: {
                    icon: MusicIcon({ iconColor: "var(--colorRed)" }),
                  },
                },
                {
                  value: "Театр",
                  label: "Театр",
                  selected: false,
                  customProperties: {
                    icon: TheatreIcon({ iconColor: "var(--colorRed)" }),
                  },
                },
                {
                  value: "Кино",
                  label: "Кино",
                  selected: false,
                  customProperties: {
                    icon: CinemaIcon({ iconColor: "var(--colorPrimary)" }),
                  },
                },
                {
                  value: "Бар",
                  label: "Бар",
                  selected: false,
                  customProperties: {
                    icon: BarIcon({ iconColor: "var(--colorRed)" }),
                  },
                },
              ],
            },
          })}

          ${CustomSelect({
            extraAttrs: [{ name: "id", value: "select-type-mark" }],
            cfg: {
              preset: "fancy",
              itemSelectText: "",
              searchEnabled: false,
              choices: [
                {
                  value: "Ресторан",
                  label: "Ресторан",
                  selected: true,
                  customProperties: {
                    icon: RestIcon({ iconColor: "var(--colorRed)" }),
                  },
                },
                {
                  value: "Ночной клуб",
                  label: "Ночной клуб",
                  selected: false,
                  customProperties: {
                    icon: MusicIcon({ iconColor: "var(--colorRed)" }),
                  },
                },
                {
                  value: "Театр",
                  label: "Театр",
                  selected: false,
                  customProperties: {
                    icon: TheatreIcon({ iconColor: "var(--colorRed)" }),
                  },
                },
                {
                  value: "Кино",
                  label: "Кино",
                  selected: false,
                  customProperties: {
                    icon: CinemaIcon({ iconColor: "var(--colorPrimary)" }),
                  },
                },
                {
                  value: "Бар",
                  label: "Бар",
                  selected: false,
                  customProperties: {
                    icon: BarIcon({ iconColor: "var(--colorRed)" }),
                  },
                },
              ],
            },
          })}
        </div>
        ${PlaceSwitchGroup()}
        <div id="map1" class="yandexMap" style="width: 800px; aspect-ratio: 1 / 1"></div>
      </main>
    </body>
  </html>
`;

export default IndexPage;
