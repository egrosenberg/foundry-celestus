import BaseEquipmentModel from "./equipment.mjs";

const { SchemaField, StringField } = foundry.data.fields;

/**
 * @import { Virtue, Vital } from "../../../../_types"
 */

export default class KeeperClassModel extends BaseEquipmentModel {
  /** @inheritdoc */
  static defineSchema() {
    const schema = super.defineSchema();

    schema.title = new StringField({ required: true, initial: "Class" });
    schema.slug = new StringField({ required: true, initial: "id" });
    schema.primaryVirtue = new StringField({ required: true, initial: "vig" });
    schema.vitalFormulas = new SchemaField(
      Object.keys(CELESTUS.vitals).reduce(
        (res, key) => ({ ...res, [key]: new StringField() }),
        {},
      ),
    );

    return schema;
  }

  /**
   * @type {string}
   */
  title = this.title;

  /**
   * unique key to identify class by
   * @type {string}
   */
  slug = this.slug;

  /**
   * @type {Virtue}
   */
  primaryVirtue = this.primaryVirtue;

  /**
   * @type {Record<Vital, string>}
   */
  vitalFormulas = this.vitalFormulas;
}
