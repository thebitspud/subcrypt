import type { ArmorSlots, GearSlots } from "../player/playerGear";

type ItemCategory =
	| "generic"
	| "artifact"
	| "material"
	| "consumable"
	| "armor"
	| "weapon"
	| "accessory"
	| "tool";

export abstract class Item {
	/**
	 * Creates an item with the specified parameters. Item subtypes are specified
	 * @param name The displayed label for the item
	 * @param weight How much the item weighs (in relative game units)
	 * @param sellValue How much the item can be sold for. A Negative number indicates that the item
	 * @param category (Optional, default: generic) What the item is classified as (for sorting purposes)
	 * cannot be sold at all.
	 */
	constructor(
		public readonly name: string,
		public readonly weight: number,
		public readonly sellValue: number,
		public readonly category: ItemCategory = "generic"
	) {}

	/** Returns a generated string description for the item */
	public abstract getDescription(): string;
}

/** Any item that has an on-use activated effect */
export abstract class Consumable extends Item {
	public readonly category: ItemCategory = "consumable";
	public readonly singleUse = true;
	public abstract onUse(): void;
	public abstract getUseDesc(): string;
}

/** Any tool that can equipped in the secondary slot */
export abstract class Tool extends Item {
	public readonly category: ItemCategory = "tool";
	public readonly slot: GearSlots = "secondary";
}

/** Any piece of equipable armor as an item */
export abstract class Armor extends Item {
	public readonly category: ItemCategory = "armor";
	public abstract protection: number;
	public abstract slot: ArmorSlots;
	public whileActive() {}
}

/** Any equipable weapon or tool with combat capabilities */
export abstract class Weapon extends Item {
	public readonly category: ItemCategory = "weapon";
	public readonly slot: GearSlots = "primary";
	public abstract damage: number;
	public abstract cooldown: number;
	public onAttack() {}
	public whileActive() {}
}

/** Any equipable accessory as an item */
export abstract class Accessory extends Item {
	public readonly category: ItemCategory = "accessory";
	public abstract whileActive(): void;
	public abstract getEffectDesc(): string;
}
