import Choices from "choices.js";
import { getCfg } from "#shared/lib/utils";
/**
 *
 */
export class CustomSelectModel {
  selectors = {
    instance: "[data-js-custom-select]",
  };

  static defaultCfg = {
    itemSelectText: "",
  };

  static instances = [];

  constructor() {
    this.selects = document.querySelectorAll(this.selectors.instance);
    this.selects.forEach((select) => {
      CustomSelectModel.createCustomSelect(select);
    });
  }

  static createCustomSelect(node) {
    const cfg = getCfg(node, "data-js-custom-select");
    CustomSelectModel.instances.push(
      new Choices(node, {
        ...CustomSelectModel.defaultCfg,
        ...cfg,
      })
    );
  }
}
