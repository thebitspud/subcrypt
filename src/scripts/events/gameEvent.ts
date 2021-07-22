type ColorProfile = "default" | "faint" | "red" | "blue" | "green" | "purple";

/** Type for option buttons that play subsequent events when clicked */
type EventOption = {
	text: string;
	nextEvent: GameEvent;
	clearEvents?: boolean;
	onClick?: () => void;
};

/** A catch-all class for generic game events displayed as text */
abstract class GameEvent {
	public options: EventOption[] = [];

	/**
	 * Creates a new game event according to the specified parameters
	 * @param text Text data paragraph to be displayed when event is played
	 * @param textColor (optional, default: CSS main-color) Color of printed text
	 * @param textSpeed (optional, default: 50) Time (in ms) taken to print each consecutive character
	 */
	constructor(
		public readonly text: string,
		public readonly textColor: ColorProfile = "default",
		public readonly textSpeed = 30
	) {}

	/**
	 * Sets the event's options: one-shot buttons that play subsequent events when clicked
	 * <br>This function is called when the event node finishes transitioning in
	 */
	public abstract setOptions(): void;

	/** Returns the time (in ms) required to finish the event node's typewriter transition */
	public getDuration(): number {
		return this.textSpeed * this.text.length;
	}
}

export default GameEvent;
