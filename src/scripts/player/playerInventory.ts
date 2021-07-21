/** Utility class for managing the player's general inventory */
class PlayerInventory {
	public items: Map<string, number>;

	/**
	 * Creates a new inventory for the player according to the specified parameters
	 * @param list (optional, default: empty) manually configured Map of initial inventory
	 * items and quantities
	 */
	constructor(list?: Map<string, number>) {
		this.items = list ?? new Map();
	}

	/**
	 * Adds the specified item to the player's inventory
	 * @param id item identifier, or undefined to do nothing
	 * @param qty (optional, default: 1) quantity of the given item to add
	 */
	public addItem(id: string | undefined, qty?: number) {
		if (!id) return;
		const addCount = qty ?? 1;
		if (addCount <= 0) {
			// Converting negative quantity requests to item removal
			this.removeItem(id, -addCount);
			return;
		} else {
			this.items.set(id, (this.items.get(id) ?? 0) + addCount);
		}
	}

	/**
	 * If possible, removes the specified item from the player's inventory
	 * @param id item identifier, or undefined to do nothing
	 * @param qty (optional, default: all) quantity of the given item to remove
	 */
	public removeItem(id: string | undefined, qty?: number) {
		if (!id) return;
		const removeCount = qty ?? 1;
		if (removeCount <= 0) {
			// Converting negative quantity requests to item addition
			this.addItem(id, -removeCount);
		} else {
			if (!qty || removeCount >= (this.items.get(id) ?? 0)) {
				// If quantity is left as default (all) OR the specified quantity to remove exceeds the
				// number in the player's current inventory, delete the entry itself
				this.items.delete(id);
			} else this.items.set(id, (this.items.get(id) ?? 0) - removeCount);
		}
	}

	/**
	 * Returns true if the player has the specified item(s) in their inventory
	 * @param id item identifier, or undefined to return false
	 * @param qty (optional, default: 1) quantity of the given item in the player's inventory
	 * required for the query to return true
	 */
	public hasItem(id: string | undefined, qty?: number): boolean {
		if (!id) return false;
		const adjustedMin = Math.max(qty ?? 1, 1);

		return (this.items.get(id) ?? 0) >= adjustedMin;
	}

	/** Clears the player's entire general inventory */
	public reset() {
		this.items.clear();
	}
}

export default PlayerInventory;
