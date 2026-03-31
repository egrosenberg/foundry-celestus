import { NumberField, SchemaField } from "@common/data/fields.mjs";

/**
 * Object to create schema field for a resource (virtue/vital)
 * @param {{
 *  maxBase?: number,
 *  recover?: number,
 * }} [defaults]
 */
export function resourceField(defaults) {
  return new SchemaField({
    // Use this as "max" for storage purposes
    maxBase: new NumberField({
      min: 0,
      integer: true,
      initial: defaults?.maxBase ?? 0,
    }),
    maxBonus: new NumberField({ integer: true, initial: 0 }),
    // inferred
    max: new NumberField({ integer: true, min: 0 }),
    // Used to calculate current
    offset: new NumberField({
      integer: true,
      initial: 0,
    }),
    // Inferred
    value: new NumberField({
      integer: true,
    }),
    // How many to recover at start of turn
    recover: new NumberField({
      initial: defaults?.recover ?? 0,
      integer: true,
    }),
  });
}
