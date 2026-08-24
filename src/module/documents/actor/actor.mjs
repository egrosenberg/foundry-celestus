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

  /**
   * Equips an item
   * @param {string} id of item to equip
   * @param {{hand?: number}} options
   * @param {number} options.hand which hand to equip a weapon in
   */
  async equipItem(id, options = {}) {
    // get item
    const item = this.items.get(id);

    // Validate item exists and is equippable
    if (!item) {
      return ui.notifications.error(`Unable to find item with id ${id}`);
    }
    if (!item.system.isEquipment) {
      return ui.notifications.error("Specified item is not equipment");
    }

    // check if item is already equipped. if so, unequip
    if (item.system.equipped) {
      return item.update({ "system.equipped": false });
    }

    // Special case for held items
    if (item.system.hands != null) {
      // If  attempting to equip to specific hand
      if (options?.hand) {
        // Ensure item can be equipped in specified hand
        if (
          !(
            options.hand === item.system.primaryHand ||
            item.system.tag?.canOffhand
          )
        ) {
          return ui.notifications.warn(
            "Item cannot be equipped in selected hand",
          );
        }

        // check for already equipped item(s) to that hand
        const existing =
          item.system.hands > 1
            ? // if two-handed, unequip all held items
              this.items.filter(
                (other) =>
                  other.system.equipped &&
                  other.system.equippedHand === options.hand,
              )
            : this.items.filter(
                (other) =>
                  other.system.equipped &&
                  other.system.equippedHand === options.hand,
              );
        // unequip item(s) already in hand
        for (const i of existing) {
          await i.update({ "system.equipped": false });
        }
        // equip new item
        return item.update({
          system: { equipped: true, equippedHand: options.hand },
        });
      } else {
        if (item.system.hands === 1) {
          ui.notifications.info("one handed item...");
          // figure out which hand to equip in
          const preferredHand = item.system.primaryHand;
          const backupHand = preferredHand === 1 ? 2 : 1;

          // Check if preferred hand is in use
          const existingPrimary = this.items.find(
            (other) =>
              other.system.equipped &&
              (other.system.hands > 1 ||
                other.system.equippedHand === preferredHand),
          );

          // if preferred hand is in use
          if (existingPrimary) {
            ui.notifications.info("hand in use");
            // If can offhand, check if other hand is in use
            if (item.system.tags.canOffhand) {
              const existingSecondary = this.items.find(
                (other) =>
                  // Item equipped in secondary hand or is two handed
                  other.system.equipped &&
                  (other.system.equippedHand === backupHand ||
                    other.system.hands > 1),
              );

              // If there is already an item in both main hand and offhand, put in main hand
              if (existingSecondary) {
                // unequip current item in primary
                await existingPrimary.update({ "system.equipped": false });
                // equip new item into primary hand
                return item.update({
                  system: { equipped: true, equippedHand: preferredHand },
                });
              } else {
                // otherwise, equip into offhand
                return item.update({
                  system: { equipped: true, equippedHand: backupHand },
                });
              }
            } else {
              // If can't offhand, unequip all other held items
              const existing = this.items.filter(
                (other) =>
                  other.system.equipped &&
                  (other.system.equippedHand === preferredHand ||
                    other.system.hands > 1),
              );
              // unequip item(s) already in hand
              for (const i of existing) {
                await i.update({ "system.equipped": false });
              }
              // equip new item
              return item.update({
                system: { equipped: true, equippedHand: options.hand },
              });
            }
          } else {
            // Otherwise, just equip
            return item.update({
              system: { equipped: true, equippedHand: preferredHand },
            });
          }
        } else {
          // multi-handed weapons unequip all other hands
          const existing = this.items.find(
            (other) => other.system.equipped && other.system.equippedHand,
          );
          for (const i of existing) {
            await i.update({ "system.equipped": false });
          }

          // equip new item
          return item.update({
            system: { equipped: true, equippedHand: options.hand },
          });
        }
      }
    } else {
      // Otherwise, just equip
      return item.update({
        system: { equipped: true, equippedHand: options.hand },
      });
    }
  }
}
