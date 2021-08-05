<script lang="ts">
	import { inspectTarget } from "../../../scripts/stores/inspectTarget";
	import { settings } from "../../../scripts/stores/settings";
	import itemData from "../../../scripts/items/itemData";
	import InspectItem from "./InspectItem.svelte";

	$: {
		if ($settings.gameHints && !$inspectTarget.id) {
			$inspectTarget.type = "help";
		} else if (!$settings.gameHints && $inspectTarget.type === "help") {
			$inspectTarget.type = "";
		}
	}
</script>

<div class="InspectPanel overflow-wrapper">
	{#if $inspectTarget.type !== "help" && $inspectTarget.type !== ""}
		<button
			class="text closeButton"
			on:click={() => ($inspectTarget = { type: "", id: "" })}>&#9587;</button
		>
	{/if}

	<p>
		{#if $inspectTarget.type === "item"}
			{itemData[$inspectTarget.id].name ?? itemData["error"].name}
		{:else if $inspectTarget.type === "unit"}
			Unit
		{:else}
			Inspect
		{/if}
	</p>

	<div class="inspect-data flex-overflow">
		{#if $inspectTarget.type === "item"}
			<InspectItem id={$inspectTarget.id} />
		{:else if $inspectTarget.type === "unit"}
			<!-- Inspecting a unit -->
			<p>What is this {$inspectTarget.id} gonna do? Kill me?</p>
		{:else if $inspectTarget.type === "help"}
			<p style="color: var(--border-color); text-align: center">
				Click on item, unit, and ability names to learn more about them!
			</p>
		{/if}
	</div>
</div>

<style>
	.InspectPanel {
		position: relative;
		padding: 0.5rem;
		outline: var(--border-color) 1px solid;
	}

	.inspect-data {
		text-align: left;
		width: max(20rem, 80%);
		max-width: 100%;
		margin: auto;
	}

	.closeButton {
		color: var(--main-color);
		line-height: 100%;
		user-select: none;

		position: absolute;
		right: 0.5rem;
		top: 0.5rem;
	}
</style>
