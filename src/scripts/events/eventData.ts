import GameEvent, { EventOption } from "./gameEvent";
import { gear, inventory, player } from "../stores/player";
import { stateObject as state } from "../stores/stateData";
import ItemEvent, { itemEventOptions } from "./itemEvent";

const eventData = {
	intro_1: new (class extends GameEvent {
		getText(): string {
			return (
				"You wake up on your back, breathing heavily and covered with sweat. As you come to your " +
				"senses, a feeling of dread and panic sets in."
			);
		}

		getOptions(): EventOption[] {
			inventory.update((inven) => {
				inven.addItem("healsprout", 5);
				return inven;
			});

			return [{ text: "Continue", nextEvent: eventData.intro_2 }];
		}
	})(),

	intro_2: new (class extends GameEvent {
		getText(): string {
			return (
				"Although your eyes are wide open, there is nothing to see. No dawn light, no night sky, " +
				"not even your hands in front of you. Nothing but the pitch black of this miserable place."
			);
		}

		getOptions(): EventOption[] {
			inventory.update((inven) => {
				inven.addItem("blunt_chisel");
				return inven;
			});

			return [{ text: "Get up", nextEvent: eventData.intro_3 }];
		}
	})(),

	intro_3: new (class extends GameEvent {
		getText(): string {
			return (
				"Slowly, you raise yourself off the rugged stone floor and into a crouched position. Now " +
				"obvious is the musty and unmistakably earthy smell permeating the air, not much different " +
				"from that of a freshly tilled field."
			);
		}

		getOptions(): EventOption[] {
			inventory.update((inven) => {
				inven.addItem("quartz_charm");
				return inven;
			});

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
		getText(): string {
			return (
				"Your hands encounter something too smooth and light to be a rock. Upon holding and feeling " +
				"it, you realize that the object is conical and curved to a sharp point."
			);
		}

		getOptions(): EventOption[] {
			state.intro.examinedGround = true;

			return itemEventOptions("strange_tooth", [
				{ text: "Keep searching", nextEvent: eventData.intro_a3 },
				...(state.intro.examinedArea
					? [{ text: "To the light", nextEvent: eventData.intro_5 }]
					: [{ text: "Examine surroundings", nextEvent: eventData.intro_4 }]),
			]);
		}
	})(),

	intro_a3: new (class extends GameEvent {
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
		getText(): string {
			return (
				"While surveying the surrounding darkness, you notice a faint, flickering light emanating " +
				"from some unknown source in the distance."
			);
		}

		getOptions(): EventOption[] {
			state.intro.examinedArea = true;
			inventory.update((inven) => {
				inven.addItem("chainmail_hood");
				return inven;
			});

			return [
				...(state.intro.examinedGround
					? []
					: [{ text: "Examine ground", nextEvent: eventData.intro_a1 }]),
				{ text: "To the light", nextEvent: eventData.intro_5 },
			];
		}
	})(),

	intro_5: new (class extends GameEvent {
		getText(): string {
			return (
				"Still unsure of where you are and without any better ideas, you cautiously make your way " +
				"towards the light."
			);
		}

		getOptions(): EventOption[] {
			inventory.update((inven) => {
				inven.addItem("healsprout", 5);
				return inven;
			});

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
		getText(): string {
			return (
				"Now illuminated by the lamp, you are able to get a better view of yourself. It appears " +
				"that you are still dressed in the loose-fitting desert clothing you last remember, stained " +
				"by sweat and dust."
			);
		}

		getOptions(): EventOption[] {
			state.intro.examinedSelf = true;

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
		getText(): string {
			return (
				"The lamp is modest and functional, consisting of nothing more than a primitive metal " +
				"frame, a wick, and a fuel reservoir containing some dark, viscous oil. It hangs from a " +
				"rusting hook hammered into the rough stone wall at just below shoulder height."
			);
		}

		getOptions(): EventOption[] {
			state.intro.examinedLamp = true;

			return [
				{ text: "Take lamp", nextEvent: eventData.intro_passage_b2 },
				...(state.intro.examinedSelf
					? []
					: [{ text: "Examine self", nextEvent: eventData.intro_passage_a1 }]),
				{ text: "Keep walking", nextEvent: eventData.intro_passage_2 },
			];
		}
	})(),

	intro_passage_b2: new (class extends ItemEvent {
		/**
		 * Adds the lamp to the player's secondary gear slot
		 * @override
		 */
		getOptions(): EventOption[] {
			inventory.update((inven) => {
				inven.addItem(this.id);
				return inven;
			});

			gear.update((gear) => {
				gear.setSlot("secondary", this.id);
				return gear;
			});

			return [
				...(state.intro.examinedSelf
					? []
					: [{ text: "Examine self", nextEvent: eventData.intro_passage_a1 }]),
				{ text: "Keep walking", nextEvent: eventData.intro_passage_2 },
			];
		}
	})("crude_oil_lamp", true, []),

	intro_passage_2: new (class extends GameEvent {
		getText(): string {
			return (
				"Further down the corridor are more lamps like the first, spaced roughly fifty steps " +
				"apart. The illumination is paltry and inadequate, but " +
				(hasItem("crude_oil_lamp")
					? "the lamp you are holding makes up for it."
					: "it is certainly preferable to nothing at all.")
			);
		}

		getOptions(): EventOption[] {
			return [{ text: "Continue", nextEvent: eventData.intro_passage_3 }];
		}
	})(),

	intro_passage_3: new (class extends GameEvent {
		getText(): string {
			return (
				"The sounds of your footsteps echo lightly off the walls, punctuated by the occasional " +
				"water droplet hitting the floor. For a brief moment, a faint scratching sound can be " +
				"heard from further down the passage."
			);
		}

		getOptions(): EventOption[] {
			return [
				{ text: "Stop and listen", nextEvent: eventData.intro_passage_c1 },
				{ text: "Keep walking", nextEvent: eventData.intro_passage_4 },
			];
		}
	})(),

	intro_passage_c1: new (class extends GameEvent {
		getText(): string {
			return "You stop walking and listen intently, but the noise does not return.";
		}

		getOptions(): EventOption[] {
			return [{ text: "Keep walking", nextEvent: eventData.intro_passage_4 }];
		}
	})(),

	intro_passage_4: new (class extends GameEvent {
		getText(): string {
			return (
				"Opposite the fourth lamp you cross is some sort of bladed implement jammed into a " +
				"crevice in the wall. Its worn wooden handle sticks out of the fissure, parallel to the " +
				"ground."
			);
		}

		getOptions(): EventOption[] {
			return [
				{ text: "Pry it out", nextEvent: eventData.intro_passage_d1 },
				{ text: "Ignore it", nextEvent: eventData.template },
			];
		}
	})(),

	intro_passage_d1: new (class extends GameEvent {
		getText(): string {
			return (
				"It takes a while, but you are able to wrest the tool out of the crevice. It is a " +
				"scratched up and dirt-stained chisel, with edges blunt from use."
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
