import systemPath from "../../../../lib/systemPath.mjs";
import CelestusEquipmentSheet from "./equipment-sheet.mjs";

export default class CelestusHeldItemSheet extends CelestusEquipmentSheet {
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
      template: systemPath("templates/documents/item/held-item/info.hbs"),
      templates: ["vitals-tags.hbs", "damage-resist-tags.hbs"].map((t) =>
        systemPath(`templates/documents/item/partials/info/${t}`),
      ),
    },
    attributes: {
      template: systemPath("templates/documents/item/held-item/attributes.hbs"),
    },
  };
}
