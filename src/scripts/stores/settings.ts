import { writable } from "svelte/store";

/** Writable store for the player's settings and preferences */
export const settings = writable({
	rightSidePanel: false,
	darkMode: false,
	gameHints: true,
});
