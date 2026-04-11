import CELESTUS from "./module/config.mjs";
import BaseActorModel from "./module/data/actor/base-actor.mjs";
import BaseEquipmentModel from "./module/data/item/equipment/equipment.mjs";
import C_CONST from "./module/const.mjs";
import CelestusActorSheet from "./module/applications/sheets/actors/actor-sheet.mjs";

globalThis.CELESTUS = CELESTUS;

Hooks.once("init", function () {
  CONFIG.Actor.dataModels = {
    keeper: BaseActorModel,
    npc: BaseActorModel,
  };

  CONFIG.Item.dataModels = {
    equipment: BaseEquipmentModel,
  };

  const { Actors } = foundry.documents.collections;

  Actors.registerSheet(C_CONST.systemID, CelestusActorSheet, {
    types: ["keeper", "npc"],
    makeDefault: true,
    label: "CELESTUS.SHEET.Labels.Character",
  });
});
