const CELESTUS = {};

/**
 * @import {
 *   VirtueConfiguration, VitalConfiguration, DamageType, DamageTypeConfiguration
 * } from "./_types.mjs";
 */

/**
 * Enum for Virtues
 * @enum {VirtueConfiguration}
 */
CELESTUS.virtues = {
  vig: {
    label: "CELESTUS.VirtueVigor",
    abbreviation: "CELESTUS.VirtueVigorAbbr",
    fullkey: "vigor",
  },
  cla: {
    label: "CELESTUS.VirtueVigor",
    abbreviation: "CELESTUS.VirtueVigorAbbr",
    fullkey: "clarity",
  },
  spi: {
    label: "CELESTUS.VirtueSpirit",
    abbreviation: "CELESTUS.VirtueSpiritAbbr",
    fullkey: "spirit",
  },
};

/**
 * Enum for Vitals
 * @enum {VitalConfiguration}
 */
CELESTUS.vitals = {
  gd: {
    label: "CELESTUS.VitalGuard",
    abbreviation: "CELESTUS.VitalGuardAbbr",
    fullkey: "guard",
  },
  wd: {
    label: "CELESTUS.VitalWard",
    abbreviation: "CELESTUS.VitalWardAbbr",
    fullkey: "ward",
  },
  hp: {
    label: "CELESTUS.VitalHealth",
    abbreviation: "CELESTUS.VitalHealthAbbr",
    fullkey: "health",
  },
};

/**
 * Enum for base damage types
 * @enum {DamageTypeConfiguration}
 */
CELESTUS.damageTypes = {
  air: {
    label: "CELESTUS.DamageAir",
    vital: "wd",
  },
  earth: {
    label: "CELESTUS.DamageEarth",
    vital: "wd",
  },
  fire: {
    label: "CELESTUS.DamageFire",
    vital: "wd",
  },
  physical: {
    label: "CELESTUS.DamagePhysical",
    vital: "gd",
  },
  piercing: {
    label: "CELESTUS.DamagePiercing",
    vital: "hp",
  },
  poison: {
    label: "CELESTUS.DamagePoison",
    vital: "wd",
  },
  radiant: {
    label: "CELESTUS.DamageRadiant",
    vital: "wd",
  },
  shadow: {
    label: "CELESTUS.DamageShadow",
    vital: "wd",
  },
  water: {
    label: "CELESTUS.DamageWater",
    vital: "wd",
  },
};

export default CELESTUS;
