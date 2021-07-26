import { writable } from "svelte/store";
import Resource, { PlayerResources } from "../player/resources";
import PlayerInventory from "../player/playerInventory";
import PlayerGear from "../player/playerGear";
import PlayerAccessories from "../player/playerAccessories";
import { stateData } from "./stateData";

// Temporary timers for resource regeneration
const energyRegenTimer = setInterval(() => {
	if (!canRegen()) return;

	resources.update((resources) => {
		resources.energy.adjust(1);
		return resources;
	});
}, 750);

const healthRegenTimer = setInterval(() => {
	if (!canRegen()) return;

	resources.update((resources) => {
		resources.health.adjust(1);
		return resources;
	});
}, 2500);

function canRegen(): boolean {
	let regenActive = false;
	stateData.update((state) => {
		regenActive = state.general.gameActive;
		return state;
	});

	return regenActive;
}

/** Writable store for the player's resource stats */
export const resources = writable<PlayerResources>({
	health: new Resource(75, 100),
	energy: new Resource(25, 100),
	weight: new Resource(0, 25),
});

const inven = new PlayerInventory();

/** Writable store for the player's inventory */
export const inventory = writable(inven);

/** Writable store for the player's active equipment */
export const gear = writable(new PlayerGear(inven));

/** Writable store for the player's active accessories */
export const accessories = writable(new PlayerAccessories(inven, 3));
