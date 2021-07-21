import { writable } from "svelte/store";
import Resource from "../resources";
import PlayerInventory from "../player/playerInventory";
import PlayerGear from "../player/playerGear";
import PlayerAccessories from "../player/playerAccessories";

// Temporary timers for resource regeneration
// TODO: move these somewhere else
const energyRegenTimer = setInterval(() => {
	resources.update((resources) => {
		resources.energy.adjust(1);
		return resources;
	});
}, 300);

const healthRegenTimer = setInterval(() => {
	resources.update((resources) => {
		resources.health.adjust(1);
		return resources;
	});
}, 1000);

type PlayerResources = {
	health: Resource;
	energy: Resource;
	weight: Resource;
};

export const resources = writable<PlayerResources>({
	health: new Resource(100),
	energy: new Resource(100),
	weight: new Resource(0, 25),
});

const inven = new PlayerInventory();

export const inventory = writable(inven);

export const gear = writable(new PlayerGear(inven));

export const accessories = writable(new PlayerAccessories(inven, 3));
