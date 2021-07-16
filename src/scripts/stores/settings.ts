import { writable } from "svelte/store";

export const settings = writable({
  rightSidePanel: false,
  darkMode: false,
  gameHints: true,
});
