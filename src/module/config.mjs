const CELESTUS = {};

/**
 * @import {
 *   VirtueConfiguration, VitalConfiguration
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

export default CELESTUS;
