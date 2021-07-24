import { writable } from "svelte/store";

export const stateData = writable({
	gameActive: false,
	showSettings: false,
});
