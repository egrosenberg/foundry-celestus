interface DamageModifier {
  flat: number;
  percent: number;
}

declare module "./equipment.mjs" {
  import { DamageType } from "../../../_types";

  interface BaseEquipmentModel {
    isEquipment: true;
    description: string;
    equipped: boolean;
    /**
     * Adds bonus resistances to the actor
     */
    damageResist: Record<DamageType, DamageModifier>;
    /**
     * Add bonus damage to specific damage types
     */
    damageBonus: Record<DamageType, DamageModifier>;
    /**
     * Set of statuses to make actor immune to
     */
    statusResist: Set<string>;
    /**
     * Armor value (default 0 for non-armor)
     */
    armor: number;
    /**
     * Increase gd of actor
     */
    gd: number;
    /**
     * Increase wd of actor
     */
    wd: number;
    /**
     * Uuids of skills granted to actor
     */
    skills: string[];
    /**
     * "You can always..." abilities granted to actor
     */
    canAlways: string[];
    /**
     * Misc. abilities granted to actor
     */
    abilities: string[];
  }
}
