const { SchemaField } = foundry.data.fields;

/**
 * @import {AttributeField} from "../_types"
 */

/**
 * @template T
 * @param {new (...args: any[]) => T} fieldClass
 * @param {new (...args: any[]) => T} [secondaryFieldClass]
 * @returns {AttributeField<T>}
 */
export default function attributeField(fieldClass, secondaryFieldClass) {
  return new SchemaField({
    base: new fieldClass(
      secondaryFieldClass ? new secondaryFieldClass() : undefined,
    ),
    bonus: new fieldClass(
      secondaryFieldClass ? new secondaryFieldClass() : undefined,
    ),
    value: new fieldClass(
      secondaryFieldClass ? new secondaryFieldClass() : undefined,
    ),
  });
}
