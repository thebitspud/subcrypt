/** Combination type consisting of all valid gear slot names */
import type PlayerInventory from "./playerInventory";

export type ArmorSlots = "head" | "body" | "legs" | "feet";
export type WeaponSlots = "primary" | "secondary";
export type GearSlots = ArmorSlots | WeaponSlots;

/** Utility class for managing the player's gear slots */
class PlayerGear {
	/**
	 * Creates a new gear profile for the player according to the specified parameters
	 * @param inven Reference to inventory object to operate on
	 * @param slots (optional, default: empty) manually configured list of filled gear slots
	 */
	constructor(
		private inven: PlayerInventory,
		public slots = new Map<GearSlots, string>()
	) {}

	/**
	 * Returns the item currently equipped in the specified slot, or undefined if none
	 * @param slot any valid gear category
	 */
	public getSlot(slot: GearSlots) {
		return this.slots.get(slot);
	}

	/**
	 * Returns true if the player has the specified item(s) in their inventory
	 * @param id item identifier, or undefined to return false
	 */
	public hasItem(id: string): boolean {
		for (let value of this.slots.values()) {
			if (id === value) return true;
		}

		return false;
	}

	/**
	 * If possible, equips the specified item in the specified slot
	 * <br>Equipping an item removes it from the player's general inventory
	 * <br>Only one item can be equipped per gear category
	 * @param slot any valid gear category
	 * @param id item identifier
	 */
	public setSlot(slot: GearSlots, id: string) {
		if (!this.inven.hasItem(id)) return;

		this.inven.removeItem(id, 1);
		this.inven.addItem(this.slots.get(slot));
		this.slots.set(slot, id);
	}

	/**
	 * If possible, unequips the item in the specified slot
	 * <br>Successfully unequipping an item returns it to the player's general inventory
	 * @param slot any valid gear category
	 */
	public removeSlot(slot: GearSlots) {
		if (!this.slots.has(slot)) return;

		this.inven.addItem(this.slots.get(slot));
		this.slots.delete(slot);
	}

	/**
	 * Completely empties and resets the player's gear profile,
	 * returning all equipped items back to their general inventory.
	 */
	public reset() {
		this.slots.forEach((i) => this.inven.addItem(i));
		this.slots.clear();
	}
}

export default PlayerGear;
