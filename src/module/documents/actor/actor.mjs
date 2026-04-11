import resolvePath from "../../lib/object/resolve-path.mjs";

/**
 * @import {ResourceField} from "../../data/actor/_types"
 */

export default class CelestusActor extends foundry.documents.Actor {
  /**
   * Sets the correct offset for a resource when
   * it is passed into _preUpdate
   * @param {ResourceField} resource
   * @param {number} max
   */
  _setResourceOffset(resource, max) {
    // Check if user is trying to set the value
    const desired = resource?.value;
    if (desired) {
      const offset = desired - max;
      resource.value = undefined;
      resource.offset = offset;
    }
  }

  /** @inheritdoc */
  async _preUpdate(changed, options, user) {
    const allowed = await super._preUpdate(changed, options, user);
    if (allowed === false) return false;

    // Handle changes to values of resources (calculate offset)
    const resourceKeys = [
      ...Object.keys(CELESTUS.vitals).map(
        (key) => `system.resources.vitals.${key}`,
      ),
      ...Object.keys(CELESTUS.virtues).map(
        (key) => `system.resources.virtues.${key}`,
      ),
      "system.resources.actions",
      "system.resources.focus",
    ];
    for (const key of resourceKeys) {
      const resource = resolvePath(changed, key);
      this._setResourceOffset(resource, resolvePath(this, key).max);
    }
  }
}
