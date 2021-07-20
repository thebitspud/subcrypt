import { writable } from "svelte/store";
import Resource from "../types/resources";
import PlayerGear from "../types/playerGear";

// Temporary timers for resource regeneration
// TODO: move these somewhere else
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

/** A type representing any data object holding the player's stats and gear */
export type PlayerDataType = {
	health: Resource;
	energy: Resource;
	weight: Resource;
	gear: PlayerGear;
};

const initObject: PlayerDataType = {
	health: new Resource(100),
	energy: new Resource(100),
	weight: new Resource(0, 25),
	gear: new PlayerGear(),
};

/** The player's statistics and equipment as a writable store */
export const playerData = writable(initObject);
