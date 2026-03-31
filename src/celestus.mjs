import BaseEquipmentModel from "@module/data/item/equipment/equipment.mjs";
import CELESTUS from "./module/config.mjs";
import BaseActorModel from "@module/data/actor/base-actor.mjs";

globalThis.CELESTUS = CELESTUS;

Hooks.once("init", function () {
  CONFIG.Actor.dataModels = {
    keeper: BaseActorModel,
    npc: BaseActorModel,
  };

  CONFIG.Item.dataModels = {
    equipment: BaseEquipmentModel,
  };
});
