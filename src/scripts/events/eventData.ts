import GameEvent, { EventOption } from "./gameEvent";
import { gear, inventory, player } from "../stores/player";
import { stateObject as state } from "../stores/stateData";

type EventMap = {
	[key: string]: GameEvent;
};

const eventData: EventMap = {
	intro_1: new (class extends GameEvent {
		getText(): string {
			return (
				"You wake up on your back, breathing heavily and covered with sweat. As you come to your " +
				"senses, a feeling of dread and panic sets in."
			);
		}

		getOptions(): EventOption[] {
			return [{ text: "Continue", nextEvent: eventData.intro_2 }];
		}
	})(),

	intro_2: new (class extends GameEvent {
		onPlay() {
			inventory.update((inven) => {
				inven.addItem("blunt_chisel");
				return inven;
			});
		}

		getText(): string {
			return (
				"Although your eyes are wide open, there is nothing to see. No dawn light, no night sky, " +
				"not even your hands in front of you. Nothing but the pitch black of this miserable place."
			);
		}

		getOptions(): EventOption[] {
			return [{ text: "Get up", nextEvent: eventData.intro_3 }];
		}
	})(),

	intro_3: new (class extends GameEvent {
		onPlay() {
			inventory.update((inven) => {
				inven.addItem("quartz_charm");
				return inven;
			});
		}

		getText(): string {
			return (
				"Slowly, you raise yourself off the rugged stone floor and into a crouched position. Now " +
				"obvious is the musty and unmistakably earthy smell permeating the air, not much different " +
				"from that of a freshly tilled field."
			);
		}

		getOptions(): EventOption[] {
			return [
				{ text: "Examine surroundings", nextEvent: eventData.intro_4 },
				{ text: "Examine ground", nextEvent: eventData.intro_a1 },
			];
		}
	})(),

	intro_a1: new (class extends GameEvent {
		getText(): string {
			return "The cold, slightly damp ground beneath you is littered with small rocks and debris.";
		}

		getOptions(): EventOption[] {
			return [{ text: "Continue", nextEvent: eventData.intro_a2 }];
		}
	})(),

	intro_a2: new (class extends GameEvent {
		onPlay() {
			state.intro.examinedGround = true;
		}

		getText(): string {
			return (
				"Your hands encounter something too smooth and light to be a rock. Upon holding and feeling " +
				"it, you realize that the object is conical and curved to a sharp point."
			);
		}

		getOptions(): EventOption[] {
			return [
				{
					text: "Pocket it",
					nextEvent: eventData.intro_a3,
					onClick: () => {
						inventory.update((inven) => {
							inven.addItem("strange_tooth");
							return inven;
						});
					},
				},
				{ text: "Discard it", nextEvent: eventData.intro_a3 },
			];
		}
	})(),

	intro_a3: new (class extends GameEvent {
		getText(): string {
			// Letting the player choose to equip or discard the tooth
			// TODO: replace this with shorthand event function
			let pickedUp = hasItem("strange_tooth");
			return (pickedUp ? "Acquired" : "Discarded") + " Strange Tooth";
		}

		getOptions(): EventOption[] {
			return [
				{ text: "Keep searching", nextEvent: eventData.intro_a4 },
				...(state.intro.examinedArea
					? [{ text: "To the light", nextEvent: eventData.intro_5 }]
					: [{ text: "Examine surroundings", nextEvent: eventData.intro_4 }]),
			];
		}
	})("faint"),

	intro_a4: new (class extends GameEvent {
		getText(): string {
			return "It is too dark here. You probe the earth some more, but do not find anything of interest.";
		}

		getOptions(): EventOption[] {
			return [
				...(state.intro.examinedArea
					? [{ text: "To the light", nextEvent: eventData.intro_5 }]
					: [{ text: "Examine surroundings", nextEvent: eventData.intro_4 }]),
			];
		}
	})(),

	intro_4: new (class extends GameEvent {
		onPlay() {
			state.intro.examinedArea = true;

			inventory.update((inven) => {
				inven.addItem("chainmail_hood");
				return inven;
			});
		}

		getText(): string {
			return (
				"While surveying the surrounding darkness, you notice a faint, flickering light emanating " +
				"from some unknown source in the distance."
			);
		}

		getOptions(): EventOption[] {
			return [
				...(state.intro.examinedGround
					? []
					: [{ text: "Examine ground", nextEvent: eventData.intro_a1 }]),
				{ text: "To the light", nextEvent: eventData.intro_5 },
			];
		}
	})(),

	intro_5: new (class extends GameEvent {
		onPlay() {
			inventory.update((inven) => {
				inven.addItem("healsprout", 5);
				return inven;
			});
		}

		getText(): string {
			return (
				"Still unsure of where you are and without any better ideas, you cautiously make your way " +
				"towards the light."
			);
		}

		getOptions(): EventOption[] {
			return [
				{
					text: "Continue",
					nextEvent: eventData.intro_passage_1,
					clearEvents: true,
				},
			];
		}
	})(),

	intro_passage_1: new (class extends GameEvent {
		getText(): string {
			return (
				"You arrive at the light source without incident. It is a lamp situated on the right side " +
				"of a corridor crudely carved out of the surrounding stone. The passage is just tall enough " +
				"for you to walk through without having to duck."
			);
		}

		getOptions(): EventOption[] {
			return [
				{ text: "Examine lamp", nextEvent: eventData.intro_passage_b1 },
				{ text: "Examine self", nextEvent: eventData.intro_passage_a1 },
				{ text: "Keep walking", nextEvent: eventData.intro_passage_2 },
			];
		}
	})(),

	intro_passage_a1: new (class extends GameEvent {
		onPlay() {
			state.intro.examinedSelf = true;
		}

		getText(): string {
			return (
				"Now illuminated by the lamp, you are able to get a better view of yourself. It appears " +
				"that you are still dressed in the loose-fitting desert clothing you last remember, stained " +
				"by sweat and dust."
			);
		}

		getOptions(): EventOption[] {
			return [
				...(state.intro.examinedLamp
					? hasItem("crude_oil_lamp")
						? []
						: [{ text: "Take lamp", nextEvent: eventData.intro_passage_b2 }]
					: [{ text: "Examine lamp", nextEvent: eventData.intro_passage_b1 }]),
				{ text: "Keep walking", nextEvent: eventData.intro_passage_2 },
			];
		}
	})(),

	intro_passage_b1: new (class extends GameEvent {
		onPlay() {
			state.intro.examinedLamp = true;
		}

		getText(): string {
			return (
				"The lamp is modest and functional, consisting of nothing more than a primitive metal " +
				"frame, a wick, and a fuel reservoir containing some dark, viscous oil. It hangs from a " +
				"rusting hook hammered into the rough stone wall at just below shoulder height."
			);
		}

		getOptions(): EventOption[] {
			return [
				{ text: "Take lamp", nextEvent: eventData.intro_passage_b2 },
				...(state.intro.examinedSelf
					? []
					: [{ text: "Examine self", nextEvent: eventData.intro_passage_a1 }]),
				{ text: "Keep walking", nextEvent: eventData.intro_passage_2 },
			];
		}
	})(),

	intro_passage_b2: new (class extends GameEvent {
		onPlay() {
			// Adding the lamp to the player's inventory
			// TODO: replace this with shorthand function
			inventory.update((inven) => {
				inven.addItem("crude_oil_lamp");
				return inven;
			});

			gear.update((gear) => {
				gear.setSlot("secondary", "crude_oil_lamp");
				return gear;
			});
		}

		getText(): string {
			return "Acquired Crude Oil Lamp";
		}

		getOptions(): EventOption[] {
			return [
				...(state.intro.examinedSelf
					? []
					: [{ text: "Examine self", nextEvent: eventData.intro_passage_a1 }]),
				{ text: "Keep walking", nextEvent: eventData.intro_passage_2 },
			];
		}
	})("faint"),

	intro_passage_2: new (class extends GameEvent {
		getText(): string {
			return (
				"Further down the corridor are more lamps like the first, spaced roughly fifty steps " +
				"apart. The illumination is paltry and inadequate, but " +
				(hasItem("crude_oil_lamp")
					? "it is certainly preferable to nothing at all."
					: "the lamp you are holding makes up for it.")
			);
		}

		getOptions(): EventOption[] {
			return [{ text: "Continue", nextEvent: eventData.template }];
		}
	})(),

	error: new (class extends GameEvent {
		getText(): string {
			return "ERROR: Invalid event.";
		}

		getOptions(): EventOption[] {
			return [{ text: "Continue", nextEvent: eventData.template }];
		}
	})("red"),

	template: new (class extends GameEvent {
		getText(): string {
			return "This is a template event.";
		}

		getOptions(): EventOption[] {
			return [
				{ text: "Example option", nextEvent: eventData.template },
				{
					text: "Another option",
					nextEvent: eventData.template,
					clearEvents: true,
					onClick: () => {},
				},
			];
		}
	})("default", 25),
};

function hasItem(id: string): boolean {
	return player.inventory.hasItem(id) || player.gear.hasItem(id);
}

export default eventData;
