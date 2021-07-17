import { writable } from "svelte/store";

export const inspectTarget = writable({
  type: "",
  id: "",
});
