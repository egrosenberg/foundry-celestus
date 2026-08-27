//======================================
// VITALS AND VIRTUES
//======================================

export type Virtue = "vig" | "cla" | "spi";
export type Vital = "gd" | "wd" | "hp";

/**
 * Base configuration data for vitals/virtues
 */
export interface BasicConfiguration {
  /**
   * Localized label
   */
  label: string;
  /**
   * Localized abbreviation
   */
  abbreviation: string;
  /**
   * Alternate key for text enrichment
   */
  fullKey: string;
  /**
   * Reference to a rule page describing the ability
   */
  reference?: string;
  /**
   * An SVG that represents the ability
   */
  icon?: string;
}

export interface VitalConfiguration extends BasicConfiguration {}
export interface VirtueConfiguration extends BasicConfiguration {}

//======================================

//======================================
// DAMAGE
//======================================

export type DamageType =
  | "physical"
  | "piercing"
  | "fire"
  | "water"
  | "air"
  | "earth"
  | "poison"
  | "radiant"
  | "shadow"
  | "all";

export interface DamageTypeConfiguration {
  /**
   * Localized label
   */
  label: string;
  /**
   * What vital it affects first
   */
  vital: Vital;
  /**
   * Should show as a damage type option (treat undefined as true)
   */
  show?: false;
  /**
   * Reference to a rule page describing this ability
   */
  reference?: string;
  /**
   * An SVG that represents the ability
   */
  icon?: string;
}

type DamagePart = {
  formula: string;
  types: DamageType[];
};

//======================================

// Used for subclasses
export type Affinity = "solar" | "lunar" | "deft" | "brutal";

export interface AffinityConfiguration {
  /**
   * Localized label
   */
  label: string;
  /**
   * Palette used for styling
   */
  palette: string;
}
