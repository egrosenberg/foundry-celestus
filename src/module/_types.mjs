/** @typedef {('vig' | 'cla' | 'spi')} Virtue */

/**
 * Configuration data for virtues
 *
 * @typedef VirtueConfiguration
 * @property {string} label                               Localized label.
 * @property {string} abbreviation                        Localized abbreviation.
 * @property {string} fullKey                             Alternate key for text enrichment
 * @property {string} [reference]                         Reference to a rule page describing this ability.
 * @property {string} [icon]                              An SVG icon that represents the ability.
 */

/** @typedef {('gd' | 'wd' | 'hp')} Vital */

/**
 * Configuration data for vitals
 *
 * @typedef VitalConfiguration
 * @property {string} label                               Localized label.
 * @property {string} abbreviation                        Localized abbreviation.
 * @property {string} fullKey                             Alternate key for text enrichment
 * @property {string} [reference]                         Reference to a rule page describing this ability.
 * @property {string} [icon]                              An SVG icon that represents the ability.
 */

//=============================
// Data model types
//=============================

/**
 * Resource schema field
 *
 * @typedef ResourceField
 * @property {number} maxBase                             Max value w/o modifiers
 * @property {number} maxBonus                            Modifier to max
 * @property {number} max                                 Inferred max value
 * @property {number} offset                              Current offset from max (used to calculate current)
 * @property {number} value                               Inferred current value from offset and max
 * @property {number} recover                             Amount to recover if relevant (eg. Actions at turn start)
 */
