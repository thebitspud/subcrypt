import GameEvent from "./gameEvent";

const eventData = {
	intro_1: new (class extends GameEvent {
		setOptions(): void {
			this.options = [{ text: "Next", nextEvent: eventData.intro_2 }];
		}
	})(
		"Cyan has called an emergency meeting, " +
			"claiming they have evidence that you (Red) are the impostor."
	),

	intro_2: new (class extends GameEvent {
		setOptions(): void {
			this.options = [{ text: "Next", nextEvent: eventData.intro_3 }];
		}
	})("The impostor is suspicious!", "red"),

	intro_3: new (class extends GameEvent {
		setOptions(): void {
			this.options = [
				{ text: "Restart", nextEvent: eventData.intro_1, clearEvents: true },
			];
		}
	})("You have been ejected.", "default", 100),

	template: new (class extends GameEvent {
		setOptions(): void {
			this.options = [
				{ text: "Button", nextEvent: eventData.template, onClick: () => {} },
			];
		}
	})("This is a template event.", "default", 30),
};

export default eventData;
