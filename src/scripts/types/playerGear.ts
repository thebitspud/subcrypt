import { playerInventory } from "../stores/inventory";
import PlayerAccessories from "./playerAccessories";

export type GearCategories =
  | "primary"
  | "secondary"
  | "head"
  | "body"
  | "legs"
  | "feet";

class PlayerGear {
  private slots: Map<GearCategories, string>;
  public accessories: PlayerAccessories;

  constructor(
    slots?: Map<GearCategories, string>,
    accessories?: PlayerAccessories
  ) {
    this.slots = slots ?? new Map<GearCategories, string>();
    this.accessories = accessories ?? new PlayerAccessories(3);
  }

  public getSlot(slot: GearCategories) {
    return this.slots.get(slot);
  }

  public setSlot(slot: GearCategories, id: string) {
    if (!playerInventory.hasItem(id)) return;

    playerInventory.removeItem(id, 1);
    playerInventory.addItem(this.slots.get(slot));
    this.slots.set(slot, id);
  }

  public removeSlot(slot: GearCategories) {
    playerInventory.addItem(this.slots.get(slot));
    this.slots.delete(slot);
  }

  public reset() {
    this.slots.clear();
    this.accessories.reset();
  }
}

export default PlayerGear;
