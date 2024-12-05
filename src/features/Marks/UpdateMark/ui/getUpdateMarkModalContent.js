import { Button } from "#shared/ui/Button";
import { CustomSelect } from "#shared/ui/CustomSelect/index";
import {
  CinemaIcon,
  RestIcon,
  MusicIcon,
  TheatreIcon,
  BarIcon,
} from "#shared/ui/Icons/index";

/**
 * Контент модалки обновления метки
 */
export const getUpdateMarkModalContent = ({
  markInfo,
  url,
  method = "post",
  iconColor = "var(--colorBlack)",
}) => {
  return `<div class="updateModalContent" >
  <form data-js-form=${JSON.stringify({ url, method, showModalAfterSuccess: "#modalSuccess", redirectUrlAfterSuccess: "/test.html", delayBeforeRedirect: 3000 })}>
    <h3>Редактировать метку</h3>
    <p>${markInfo.title}</p>
    <div>
      <label>Комментарий пользователя
        <input type="comment" value="${markInfo.comment}" name="comment" />
      </label>
      ${CustomSelect({
        extraAttrs: [
          {
            name: "data-js-update-mark-info-select-type",
            value: markInfo.id,
          },
          {
            name: "name",
            value: "typeMark",
          },
        ],
        cfg: {
          preset: "default",
          itemSelectText: "",
          searchEnabled: false,
          choices: [
            {
              value: "Бar",
              label: "Бар",
              selected: markInfo.type === "bars",
              customProperties: {
                icon: BarIcon({ iconColor: "var(--colorRed)" }),
              },
            },
            {
              value: "Ресторан",
              label: "Ресторан",
              selected: markInfo.type === "restaurant",
              customProperties: {
                icon: RestIcon({ iconColor: "var(--colorRed)" }),
              },
            },
            {
              value: "Ночной клуб",
              label: "Ночной клуб",
              selected: markInfo.type === "trk",
              customProperties: {
                icon: MusicIcon({ iconColor: "var(--colorRed)" }),
              },
            },
            {
              value: "Театр",
              label: "Театр",
              selected: markInfo.type === "theatre",
              customProperties: {
                icon: TheatreIcon({ iconColor: "var(--colorRed)" }),
              },
            },
            {
              value: "Кино",
              label: "Кино",
              selected: markInfo.type === "cinema",
              customProperties: {
                icon: CinemaIcon({ iconColor: "var(--colorPrimary)" }),
              },
            },
          ],
        },
      })}
      ${Button({
        text: "Сохранить",
        extraAttrs: [
          {
            name: "type",
            value: "submit",
          },
        ],
      })}
    </div>
  </form>
  </div>`;
};
