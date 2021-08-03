import { Item, Armor, Weapon, Accessory, Consumable } from "./item";
import { player, resources } from "../stores/player";

type ItemMap = {
	[key: string]: Item;
};

const itemData: ItemMap = {
	strange_tooth: new (class extends Item {
		getDescription(): string {
			return "A tooth from the jaw of an unidentified creature, scavenged from the cavern in which you awoke.";
		}
	})("Strange Tooth", 1, 10, "artifact"),

	crude_oil_lamp: new (class extends Item {
		readonly slot = "secondary";
		getDescription(): string {
			return "A roughly constructed but long-lasting oil lamp that provides only the barest amount of light.";
		}
	})("Crude Oil Lamp", 5, 20, "tool"),

	blunt_chisel: new (class extends Weapon {
		readonly cooldown = 1.0;
		readonly damage = 4;
		readonly slot = "secondary";

		getDescription(): string {
			return (
				"A worn carving chisel abandoned by some unknown entity. Can be used as a bladed weapon, " +
				"though doing so probably isn't very effective."
			);
		}
	})("Blunt Chisel", 3, 10),

	quartz_charm: new (class extends Accessory {
		whileActive(): void {
			// Player gains increased stamina regen after attacking
		}

		getEffectDesc(): string {
			return "Regenerate 1 stamina every 2 seconds in combat.";
		}

		getDescription(): string {
			return "A small, translucent gemstone that glows when squeezed.";
		}
	})("Quartz Charm", 3, 35),

	healsprout: new (class extends Consumable {
		singleUse = true;

		onUse(): void {
			resources.update((res) => {
				res.health.adjust(5);
				return res;
			});
		}

		getUseDesc(): string {
			return "Instantly restore 5 health.";
		}

		getDescription(): string {
			return (
				"A purple, vine-like herb renowned for its healing and magic-enhancing properties. " +
				"It is typically found on the walls and ceilings of caves near underground energy sources."
			);
		}
	})("Healsprout", 1, 10),

	chainmail_hood: new (class extends Armor {
		readonly protection = 5;
		readonly slot = "head";

		getDescription(): string {
			return (
				"A lightweight, flexible piece of head armor. Provides a decent amount of protection, but " +
				"heavier blows will still hurt."
			);
		}
	})("Chainmail Hood", 10, 50),

	error: new (class extends Item {
		getDescription(): string {
			return "ERROR: Invalid item.";
		}
	})("Error", 0, 0),
};

export default itemData;
