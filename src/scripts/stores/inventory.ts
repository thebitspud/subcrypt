import { writable } from "svelte/store";

/** Initializes and returns a writable store to represent the player's inventory */
function createInventory() {
	const { subscribe, update } = writable(new Map<string, number>());

	/**
	 * Adds the specified item to the player's inventory
	 * @param id item identifier, or undefined to do nothing
	 * @param qty (optional, default: 1) quantity of the given item to add
	 */
	function addItem(id: string | undefined, qty?: number) {
		if (!id) return;
		const addCount = qty ?? 1;
		if (addCount <= 0) {
			// Converting negative quantity requests to item removal
			removeItem(id, -addCount);
			return;
		} else {
			update((i) => {
				i.set(id, (i.get(id) ?? 0) + addCount);
				return i;
			});
		}
	}

	/**
	 * If possible, removes the specified item from the player's inventory
	 * @param id item identifier, or undefined to do nothing
	 * @param qty (optional, default: all) quantity of the given item to remove
	 */
	function removeItem(id: string | undefined, qty?: number) {
		if (!id) return;
		const removeCount = qty ?? 1;
		if (removeCount <= 0) {
			// Converting negative quantity requests to item addition
			addItem(id, -removeCount);
		} else {
			update((i) => {
				if (!qty || removeCount >= (i.get(id) ?? 0)) {
					// If quantity is left as default (all) OR the specified quantity to remove exceeds the
					// number in the player's current inventory, delete the entry itself
					i.delete(id);
				} else i.set(id, (i.get(id) ?? 0) - removeCount);

				return i;
			});
		}
	}

	/**
	 * Returns true if the player has the specified item(s) in their inventory
	 * @param id item identifier, or undefined to return false
	 * @param qty (optional, default: 1) quantity of the given item in the player's inventory
	 * required for the query to return true
	 */
	function hasItem(id: string | undefined, qty?: number): boolean {
		if (!id) return false;
		const adjustedMin = Math.max(qty ?? 1, 1);

		// Can't access the store here using $ so I have to do it like this
		let queryReturn = false;
		update((i) => {
			if ((i.get(id) ?? 0) >= adjustedMin) queryReturn = true;
			return i;
		});
		return queryReturn;
	}

	/** Clears the player's entire inventory */
	function reset() {
		update((i) => {
			i.clear();
			return i;
		});
	}

	return {
		subscribe,
		addItem,
		removeItem,
		hasItem,
		reset,
	};
}

/** The player's inventory as a writable store object, including built-in utility functions */
export const playerInventory = createInventory();
