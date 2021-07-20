import { playerInventory } from "../stores/inventory";
import PlayerAccessories from "./playerAccessories";

/** Combination type consisting of all valid gear slot names */
export type GearCategories = "primary" | "secondary" | "head" | "body" | "legs" | "feet";

/** Utility class for managing the player's gear slots */
class PlayerGear {
	public accessories: PlayerAccessories;
	private slots: Map<GearCategories, string>;

	/**
	 * Creates a new gear profile for the player according to the specified parameters
	 * @param slots (optional, default: empty) manually configured list of filled gear slots
	 * @param accessories (optional, default: empty) manually configured list of accessories to equip
	 */
	constructor(slots?: Map<GearCategories, string>, accessories?: PlayerAccessories) {
		this.slots = slots ?? new Map<GearCategories, string>();
		this.accessories = accessories ?? new PlayerAccessories(3);
	}

	/** Returns the total number of items currently equipped */
	public count() {
		return this.slots.size + this.accessories.list.length;
	}

	/**
	 * Returns the item currently equipped in the specified slot, or undefined if none
	 * @param slot any valid gear category
	 */
	public getSlot(slot: GearCategories) {
		return this.slots.get(slot);
	}

	/**
	 * If possible, equips the specified item in the specified slot
	 * <br>Equipping an item removes it from the player's general inventory
	 * <br>Only one item can be equipped per gear category
	 * @param slot any valid gear category
	 * @param id item identifier
	 */
	public setSlot(slot: GearCategories, id: string) {
		if (!playerInventory.hasItem(id)) return;

		playerInventory.removeItem(id, 1);
		playerInventory.addItem(this.slots.get(slot));
		this.slots.set(slot, id);
	}

	/**
	 * If possible, unequips the item in the specified slot
	 * <br>Successfully unequipping an item returns it to the player's general inventory
	 * @param slot any valid gear category
	 */
	public removeSlot(slot: GearCategories) {
		if (!this.slots.has(slot)) return;

		playerInventory.addItem(this.slots.get(slot));
		this.slots.delete(slot);
	}

	/**
	 * Completely empties and resets the player's gear profile,
	 * returning all equipped items back to their general inventory.
	 */
	public reset() {
		this.accessories.reset();
		this.slots.forEach((i) => playerInventory.addItem(i));
		this.slots.clear();
	}
}

export default PlayerGear;
