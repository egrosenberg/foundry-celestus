import systemPath from "../../../../lib/systemPath.mjs";
import CelestusEquipmentSheet from "./equipment-sheet.mjs";

export default class CelestusSubclassSheet extends CelestusEquipmentSheet {
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
      template: systemPath("templates/documents/item/subclass/info.hbs"),
    },
    attributes: {
      template: systemPath("templates/documents/item/subclass/attributes.hbs"),
    },
  };
}
