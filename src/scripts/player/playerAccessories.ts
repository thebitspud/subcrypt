/** Utility class for managing the player's equipped accessories */
import type PlayerInventory from "./playerInventory";

class PlayerAccessories {
	/**
	 * Creates an accessory list according to the specified parameters
	 * @param inven Reference to inventory object to operate on
	 * @param max number of accessories that can be equipped at once
	 * @param list (optional, default: empty) manually configured list of initial accessories
	 */
	constructor(
		private inven: PlayerInventory,
		public max: number,
		public list: string[] = []
	) {}

	/**
	 * If possible, equips the specified item as an accessory
	 * <br>Equipping an accessory removes it from the player's general inventory
	 * <br>Duplicate accessories cannot be equipped
	 * @param id accessory identifier
	 */
	public add(id: string) {
		if (this.list.length >= this.max) return;
		if (!this.inven.hasItem(id)) return;
		if (this.list.findIndex((item) => item === id) !== -1) return;

		this.inven.removeItem(id, 1);
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
		this.inven.addItem(id);
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
		this.list.forEach((item) => this.inven.addItem(item));
		this.list = [];
	}
}

export default PlayerAccessories;
