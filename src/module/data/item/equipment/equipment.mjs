/// <reference path="_types.d.ts" />

import {
  ArrayField,
  BooleanField,
  DocumentUUIDField,
  HTMLField,
  NumberField,
  SchemaField,
  StringField,
} from "@common/data/fields.mjs";

/**
 * Create a schema field to use for fields modifying
 * incoming/outgoing damage
 *
 * @returns {SchemaField}
 */
function damageModifier() {
  return new SchemaField({
    flat: new NumberField({ initial: 0, integer: true }),
    percent: new NumberField({ initial: 0 }),
  });
}

/**
 * Base data model for equippable items
 */
export default class BaseEquipmentModel extends foundry.abstract.TypeDataModel {
  /** @inheritdoc */
  static defineSchema() {
    return {
      description: new HTMLField(),
      equipped: new BooleanField(),
      damageResist: new SchemaField(
        Object.keys(CELESTUS.damageTypes).reduce(
          (res, key) => ({ ...res, [key]: damageModifier() }),
          { all: damageModifier() },
        ),
      ),
      // Modify damage output of specified type
      damageBonus: new SchemaField(
        Object.keys(CELESTUS.damageTypes).reduce(
          (res, key) => ({ ...res, [key]: damageModifier() }),
          { all: damageModifier() },
        ),
      ),
      armor: new NumberField({ initial: 0, integer: true }),
      gd: new NumberField({ initial: 0, integer: true }),
      wd: new NumberField({ initial: 0, integer: true }),
      skills: new ArrayField(new DocumentUUIDField()),
      canAlways: new ArrayField(new StringField()),
      abilities: new ArrayField(new StringField()),
    };
  }

  /**
   * @type {true}
   */
  static isEquipment = true;
  /**
   * @type {string}
   */
  description = this.description;
  /**
   * @type {boolean}
   */
  equipped = this.equipped;
  /**
   * @type {Record<DamageType, DamageModifier>}
   */
  damageResist = this.damageResist;
  /**
   * @type {Record<DamageType, DamageModifier>}
   */
  damageBonus = this.damageBonus;
  /**
   * @type {number}
   */
  armor = this.armor;
  /**
   * @type {number}
   */
  gd = this.gd;
  /**
   * @type {number}
   */
  wd = this.wd;
  /**
   * @type {string[]}
   */
  skills = this.skills;
  /**
   * @type {string[]}
   */
  canAlways = this.canAlways;
  /**
   * @type {string[]}
   */
  abilities = this.abilities;
}
