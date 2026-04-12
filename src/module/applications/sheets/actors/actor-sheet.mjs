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
        controls: [...sheets.ActorSheetV2.DEFAULT_OPTIONS.window.controls],
      },
      position: {
        width: 1200,
        height: 500,
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

  /* -------------------------------------------------- */
  /*   Drag and Drop                                    */
  /* -------------------------------------------------- */

  /** @inheritdoc */
  async _onDropItem(event, item) {
    if (!this.actor.isOwner) return null;
    if (this.actor.uuid === item.parent?.uuid) {
      const result = await this._onSortItem(event, item);
      return result?.length ? item : null;
    }
    const keepId = !this.actor.items.has(item.id);
    const itemData = game.items.fromCompendium(item, {
      keepId,
      clearFolder: true,
    });
    const result = await getDocumentClass("Item").create(itemData, {
      parent: this.actor,
      keepId,
    });
    return result ?? null;
  }
}
