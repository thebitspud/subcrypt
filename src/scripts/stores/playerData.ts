import { writable } from "svelte/store";
import Resource from "../types/resources";
import PlayerGear from "../types/playerGear";

const energyRegenTimer = setInterval(() => {
  playerData.update((p) => {
    p.energy.adjust(1);
    return p;
  });
}, 300);

const healthRegenTimer = setInterval(() => {
  playerData.update((p) => {
    p.health.adjust(1);
    return p;
  });
}, 1000);

export type PlayerDataType = {
  health: Resource;
  energy: Resource;
  weight: Resource;
  gear: PlayerGear;
};

let initObject: PlayerDataType = {
  health: new Resource(100),
  energy: new Resource(100),
  weight: new Resource(0, 25),
  gear: new PlayerGear(),
};

export const playerData = writable(initObject);
