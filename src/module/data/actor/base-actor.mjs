import attributeField from "./lib/attribute-field.mjs";
import { resourceField } from "./lib/resource-field.mjs";

const {
  ArrayField,
  HTMLField,
  NumberField,
  SchemaField,
  SetField,
  StringField,
} = foundry.data.fields;

/**
 * @import {ActorResources, ActorAttributes} from "./_types"
 * @import BaseEquipmentModel from "../item/equipment/equipment.mjs";
 */

/**
 * Base data model for actors
 * @extends {foundry.abstract.TypeDataModel<BaseActorModel>}
 */
export default class BaseActorModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      biography: new HTMLField({ initial: "" }),
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
          types: new SetField(new StringField()),
        }),
        canAlways: attributeField(ArrayField, StringField),
        abilities: attributeField(ArrayField, StringField),
        statusResist: attributeField(SetField, StringField),
      }),
    };
  }

  /**
   * @type {string}
   */
  biography = this.biography;
  /**
   * @type {ActorResources}
   */
  resources = this.resources;
  /**
   * @type {ActorAttributes}
   */
  attributes = this.attributes;

  /**
   * @inheritdoc
   */
  prepareDerivedData() {
    /**
     * @type {BaseEquipmentModel[]}
     */
    const equipment = this.parent.items
      .filter((item) => item.system?.isEquipment)
      .map((item) => item.system);

    // Virtues are not based on equipment
    const virtues = this.resources.virtues;
    const maxVig = virtues.vig.maxBase + virtues.vig.maxBonus;
    const maxCla = virtues.cla.maxBase + virtues.cla.maxBonus;
    const maxSpi = virtues.spi.maxBase + virtues.spi.maxBonus;

    this.resources.virtues.vig.max = maxVig;
    this.resources.virtues.cla.max = maxCla;
    this.resources.virtues.spi.max = maxSpi;
    this.resources.virtues.vig.value = maxVig + virtues.vig.offset;
    this.resources.virtues.cla.value = maxCla + virtues.cla.offset;
    this.resources.virtues.spi.value = maxSpi + virtues.spi.offset;

    // Actions / Focus not based on equipment
    const maxActions =
      this.resources.actions.maxBase + this.resources.actions.maxBonus;
    const maxFocus =
      this.resources.focus.maxBase + this.resources.focus.maxBonus;

    this.resources.actions.max = maxActions;
    this.resources.focus.max = maxFocus;
    this.resources.actions.value = maxActions + this.resources.actions.offset;
    this.resources.focus.value = maxFocus + this.resources.focus.offset;

    const attributes = this.attributes;

    // Movement is not based on equipment
    this.attributes.movement.value =
      attributes.movement.base + attributes.movement.bonus;

    // Status resist is not based on equipment
    this.attributes.statusResist.value = attributes.statusResist.base.union(
      attributes.statusResist.bonus,
    );

    /**
     * Calculate values based on equipment
     */
    const vitals = this.resources.vitals;
    const vitalsMax = {
      hp: vitals.hp.maxBase + vitals.hp.maxBonus,
      gd: vitals.gd.maxBase + vitals.gd.maxBonus,
      wd: vitals.wd.maxBase + vitals.wd.maxBonus,
    };

    let armor =
      attributes.armor.mode === "natural" ? attributes.armor.natural : 0;
    armor += attributes.armor.bonus;
    const canAlways = attributes.canAlways.base;
    canAlways.push(...attributes.canAlways.bonus);
    const abilities = attributes.abilities.base;
    abilities.push(...attributes.abilities.bonus);

    /**
     * Iterate through items
     */
    for (const item of equipment) {
      vitalsMax.gd += item.gd;
      vitalsMax.wd += item.wd;
      vitalsMax.hp += item.hp;

      armor += item.armor;

      canAlways.push(...item.canAlways);
      abilities.push(...item.abilities);
    }

    /**
     * Use compiled values
     */
    this.attributes.armor.value = armor;
    this.attributes.canAlways.value = canAlways;
    this.attributes.abilities.value = abilities;

    // Vitals
    this.resources.vitals.gd.max = vitalsMax.gd;
    this.resources.vitals.wd.max = vitalsMax.wd;
    this.resources.vitals.hp.max = vitalsMax.hp;
    this.resources.vitals.gd.value = vitalsMax.gd + vitals.gd.offset;
    this.resources.vitals.wd.value = vitalsMax.wd + vitals.wd.offset;
    this.resources.vitals.hp.value = vitalsMax.hp + vitals.hp.offset;

    // Misc attributes
    this.attributes.canAlways.value = canAlways;
    this.attributes.abilities.value = abilities;
  }
}
