export default class CelestusSheet extends foundry.applications.api.HandlebarsApplicationMixin(
  foundry.applications.api.DocumentSheetV2,
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
    });

    return context;
  }
}
