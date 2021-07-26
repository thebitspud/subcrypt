import { writable } from "svelte/store";

export const stateObject = {
	general: {
		gameActive: false,
		showSettings: false,
	},
	intro: {
		examinedGround: false,
		examinedArea: false,
		examinedSelf: false,
		examinedLamp: false,
	},
};

export const stateData = writable(stateObject);
