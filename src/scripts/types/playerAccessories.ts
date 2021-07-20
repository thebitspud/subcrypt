import { playerInventory } from "../stores/inventory";

/** Utility class for managing the player's equipped accessories */
class PlayerAccessories {
	public max: number;
	public list: string[];

	/**
	 * Creates an empty accessory list with the specified number of slots
	 * @param max number of accessories that can be equipped at once
	 */
	constructor(max: number) {
		this.list = [];
		this.max = max;
	}

	/**
	 * If possible, equips the specified item as an accessory
	 * <br>Equipping an accessory removes it from the player's general inventory
	 * <br>Duplicate accessories cannot be equipped
	 * @param id accessory identifier
	 */
	public add(id: string) {
		if (this.list.length >= this.max) return;
		if (!playerInventory.hasItem(id)) return;
		if (this.list.findIndex((item) => item === id) !== -1) return;

		playerInventory.removeItem(id, 1);
		this.list.push(id);
	}

	/**
	 * If possible, unequips the specified accessory
	 * <br>Unequipping an accessory returns it to the player's general inventory
	 * @param id accessory identifier
	 */
	public remove(id: string) {
		const itemIndex = this.list.findIndex((item) => item === id);
		if (itemIndex === -1) return;

		this.list.splice(itemIndex, 1);
		playerInventory.addItem(id);
	}

	/**
	 * Returns true if the player has the specified accessory equipped
	 * @param id accessory identifier
	 */
	public has(id: string): boolean {
		for (const item in this.list) {
			if (item === id) return true;
		}

		return false;
	}

	/** Returns true if all of the player's accessory slots have been filled */
	public isMaxEquipped(): boolean {
		return this.list.length >= this.max;
	}

	/** Unequips all accessories and returns them to the player's inventory */
	public reset() {
		this.list.forEach((item) => playerInventory.addItem(item));
		this.list = [];
	}
}

export default PlayerAccessories;
