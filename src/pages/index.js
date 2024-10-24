import { Button } from "#shared/ui/Button/index";
import { CustomSelect } from "#shared/ui/CustomSelect/index";
import { CinemaIcon, CheckIcon, CancelIcon } from "#shared/ui/Icons/index";
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
        ${Button({ text: "Да", iconSlot: CheckIcon(), extraClasses: ["btn--isGreenLightIcon"] })}
        ${Button({ text: "Нет", iconSlot: CancelIcon(), extraClasses: ["btn--isRedIcon"] })}
        ${Switch({
          label: "Привет мир",
          extraInputAttrs: [
            { name: "name", value: "rememberMe" },
            { name: "form", value: "formAuth" },
          ],
        })}
        
        ${CinemaIcon()}
        ${Switch({
          label: "Привет мир",
          extraClasses: ["switch--isRightLabel"],
          extraInputAttrs: [
            { name: "name", value: "rememberMe" },
            { name: "form", value: "formAuth" },
          ],
        })}

        <div>${CustomSelect({
          options: [
            { label: "test", value: "1" },
            { label: "new_test", value: "2" },
          ],
          cfg: {
            searchEnabled: true,
          },
        })}</div>

        <div>${CustomSelect({
          options: [
            { label: "test", value: "1" },
            { label: "new_test", value: "2" },
          ],
          cfg: {
            searchEnabled: true,
          },
        })}</div>

        <div>${CustomSelect({
          options: [
            { label: "test", value: "1" },
            { label: "new_test", value: "2" },
          ],
          cfg: {
            searchEnabled: true,
          },
        })}</div>
      </main>
    </body>
  </html>
`;

export default IndexPage;
