import { writable } from "svelte/store";

type InspectTargetType = {
	type: string;
	id: string;
};

/** A writable store for tracking what to display in the inspect window */
export const inspectTarget = writable<InspectTargetType>({
	type: "",
	id: "",
});
