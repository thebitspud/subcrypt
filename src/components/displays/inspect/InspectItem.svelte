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
		if (i.singleUse) discardItem(false);
	}

	function discardItem(displayText = true) {
		$inventory.removeItem(id, 1);
		if (!$inventory.hasItem(id)) $inspectTarget = { type: "", id: "" };
		inventory.update((o) => o);
		// if (displayText) {
		// 	const options = $eventList[$eventList.length - 1].getOptions();
		// 	$eventList = [...$eventList, new ItemEvent(id, false, options)];
		// }
	}
</script>

<div class="InspectItem">
	<!-- General information -->
	<p>
		Category: {capitalize(item.category)}
		<br />Weight: {item.weight}
		{#if item.slot}<br />Slot: {capitalize(item.slot)}{/if}
	</p>

	<!-- Category-specific information -->
	<p>
		{#if item instanceof Armor}
			Protection: {item.protection}
		{:else if item instanceof Weapon}
			Damage: {item.damage}
			<br />Cooldown: {item.cooldown}s
		{:else if item instanceof Accessory}
			Effect: {item.getEffectDesc()}
		{:else if item instanceof Consumable}
			On Use: {item.getUseDesc()}
			<br />Single Use: {capitalize(item.singleUse.toString())}
		{/if}
	</p>

	<!-- Interaction buttons -->
	{#if $inventory.hasItem(id) || $gear.hasItem(id) || $accessories.hasItem(id)}
		{#if item instanceof Accessory}
			<button on:click={equipAccessory}>
				{$accessories.hasItem(id) ? "Unequip" : "Equip"}
			</button>
		{:else if item.slot}
			<button on:click={equipItem}>
				{$gear.hasItem(id) ? "Unequip" : "Equip"}
			</button>
		{:else if item instanceof Consumable}
			<button on:click={useItem}>Use Item</button>
		{/if}
		{#if $inventory.hasItem(id)}
			<button on:click={discardItem}>Discard</button>
		{/if}
	{/if}

	<!-- Description -->
	<p>{item.getDescription()}</p>
</div>

<style></style>
