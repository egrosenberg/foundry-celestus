import BaseEquipmentModel from "./equipment.mjs";

const { StringField } = foundry.data.fields;

/**
 * @import { Affinity } from "../../../_types"
 */

export default class SubclassModel extends BaseEquipmentModel {
  /** @inheritdoc */
  static defineSchema() {
    const schema = super.defineSchema();

    schema.title = new StringField({ required: true, initial: "New Class" });
    schema.classKey = new StringField();
    schema.affinity = new StringField();

    return schema;
  }

  /**
   * @type {string}
   */
  title = this.title;

  /**
   * corresponds to class.slug
   * @type {string}
   */
  classKey = this.classKey;

  /**
   * @type {Affinity}
   */
  affinity = this.affinity;
}
