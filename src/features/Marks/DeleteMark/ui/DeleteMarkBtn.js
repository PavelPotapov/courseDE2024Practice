import { Button } from "#shared/ui/Button";
import { DeleteIcon } from "#shared/ui/Icons";

/**
 * Кнопка удаления метки
 */
export const DeleteMarkBtn = ({ markId }) =>
  Button({
    text: "",
    iconSlot: DeleteIcon({ iconColor: "var(--colorImperialRed)" }),
    extraAttrs: [{ name: "data-js-delete-mark-btn", value: markId }],
  });
