import { playerInventory } from "../stores/inventory";

class PlayerAccessories {
  public max: number;
  private list: string[];

  constructor(max: number) {
    this.list = [];
    this.max = max;
  }

  public count() {
    return this.list.length;
  }

  public maxEquipped() {
    return this.list.length >= this.max;
  }

  public add(id: string) {
    if (this.list.length >= this.max) return;
    if (!playerInventory.hasItem(id)) return;

    playerInventory.removeItem(id, 1);
    this.list.push(id);
  }

  public remove(id: string) {
    const itemIndex = this.list.findIndex((item) => item === id);
    if (itemIndex === -1) return;

    this.list.splice(itemIndex);
    playerInventory.addItem(id);
  }

  public reset() {
    this.list.forEach((item) => {
      playerInventory.addItem(item);
    });

    this.list = [];
  }
}

export default PlayerAccessories;
