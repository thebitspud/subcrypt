/** Valid sets of colors for event text */
type ColorProfile = "default" | "faint" | "red" | "blue" | "green" | "purple";

/** Type for option buttons that play subsequent events when clicked */
export type EventOption = {
	text: string;
	nextEvent: GameEvent;
	clearEvents?: boolean;
	onClick?: () => void;
};

/** A catch-all class for generic game events displayed as text */
abstract class GameEvent {
	/**
	 * Creates a new game event according to the specified parameters
	 * @param textColor (optional, default: CSS main-color) Color of printed text
	 * @param textSpeed (optional, default: 50) Time (in ms) taken to print each consecutive character
	 */
	constructor(
		public readonly textColor: ColorProfile = "default",
		public readonly textSpeed = 25
	) {}

	/**
	 * The text data paragraph to be displayed when event is played
	 * <br>This function is called when the event node's text is displayed
	 */
	public abstract getText(): string;

	/**
	 * Optional single-use method that runs when an event is first played.
	 * <br>Can be used in conjunction with EventOption.onClick(). In this scenario,
	 * onPlay() is always triggered after onClick().
	 */
	public onPlay(): void {}

	/**
	 * Sets the event's options: one-shot buttons that play subsequent events when clicked
	 * <br>This function is called when the event node finishes transitioning in
	 */
	public abstract getOptions(): EventOption[];

	/** Returns the time (in ms) required to finish the event node's typewriter transition */
	public getDuration(): number {
		return this.textSpeed * this.getText().length;
	}
}

export default GameEvent;
