import BaseEquipmentModel from "./equipment.mjs";

/**
 * @import { DamagePart } from "../../../_types"
 */

const { NumberField, BooleanField, SchemaField, ArrayField, StringField } =
  foundry.data.fields;

const DamagePartsSchema = () =>
  new ArrayField(
    new SchemaField({
      formula: new StringField(),
      types: new ArrayField(new StringField({ initial: "physical" })),
    }),
  );

export default class HeldItemModel extends BaseEquipmentModel {
  /** @inheritdoc */
  static defineSchema() {
    const schema = super.defineSchema();

    // 1 = dominant, 2 = nondominant
    // no max to leave the door open to 3+ hand weirdness
    schema.hands = new NumberField({
      required: true,
      initial: 1,
      min: 1,
    });

    // 1 = dominant, 2 = nondominant
    schema.equippedHand = new NumberField({
      required: true,
      initial: 1,
      min: 1,
    });

    schema.isWeapon = new BooleanField({ required: true, initial: true });
    schema.damageParts = new SchemaField({
      primary: DamagePartsSchema(),
      secondary: DamagePartsSchema(),
    });

    // I think we can infer this for now, weapons main hand 1, non-weapons main hand 2
    // primaryHand = new NumberField({ required: true, initial: 1, min: 1 });

    schema.tags = new SchemaField({
      canOffhand: new BooleanField({ required: true, initial: false }),
    });

    return schema;
  }

  /**
   * Inferred primary hand
   * @type {number}
   */
  get primaryHand() {
    return this.isWeapon ? 1 : 2;
  }

  /**
   * @type {number}
   */
  hands = this.hands;

  /**
   * @type {number}
   */
  equippedHand = this.equippedHand;

  /**
   * @type {boolean}
   */
  isWeapon = this.isWeapon;

  /**
   * Damage formulas
   * Primary used for default situation (2 handing a versatile weapon, main handing a light weapon)
   * Secondary used for situations like one hand
   * @type {{ primary: DamagePart[], secondary: DamagePart[] }}
   */
  damageParts = this.damageParts;

  /**
   * @type {{canOffhand: boolean}}
   */
  tags = this.tags;
}
