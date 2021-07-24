import GameEvent, { EventOption } from "./gameEvent";
import { inventory } from "../stores/player";

const eventData = {
	intro_1: new (class extends GameEvent {
		getText(): string {
			return "You wake up on your back, breathing heavily and covered with sweat. As you come to your senses, a feeling of panic and dread sets in.";
		}

		getOptions(): EventOption[] {
			return [{ text: "Continue", nextEvent: eventData.intro_2 }];
		}
	})(),

	intro_2: new (class extends GameEvent {
		getText(): string {
			return "Although your eyes are wide open, there is nothing to see. No dawn light, no night sky, not even your hands in front of you. Nothing but the pitch black of this wretched place.";
		}

		getOptions(): EventOption[] {
			return [{ text: "Get Up", nextEvent: eventData.intro_3 }];
		}
	})(),

	intro_3: new (class extends GameEvent {
		getText(): string {
			return "Slowly, you raise yourself off the cold stone floor and into a crouched position. Now obvious is the musty and unmistakably earthy smell permeating the air, not much different from that of a freshly tilled field.";
		}

		getOptions(): EventOption[] {
			return [{ text: "Look Around", nextEvent: eventData.intro_4 }];
		}
	})(),

	intro_4: new (class extends GameEvent {
		getText(): string {
			return "Upon surveying the surrounding area, you notice a faint, flickering light emanating from some unknown source in the distance.";
		}

		getOptions(): EventOption[] {
			return [
				{ text: "Check the Ground", nextEvent: eventData.intro_4a },
				{ text: "To the Light", nextEvent: eventData.intro_5 },
			];
		}
	})(),

	intro_4a: new (class extends GameEvent {
		getText(): string {
			return "Your hands touch upon a couple of unnoteworthy rocks before encountering a smooth, light object. Upon holding and feeling it, you notice that the thing is conical and curved to a point.";
		}

		getOptions(): EventOption[] {
			return [
				{
					text: "Pocket it",
					nextEvent: eventData.intro_5,
					onClick: () => {
						inventory.update((inven) => {
							inven.addItem("strange_tooth");
							return inven;
						});
					},
				},
				{ text: "Ignore it", nextEvent: eventData.intro_5 },
			];
		}
	})(),

	intro_5: new (class extends GameEvent {
		getText(): string {
			return "Still unsure of where you are and without any better ideas, you cautiously make your way towards the light.";
		}

		getOptions(): EventOption[] {
			return [
				{ text: "Continue", nextEvent: eventData.template, clearEvents: true },
			];
		}
	})(),

	template: new (class extends GameEvent {
		getText(): string {
			return "This is a template event.";
		}

		getOptions(): EventOption[] {
			return [
				{
					text: "Example Button",
					nextEvent: eventData.template,
					clearEvents: false,
					onClick: () => {},
				},
			];
		}
	})("default", 25),
};

export default eventData;
