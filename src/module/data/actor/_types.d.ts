import { Virtue, Vital } from "../../../_types";

/**
 * Schema field for misc. attributes
 */
export interface AttributeField<T> {
  /**
   * Base value
   */
  base: T;
  /**
   * Bonus from effects
   */
  bonus: T;
  /**
   * Total value (after incorporating bonuses from items as well)
   */
  value: T;
}

/**
 * Schema field for resources
 */
export interface ResourceField {
  /**
   * Max value w/o modifiers (editable directly)
   */
  maxBase: number;
  /**
   * Modifier to max (should be modified only by AEs)
   */
  maxBonus: number;
  /**
   * Inferred max value (after modifiers)
   */
  max: number;
  /**
   * Current offset from max (used to calculate current)
   */
  offset: number;
  /**
   * Current value (inferred from offset and max)
   */
  value: number;
  /**
   * AMount to recover when relevant (e.g. Actions at turn start)
   */
  recover: number;
}

export interface ActorResources {
  virtues: Record<Virtue, ResourceField>;
  vitals: Record<Vital, ResourceField>;
  actions: ResourceField;
  focus: ResourceField;
}

export interface ActorArmor {
  /**
   * Base value with no armor equipped
   */
  natural: number;
  /**
   * Bonus to armor (from things like AEs)
   */
  bonus: number;
  /**
   * Armor calculation method.
   * either use natural armor or base off equipment
   */
  mode: "equipped" | "natural";
  /**
   * inferred current armor value
   */
  value: number;
}

export interface ActorMovement {
  /**
   * Base movement speed (set directly)
   */
  base: number;
  /**
   * Bonus movement speed (from things like AEs)
   */
  bonus: number;
  /**
   * Inferred current value
   */
  value: number;
  /**
   * Types of movement
   */
  types: Set<string>;
}

export type SizeCategory = "small" | "medium" | "large" | "huge" | "gargantuan";

export interface ActorAttributes {
  /**
   * Character size
   */
  size: SizeCategory;
  /**
   * Armor info
   */
  armor: ActorArmor;
  /**
   * Movement info
   */
  movement: ActorMovement;
  /**
   * Base "you can always..." abilities (set manually)
   */
  canAlways: AttributeField<string[]>;
  /**
   * Base misc. abilities (set manually)
   */
  abilities: AttributeField<string[]>;
  /**
   * Status immunity info
   */
  statusResist: AttributeField<Set<string>>;
}

declare module "./base-actor.mjs" {
  export default interface BaseActorModel {
    /**
     * HTML field for bio/info
     */
    biography: string;
    /**
     * Object containing resource fields for:
     *    vitals, virtues, actions, and focus
     */
    resources: ActorResources;
    /**
     * Misc. actor attributes
     */
    attributes: ActorAttributes;
  }
}
