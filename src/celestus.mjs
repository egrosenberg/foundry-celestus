import CELESTUS from "./module/config.mjs";
import BaseActorModel from "./module/data/actor/base-actor.mjs";
import BaseEquipmentModel from "./module/data/item/equipment/equipment.mjs";
import C_CONST from "./module/const.mjs";
import CelestusActorSheet from "./module/applications/sheets/actors/actor-sheet.mjs";
import CelestusActor from "./module/documents/actor/actor.mjs";
import CelestusEquipmentSheet from "./module/applications/sheets/items/equipment-sheet.mjs";
import registerHbsHelpers from "./module/applications/sheets/hbs/register-hbs-helpers.mjs";
import KeeperClassModel from "./module/data/item/equipment/keeper-class.mjs";
import SubclassModel from "./module/data/item/equipment/subclass.mjs";
import CelestusKeeperClassSheet from "./module/applications/sheets/items/keeper-class-sheet.mjs";
import CelestusSubclassSheet from "./module/applications/sheets/items/subclass-sheet.mjs";

globalThis.CELESTUS = CELESTUS;

Hooks.once("init", function () {
  CONFIG.Actor.dataModels = {
    keeper: BaseActorModel,
    npc: BaseActorModel,
  };

  CONFIG.Item.dataModels = {
    equipment: BaseEquipmentModel,
    keeperClass: KeeperClassModel,
    subclass: SubclassModel,
  };

  // Register Sheets
  const { Actors, Items } = foundry.documents.collections;

  // Register Actor Sheet
  Actors.registerSheet(C_CONST.systemID, CelestusActorSheet, {
    types: ["keeper", "npc"],
    makeDefault: true,
    label: "CELESTUS.SHEET.Labels.Character",
  });
  // Register equipment sheet
  Items.registerSheet(C_CONST.systemID, CelestusEquipmentSheet, {
    types: ["equipment"],
    makeDefault: true,
    label: "CELESTUS.SHEET.Labels.Equipment",
  });
  // Register class sheet
  Items.registerSheet(C_CONST.systemID, CelestusKeeperClassSheet, {
    types: ["keeperClass"],
    makeDefault: true,
    label: "CELESTUS.SHEET.Labels.KeeperClass",
  });
  // Register class sheet
  Items.registerSheet(C_CONST.systemID, CelestusSubclassSheet, {
    types: ["subclass"],
    makeDefault: true,
    label: "CELESTUS.SHEET.Labels.Subclass",
  });

  // Register Actor Document
  CONFIG.Actor.documentClass = CelestusActor;

  // Register handlebars helpers
  registerHbsHelpers();
});
