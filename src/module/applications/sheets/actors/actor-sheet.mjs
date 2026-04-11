import systemPath from "../../../../lib/systemPath.mjs";
import CelestusSheet from "../celestus-sheet.mjs";

const { sheets } = foundry.applications;

export default class CelestusActorSheet extends CelestusSheet {
  /** @inheritdoc */
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["actor"],
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "biography",
        },
      ],
      actions: { ...sheets.ActorSheetV2.DEFAULT_OPTIONS.actions },
      scrollY: [".sheet-main"],
      window: {
        // TODO: Add controls for prototype token etc.
        // controls: [...sheets.ActorSheetV2.DEFAULT_OPTIONS.window.controls],
      },
    });
  }

  static TABS = {
    primary: {
      tabs: [{ id: "biography" }],
    },
    initial: "biography",
  };

  static PARTS = {
    biography: {
      template: systemPath("templates/documents/actor/sheet.hbs"),
      form: {
        submitOnChange: true,
        closeOnSubmit: false,
      },
    },
  };

  get actor() {
    return this.document;
  }

  /** @inheritdoc */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    return context;
  }
}
