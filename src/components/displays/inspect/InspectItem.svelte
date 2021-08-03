<script lang="ts">
	import {
		Armor,
		Weapon,
		Accessory,
		Consumable,
	} from "../../../scripts/items/item";
	import { gear, inventory, accessories } from "../../../scripts/stores/player";
	import itemData from "../../../scripts/items/itemData";
	import type { GearSlots } from "../../../scripts/player/playerGear";
	import { inspectTarget } from "../../../scripts/stores/inspectTarget";

	export let id: string;
	$: item = itemData[id] ?? itemData["error"];

	function capitalize(s: string): string {
		return s[0].toUpperCase() + s.slice(1).toLowerCase();
	}

	function equipItem() {
		const slot: GearSlots = item["slot"];
		if (!slot) return;

		if ($gear.hasItem(id)) $gear.removeSlot(slot);
		else $gear.setSlot(slot, id);
		gear.update((o) => o);
		inventory.update((o) => o);
	}

	function equipAccessory() {
		if (!(item instanceof Accessory)) return;

		if ($accessories.hasItem(id)) $accessories.removeItem(id);
		else $accessories.addItem(id);
		accessories.update((o) => o);
		inventory.update((o) => o);
	}

	function useItem() {
		if (!(item instanceof Consumable)) return;
		const i = <Consumable>item;

		i.onUse();
		if (i.singleUse) {
			$inventory.removeItem(id, 1);
			if (!$inventory.hasItem(id)) $inspectTarget = { type: "", id: "" };
			inventory.update((o) => o);
		}
	}
</script>

<div class="InspectItem">
	<p>
		Category: {capitalize(item.category)}
		<br />Weight: {item.weight}
		{#if item.slot}<br />Slot: {capitalize(item.slot)}{/if}
	</p>
	{#if item instanceof Armor}
		<p>Protection: {item.protection}</p>
	{:else if item instanceof Weapon}
		<p>
			Damage: {item.damage}
			<br />Cooldown: {item.cooldown}s
		</p>
	{:else if item instanceof Accessory}
		<p>Effect: {item.getEffectDesc()}</p>
		<button on:click={equipAccessory}>
			{$accessories.hasItem(id) ? "Unequip" : "Equip"}
		</button>
	{:else if item instanceof Consumable}
		<p>
			On Use: {item.getUseDesc()}
			<br />Single Use: {capitalize(item.singleUse.toString())}
		</p>
		<button on:click={useItem}>Use Item</button>
	{/if}
	{#if item.slot}
		<button on:click={equipItem}>
			{$gear.hasItem(id) ? "Unequip" : "Equip"}
		</button>
	{/if}

	<p>{item.getDescription()}</p>
</div>

<style></style>
