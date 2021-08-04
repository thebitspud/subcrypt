import GameEvent, { EventOption } from "./gameEvent";
import { inventory, player } from "../stores/player";
import { inspectTarget } from "../stores/inspectTarget";
import itemData from "../items/itemData";

class ItemEvent extends GameEvent {
	/**
	 * Creates an ItemEvent according to the specified parameters
	 * @param id item identifier
	 * @param pickup whether to add the item to the player's inventory
	 * <br>If false, discard the item instead
	 * @param options next set of event options
	 */
	constructor(
		public readonly id: string,
		public readonly pickup: boolean,
		public readonly options: EventOption[]
	) {
		super("faint");
	}

	getOptions(): EventOption[] {
		if (this.pickup) {
			inventory.update((inven) => {
				inven.addItem(this.id);
				return inven;
			});
		}

		return this.options;
	}

	getText(): string {
		return this.pickup ? "Acquired" : "Discarded";
	}
}

/**
 * Generates event options for an ItemEvent prompt to pick up or discard a given item
 * @param id item identifier
 * @param options next set of event options
 * @param canInspect whether the inspect option is shown
 * @param canDiscard whether the discard option is shown
 */
export function itemEventOptions(
	id: string,
	options: EventOption[],
	canInspect = true,
	canDiscard = true
): EventOption[] {
	const inspectOption = {
		text: "Inspect",
		nextEvent: undefined,
		onClick: () => {
			inspectTarget.update((target) => {
				return {
					type: "item",
					id: id ?? "error",
				};
			});
		},
	};

	const hasInvenSpace: boolean =
		(player.resources.weight.now + itemData[id]?.weight ?? 0) <=
		player.resources.weight.max;

	return [
		...(canInspect ? [inspectOption] : []),
		...(hasInvenSpace || !canDiscard
			? [{ text: "Pick up", nextEvent: new ItemEvent(id, true, options) }]
			: []),
		...(canDiscard
			? [{ text: "Discard", nextEvent: new ItemEvent(id, false, options) }]
			: []),
	];
}

export default ItemEvent;
