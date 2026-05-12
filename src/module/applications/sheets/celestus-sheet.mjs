/**
 * @import ActiveEffect from "@client/documents/active-effect.mjs";
 * @import Actor from "@client/documents/actor.mjs";
 * @import Folder from "@client/documents/folder.mjs";
 * @import Item from "@client/documents/item.mjs";
 * @import DragDrop from "@client/applications/ux/drag-drop.mjs";
 */

import C_CONST from "../../const.mjs";

const { ux, api } = foundry.applications;

export default class CelestusSheet extends foundry.applications.api.HandlebarsApplicationMixin(
  api.DocumentSheetV2,
) {
  /** @inheritdoc */
  static DEFAULT_OPTIONS = {
    classes: ["celestus"],
    form: {
      submitOnChange: true,
      closeOnSubmit: false,
    },
    window: {
      resizable: true,
    },
    dragDrop: [{ dragSelector: ".draggable" }],
  };

  //================================================================

  /**
   * Modes for sheet state
   */
  static MODES = Object.freeze({
    USE: 1,
    EDIT: 2,
  });

  /**
   * Tabs of sheet
   */
  static TABS = {};

  /**
   * The mode the sheet is currently in.
   * @type {typeof CelestusSheet.MODES[keyof typeof CelestusSheet.MODES]}
   * @protected
   */
  _mode = CelestusSheet.MODES.EDIT;

  /**
   * Is the sheet in edit mode?
   * @returns {boolean}
   */
  get isEdit() {
    return this._mode === CelestusSheet.MODES.EDIT;
  }

  /**
   * Is the sheet in play mode?
   * @returns {boolean}
   */
  get inUse() {
    return this._mode === CelestusSheet.MODES.USE;
  }

  //==================================================================

  /**
   * @inheritdoc
   */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    Object.assign(context, {
      inUse: this.inUse,
      owner: this.document.isOwner,
      limited: this.document.limited,
      gm: game.user.isGM,
      document: this.document,
      system: this.document.system,
      systemSource: this.document.system._source,
      systemFields: this.document.system.schema.fields,
      flags: this.document.flags,
      config: CELESTUS,
      sysId: C_CONST.systemID,
    });

    return context;
  }

  /** @inheritdoc */
  async _onRender(context, options) {
    await super._onRender(context, options);
    this.#dragDrop.forEach((dd) => dd.bind(this.element));
  }

  //==================================================================
  // Drag and Drop
  //
  // Methods inspired largely by and using some code from
  //      https://github.com/MetaMorphic-Digital/draw-steel/
  // With attached license at https://github.com/MetaMorphic-Digital/draw-steel/tree/0.11.x?tab=License-1-ov-file
  //==================================================================

  //==================================================================

  /**
   * Permission check to see if active user is allowed to drag an item on a sheet
   * @param {string} selector html selector for item being dragged
   * @returns {boolean}       whether or not user is allowed
   * @protected
   */
  // Disable no-unused-vars as this is overridden in subclasses
  // eslint-disable-next-line no-unused-vars
  _canDragStart(selector) {
    return true;
  }

  /**
   * Permission check to see if active user is allowed to drop an item onto a sheet
   * @param {string} selector html selector for item being dropped
   * @returns {boolean}       whether or not user is allowed
   * @protected
   */
  // Disable no-unused-vars as this is overridden in subclasses
  // eslint-disable-next-line no-unused-vars
  _canDragDrop(selector) {
    return true;
  }

  //==================================================================

  /**
   * Created DragDrop handlers for the app based on its options
   * @returns {DragDrop[]} Array of new DragDrop handlers
   * @private
   */
  #createDragDropHandlers() {
    const permissions = {
      dragstart: this._canDragStart.bind(this),
      drop: this._canDragDrop.bind(this),
    };
    const callbacks = {
      dragstart: this._onDragStart.bind(this),
      drop: this._onDrop.bind(this),
    };
    return this.options.dragDrop.map(
      (dd) =>
        new ux.DragDrop({
          ...dd,
          permissions,
          callbacks,
        }),
    );
  }

  /**
   * Created as private so that other things can't mess with it directly
   * then expose via get
   */
  #dragDrop = this.#createDragDropHandlers();

  /**
   * Returns array of DragDrop instances for the application
   * @type {DragDrop[]}
   */
  get dragDrop() {
    return this.#dragDrop;
  }

  //==================================================================

  /**
   * Event that triggers whenever a drag flow starts for a draggable item on the sheet
   * @param {DragEvent} event
   * @protected
   */
  async _onDragStart(event) {
    const target = event.currentTarget;
    // Ignore for links
    if ("link" in event.target.dataset) return;

    let dragData;

    // handle case of document
    if (target.dataset.documentUuid) {
      // get document from embedded docs
      const document = this._getEmbeddedDocument(target);
      // convert document to drag data
      dragData = document.toDragData();
    }

    // Attempt to transfer data to drag event
    if (!dragData) return;
    event.dataTransfer.setData("text/plain", JSON.stringify(dragData));
  }

  //==================================================================

  /**
   * Called when data is dropped into a drop target
   * @param {DragEvent} event
   * @protected
   */
  async _onDrop(event) {
    console.log("TESTSTSETE");

    if (!this.isEditable) return;
    const data = ux.TextEditor.implementation.getDragEventData(event);
    const allowed = Hooks.call(
      `drop${this.document.documentName}SheetData`,
      this.document,
      this,
      data,
    );
    if (allowed === false) return false;

    // Handle drop events for documents
    const documentClass = foundry.utils.getDocumentClass(data.type);
    if (documentClass) {
      const document = await documentClass.fromDropData(data);
      return this._onDropDocument(event, document);
    }

    return data;
  }

  //==================================================================

  /**
   * Helper that calls different document drop handlers
   * @template {Document} DocumentType
   * @param {DragEvent} event              The triggering drop event.
   * @param {DocumentType} document        The resolved Document instance.
   * @returns {Promise<DocumentType|null>} On success, returns corresponding document type, null otherwise
   * @protected
   */
  async _onDropDocument(event, document) {
    switch (document.documentName) {
      case "ActiveEffect":
        return (await this._onDropActiveEffect(event, document)) ?? null;
      case "Actor":
        return (await this._onDropActor(event, document)) ?? null;
      case "Item":
        return (await this._onDropItem(event, document)) ?? null;
      case "Folder":
        return (await this._onDropFolder(event, document)) ?? null;
      default:
        return null;
    }
  }

  /**
   * Handle drop event for active effect
   * @param {DragEvent} event               The triggering drop event.
   * @param {ActiveEffect} document         The resolved Document instance.
   * @returns {Promise<ActiveEffect|null>}  On success, returns the dropped effect, null otherwise
   * @protected
   */
  // Disable no-unused-vars as this is overridden in subclasses
  // eslint-disable-next-line no-unused-vars
  async _onDropActiveEffect(event, document) {
    return null;
  }

  /**
   * Handle drop event for actor
   * @param {DragEvent} event        The triggering drop event.
   * @param {Actor} document         The resolved Document instance.
   * @returns {Promise<Actor|null>}  On success, returns the dropped actor, null otherwise
   * @protected
   */
  // Disable no-unused-vars as this is overridden in subclasses
  // eslint-disable-next-line no-unused-vars
  async _onDropActor(event, document) {
    return null;
  }

  /**
   * Handle drop event for active effect
   * @param {DragEvent} event       The triggering drop event.
   * @param {Item} document         The resolved Document instance.
   * @returns {Promise<Item|null>}  On success, returns the dropped item, null otherwise
   * @protected
   */
  // Disable no-unused-vars as this is overridden in subclasses
  // eslint-disable-next-line no-unused-vars
  async _onDropItem(event, document) {
    return null;
  }

  /**
   * Handle drop event for active effect
   * @param {DragEvent} event         The triggering drop event.
   * @param {Folder} document         The resolved Document instance.
   * @returns {Promise<Folder|null>}  On success, returns the dropped folder, null otherwise
   * @protected
   */
  // Disable no-unused-vars as this is overridden in subclasses
  // eslint-disable-next-line no-unused-vars
  async _onDropFolder(event, document) {
    return null;
  }

  //==================================================================
  // End Drag and Drop
  //==================================================================

  //==================================================================
  // Helper functions
  //==================================================================

  /**
   * Finds an embedded document represented by an html element on the sheet
   *
   * @param {HTMLElement} target  html element containing the info to search for
   * @returns {Document} embedded document matching info from target
   */
  _getEmbeddedDocument(target) {
    const uuid = target.closest("[data-document-uuid]").dataset.documentUuid;

    // Manually parse uuid to look through embedded documents
    const { collection, embedded, documentId } = foundry.utils.parseUuid(uuid);
    let document = collection.get(documentId);
    // Iteratively search embedded documents
    while (document && embedded.length > 1) {
      // Get next name and id from embedded array
      const [name, id] = embedded.splice(0, 2);
      // Get next embedded document
      document = document.getEmbeddedDocument(name, id);
    }

    return document;
  }
}
