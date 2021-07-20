import { writable } from "svelte/store";

/** A writable store for tracking what to display in the inspect window */
export const inspectTarget = writable({
	type: "",
	id: "",
});
