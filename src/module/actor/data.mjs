import {
  HTMLField,
  NumberField,
  SchemaField,
  StringField,
} from "@client/data/fields.mjs";
import { resourceField } from "../data.mjs";

/**
 * Base data model for actors
 * @extends {foundry.abstract.TypeDataModel}
 */
export class CelestusActorData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      biography: new HTMLField(),
      resources: new SchemaField({
        virtues: new SchemaField(
          Object.keys(CELESTUS.virtues).reduce(
            (res, key) => ({ ...res, [key]: resourceField() }),
            {},
          ),
        ),
        vitals: new SchemaField(
          Object.keys(CELESTUS.vitals).reduce(
            (res, key) => ({ ...res, [key]: resourceField() }),
            {},
          ),
        ),
        actions: resourceField({ recover: 4, maxBase: 6 }),
        focus: resourceField(),
      }),
      attributes: new SchemaField({
        size: new StringField({ required: true, initial: "medium" }),
        armor: new SchemaField({
          // Inferred
          value: new NumberField({ integer: true }),
          natural: new NumberField({ integer: true }),
          bonus: new NumberField({
            integer: true,
            initial: 0,
          }),
          mode: new StringField({ initial: "equipped" }),
        }),
        movement: new SchemaField({
          base: new NumberField({ integer: true }),
          bonus: new NumberField({
            integer: true,
            initial: 0,
          }),
          // Inferred
          value: new NumberField({ integer: true }),
        }),
      }),
    };
  }

  /**
   * Inferred list of things actor "can always do"
   *
   * @type {String[]}
   */
  get canAlways() {
    // TODO: search items for items
    return [];
  }
}
