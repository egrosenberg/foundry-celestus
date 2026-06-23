import systemPath from "../../../../lib/systemPath.mjs";

import CelestusSheet from "../celestus-sheet.mjs";

/**
 * @import BaseActorModel from "../../../data/actor/base-actor.mjs"
 * @import {ResourceField} from "../../../data/actor/_types".
 */

export default class CelestusItemSheet extends CelestusSheet {
  // Manually redefining for type def
  /**
   * The HTMLElement which renders this Application into the DOM.
   * @type {HTMLElement}
   */
  get element() {
    return super.element;
  }

  get label() {
    return _loc(this.options.window.title);
  }

  /** @inheritdoc */
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["item", "celestus"],
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "info",
        },
      ],
      // actions: { ...sheets.ItemSheetV2.DEFAULT_OPTIONS.actions },
      // scrollY: [".sheet-main", ".tab.attributes", ".tab.info"],
      window: {
        // controls: [...sheets.ItemSheetV2.DEFAULT_OPTIONS.window.controls],
      },
      position: {
        width: 584,
        height: 500,
      },
    });
  }

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
      template: systemPath("templates/documents/item/info.hbs"),
      templates: ["vitals-tags.hbs", "damage-resist-tags.hbs"].map((t) =>
        systemPath(`templates/documents/item/partials/info/${t}`),
      ),
    },
    attributes: {
      template: systemPath("templates/documents/item/attributes.hbs"),
    },
  };

  get actor() {
    return this.document;
  }

  /** @inheritdoc */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.editable = this.document.ownership[game.userId] >= 3;

    return context;
  }

  /** @inheritdoc */
  async _onRender(context, options) {
    await super._onRender(context, options);
  }
}
