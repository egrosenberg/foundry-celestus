/**
 * @import BaseEquipmentModel from "../../../data/item/equipment/equipment.mjs";
 */
import CelestusItemSheet from "./item-sheet.mjs";

export default class CelestusEquipmentSheet extends CelestusItemSheet {
  /** @inheritdoc */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    /** @type {BaseEquipmentModel} */
    const sysItem = this.document.system;

    const flatSuffix = _loc("CELESTUS.SHEET.Labels.Fields.DamageFlatSuffix");
    const percentSuffix = _loc(
      "CELESTUS.SHEET.Labels.Fields.DamagePercentSuffix",
    );

    // Preprocess damage resists
    context.damageResist = {};
    for (const key of Object.keys(sysItem.damageResist)) {
      const damageTypeLabel = _loc(
        CELESTUS.damageTypes[key]?.label ?? "CELESTUS.DamageUniversal",
      );
      context.damageResist[key] = {
        fields:
          this.document.system.schema.fields.damageResist.fields[key].fields,
        /**
         * @type {{flat: string, percent: string}}
         */
        labels: {
          flat: `${damageTypeLabel} ${flatSuffix}`,
          percent: `${damageTypeLabel} ${percentSuffix}`,
        },
        /**
         * @type {DamageModifier}
         */
        values: sysItem.damageResist[key],
        /**
         * @type {string}
         */
        key,
      };
    }

    // Preprocess damage bonuses
    context.damageBonus = {};
    for (const key of Object.keys(sysItem.damageBonus)) {
      const damageTypeLabel = _loc(
        CELESTUS.damageTypes[key]?.label ?? "CELESTUS.DamageUniversal",
      );
      context.damageBonus[key] = {
        fields:
          this.document.system.schema.fields.damageBonus.fields[key].fields,
        /**
         * @type {{flat: string, percent: string}}
         */
        labels: {
          flat: `${damageTypeLabel} ${flatSuffix}`,
          percent: `${damageTypeLabel} ${percentSuffix}`,
        },
        /**
         * @type {DamageModifier}
         */
        values: sysItem.damageBonus[key],
        /**
         * @type {string}
         */
        key,
      };
    }

    return context;
  }
}
