import systemPath from "../../../../lib/systemPath.mjs";
import CelestusSheet from "../celestus-sheet.mjs";

const { sheets } = foundry.applications;

export default class CelestusActorSheet extends CelestusSheet {
  // Manually redefining for type def
  /**
   * The HTMLElement which renders this Application into the DOM.
   * @type {HTMLElement}
   */
  get element() {
    return super.element;
  }

  /** @inheritdoc */
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["actor"],
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "bio",
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
      tabs: [
        { id: "bio", label: "CELESTUS.SHEET.Labels.Tabs.bio" },
        { id: "items", label: "CELESTUS.SHEET.Labels.Tabs.items" },
      ],
      initial: "header",
    },
  };

  static PARTS = {
    tabs: {
      // Foundry-provided generic template
      template: "templates/generic/tab-navigation.hbs",
    },
    bio: {
      template: systemPath("templates/documents/actor/bio.hbs"),
    },
    items: {
      template: systemPath("templates/documents/actor/items.hbs"),
    },
  };

  get actor() {
    return this.document;
  }

  /** @inheritdoc */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    context.items = Array.from(this.document.items);

    return context;
  }

  /** @inheritdoc */
  async _onRender(context, options) {
    await super._onRender(context, options);
    this._bindItemInteractions();
  }

  //==================================================================
  // Drag and Drop
  //==================================================================

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

  //==================================================================

  /**
   * Add relevant event listeners to items rendered on the sheet
   */
  _bindItemInteractions() {
    const getDocument = this._getEmbeddedDocument.bind(this);

    // Open item sheets on edit
    const editControls = this.element.querySelectorAll(".item-edit");
    for (const control of editControls) {
      control.addEventListener("click", (event) => {
        const item = getDocument(event.currentTarget);
        item?.sheet.render(true);
      });
    }
  }
}
