<script lang="ts">
	import { inspectTarget } from "../../../scripts/stores/inspectTarget";
	import { settings } from "../../../scripts/stores/settings";
	import { gear, inventory } from "../../../scripts/stores/player";
	import itemData from "../../../scripts/items/itemData";
	import {
		Armor,
		Weapon,
		Accessory,
		Consumable,
	} from "../../../scripts/items/item";
	import type { GearSlots } from "../../../scripts/player/playerGear";

	$: {
		if ($settings.gameHints && !$inspectTarget.id) {
			$inspectTarget.type = "help";
		} else if (!$settings.gameHints && $inspectTarget.type === "help") {
			$inspectTarget.type = "";
		}
	}

	$: item = itemData[$inspectTarget.id] ?? itemData["error"];

	function capitalize(s: string): string {
		return s[0].toUpperCase() + s.slice(1).toLowerCase();
	}

	function equipItem() {
		const slot: GearSlots = item?.slot;
		if (!slot) return;

		if ($gear.hasItem($inspectTarget.id)) $gear.removeSlot(slot);
		else $gear.setSlot(slot, $inspectTarget.id);
		gear.update((o) => o);
		inventory.update((o) => o);
	}
</script>

<div class="InspectPanel overflow-wrapper">
	{#if $inspectTarget.type === "item"}
		<p>{item.name}</p>
	{:else if $inspectTarget.type === "enemy"}
		<p>Enemy</p>
	{:else}
		<p>Inspect</p>
	{/if}
	<div class="inspect-data flex-overflow">
		{#if $inspectTarget.type === "item"}
			<!-- Inspecting an item -->
			<p>
				<!-- Item stats -->
				Weight: {item.weight}
				<br />Category: {capitalize(item.category)}
				{#if item.slot}<br />Slot: {capitalize(item.slot)}{/if}
				{#if item instanceof Armor}
					<br />Protection: {item.protection}
				{:else if item instanceof Weapon}
					<br />Damage: {item.damage}
					<br />Cooldown: {item.cooldown}s
				{:else if item instanceof Accessory}
					<br />Slot: Accessory
				{:else if item instanceof Consumable}
					<br />Single Use: {capitalize(item.singleUse)}
				{/if}
			</p>

			<!-- Item description -->
			<p>{item.getDescription()}</p>
			{#if item.slot}
				<button on:click={equipItem}>
					{$gear.hasItem($inspectTarget.id) ? "Unequip" : "Equip"}
				</button>
			{/if}
		{:else if $inspectTarget.type === "enemy"}
			<!-- Inspecting an enemy -->
			<p>What is this {$inspectTarget.id} gonna do? Kill me?</p>
		{:else if $inspectTarget.type === "help"}
			<p style="color: var(--border-color)">
				Click on item, enemy, and ability names (usually colorful text) to learn
				more about them!
			</p>
		{/if}
	</div>
</div>

<style>
	.InspectPanel {
		padding: 0.5rem;
		outline: var(--border-color) 1px solid;
	}

	.inspect-data {
		text-align: left;
		width: max(20rem, 80%);
		max-width: 100%;
		margin: auto;
	}
</style>
