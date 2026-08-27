const CELESTUS = {};

/**
 * @import {
 *    VirtueConfiguration, Virtue,
 *    Vital, VitalConfiguration,
 *    Affinity, AffinityConfiguration,
 *    DamageType, DamageTypeConfiguration
 * } from "../_types.js";
 */

/**
 * Enum for Virtues
 * @type {Record<Virtue, VirtueConfiguration>}
 */
CELESTUS.virtues = {
  vig: {
    label: "CELESTUS.VirtueVigor",
    abbreviation: "CELESTUS.VirtueVigorAbbr",
    fullkey: "vigor",
  },
  cla: {
    label: "CELESTUS.VirtueClarity",
    abbreviation: "CELESTUS.VirtueClarityAbbr",
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
 * @type {Record<Vital, VitalConfiguration>}
 */
CELESTUS.vitals = {
  hp: {
    label: "CELESTUS.VitalHealth",
    abbreviation: "CELESTUS.VitalHealthAbbr",
    fullkey: "health",
  },
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
};

/**
 * Enum for Subclass Affinities
 * @type {Record<Affinity, AffinityConfiguration>}
 */
CELESTUS.affinities = {
  solar: {
    label: "CELESTUS.AffinitySolar",
    palette: "blood",
  },
  lunar: {
    label: "CELESTUS.AffinityLunar",
    palette: "soul",
  },
  brutal: {
    label: "CELESTUS.AffinityBrutal",
    palette: "blood",
  },
  deft: {
    label: "CELESTUS.AffinityDeft",
    palette: "soul",
  },
};

/**
 * Enum for base damage types
 * @type {Record<DamageType, DamageTypeConfiguration>}
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

/**
 * Thresholds and localization labels for different glory amounts
 * @type {[number, string][]}
 */
CELESTUS.gloryThresholds = [
  [0, "CELESTUS.Glory0"],
  [3, "CELESTUS.Glory3"],
  [6, "CELESTUS.Glory6"],
  [9, "CELESTUS.Glory9"],
  [12, "CELESTUS.Glory12"],
];

export default CELESTUS;
