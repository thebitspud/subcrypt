import { writable } from "svelte/store";
import Resource from "../types/resources";
import PlayerGear from "../types/playerGear";

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
