/**
 * @import { DamagePart, DamageType } from "../../_types"
 */

/**
 * Generates a roll string from damage parts
 * @param {DamagePart[]} damageParts
 * @param {(DamageType|null)[]?} damageOverrides
 * @returns
 */
export function buildDamageString(damageParts, damageOverrides = []) {
  let res = "";

  for (const i in damageParts) {
    if (i !== "0") res += " + ";

    const part = damageParts[i];
    const damageType = damageOverrides[i] ?? part.types[0];

    res += part.formula.replace(
      /[0-9]*d[0-9]+/gi,
      (val) => val + `[${damageType}]`,
    );
  }

  return res;
}
