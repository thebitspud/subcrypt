type ColorProfile = "default" | "faint" | "red" | "blue" | "green" | "purple";

/** Type for option buttons that play subsequent events when clicked */
type EventOption = {
	text: string;
	nextEvent: string;
	onClick?: () => void;
};

/** A catch-all class for generic game events displayed as text */
abstract class GameEvent {
	protected options: EventOption[] = [];

	/**
	 * Creates a new game event according to the specified parameters
	 * @param text Text data paragraph to be displayed when event is played
	 * 	 * @param textColor (optional, default: CSS main-color) Color of printed text
	 * @param textSpeed (optional, default: 50) Time (in ms) taken to print each consecutive character
	 */
	constructor(
		public readonly text: string,
		public readonly textColor: ColorProfile = "default",
		public readonly textSpeed = 50
	) {}

	/**
	 * Sets the event's options: one-shot buttons that play subsequent events when clicked.
	 * <br>Options are displayed after the event has finished transitioning in.
	 */
	abstract setOptions(): void;

	/** Returns an HTML string that displays the event's option buttons */
	public displayOptions(): string {
		let result = "";
		this.options.forEach((o) => {
			result += "<br />" + o.text;
		});
		return result.replace("<br />", "");
	}

	/** Returns the time (in ms) required to finish the event node's typewriter transition */
	public getDuration(): number {
		return this.textSpeed * this.text.length;
	}
}

export default GameEvent;
