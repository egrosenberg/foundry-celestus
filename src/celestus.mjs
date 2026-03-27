import { CelestusActorData } from "./module/actor/data.mjs";
import CELESTUS from "./module/config.mjs";

globalThis.CELESTUS = CELESTUS;

Hooks.once("init", function () {
  CONFIG.Actor.dataModels = {
    keeper: CelestusActorData,
    npc: CelestusActorData,
  };
});
