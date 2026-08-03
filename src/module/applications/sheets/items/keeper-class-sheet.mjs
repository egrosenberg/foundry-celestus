import systemPath from "../../../../lib/systemPath.mjs";
import CelestusEquipmentSheet from "./equipment-sheet.mjs";

/**
 * @import KeeperClassModel from "../../../data/item/equipment/keeper-class.mjs"
 */

export default class CelestusKeeperClassSheet extends CelestusEquipmentSheet {
  static TABS = {
    primary: {
      tabs: [
        { id: "info", label: "CELESTUS.SHEET.Labels.Tabs.info" },
        { id: "attributes", label: "CELESTUS.SHEET.Labels.Tabs.attributes" },
      ],
      initial: "info",
    },
  };

  static PARTS = {
    tabs: {
      // Foundry-provided generic template
      template: systemPath("templates/shared/editable-only-tabs.hbs"),
    },
    info: {
      template: systemPath("templates/documents/item/keeper-class/info.hbs"),
      templates: ["vitals-tags.hbs", "damage-resist-tags.hbs"].map((t) =>
        systemPath(`templates/documents/item/partials/info/${t}`),
      ),
    },
    attributes: {
      template: systemPath(
        "templates/documents/item/keeper-class/attributes.hbs",
      ),
    },
  };

  /** @inheritdoc */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    /** @type {KeeperClassModel} */
    const sysItem = this.document.system;

    // Preprocess vital formulas
    context.vitalFormulas = {};
    for (const key of Object.keys(CELESTUS.vitals)) {
      context.vitalFormulas[key] = {
        field: this.document.system.schema.fields.vitalFormulas.fields[key],
        /**
         * @type {string}
         */
        label: _loc(CELESTUS.vitals[key]?.label),
        /**
         * @type {string}
         */
        value: sysItem.vitalFormulas[key],
        /**
         * @type {string}
         */
        key,
      };
    }

    return context;
  }
}
