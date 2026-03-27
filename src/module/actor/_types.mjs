/**
 * @import {
 *   ResourceField, Virtue, Vital
 * } from "../_types.mjs";
 *
 * @import Actor from "@client/documents/actor.mjs"
 */

/**
 * Resources object for Actor system data
 *
 * @typedef ActorResources
 * @property {Record<Virtue, ResourceField>} virtues      Actor virtues fields Record
 * @property {Record<Vital, ResourceField>} vitals        Actor vitals fields Record
 * @property {ResourceField} actions                      Actor's actions
 * @property {ResourceField} focus                        Actor's focus
 */

/**
 * @typedef {('equipped'|'natural')} ArmorMode
 */

/**
 * Schema field for armor
 *
 * @typedef ActorArmor
 * @property {number} natural                             base armor with no armor equipped
 * @property {number} bonus                               bonus from other sources
 * @property {ArmorMode} mode                             armor calculation method
 * @property {number} value                               inferred current value
 */

/**
 * Schema field for movement(s)
 *
 * @typedef ActorMovement
 * @property {number} base                                base speed
 * @property {number} bonus                               bonus from other sources
 * @property {number} value                               inferred current value
 */

/** @typedef {'small' | 'medium' | 'large' | 'huge' | 'gargantuan'} Size */

/**
 * Resources object for Actor attributes
 *
 * @typedef ActorAttributes
 * @property {Size} size                                  Creature size
 * @property {ActorArmor} armor                           Armor info.
 * @property {ActorMovement} movement                     Movement info.
 */

/**
 * Base type for system object in actors
 *
 * @typedef CelestusActorData
 * @property {string} biography                           html field for bio/info
 * @property {ActorResources} resources                   Object containing all resources
 * @property {ActorAttributes} attributes                 Misc. attributes
 *
 * GETTERS
 * @property {String[]} canAlways                         Inferred list of you can always...
 */

/**
 * @typedef {Actor & { system: CelestusActorData }} CelestusActor
 */
