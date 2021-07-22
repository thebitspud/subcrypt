import { writable } from "svelte/store";
import type GameEvent from "../events/gameEvent";
import eventData from "../events/eventData";

/** Writable store for the player's active equipment */
export const eventList = writable<GameEvent[]>([eventData.intro_1]);

/** The first event to play after eventList has been cleared */
export const nextEvent = writable(eventData.template);
