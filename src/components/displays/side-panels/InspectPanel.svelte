<script lang="ts">
	import { inspectTarget } from "../../../scripts/stores/inspectTarget";
	import { settings } from "../../../scripts/stores/settings";
	import itemData from "../../../scripts/items/itemData";

	$: {
		if ($settings.gameHints && !$inspectTarget.id) {
			$inspectTarget.type = "help";
		} else if (!$settings.gameHints && $inspectTarget.type === "help") {
			$inspectTarget.type = "";
		}
	}
</script>

<div class="InspectPanel overflow-wrapper">
	{#if $inspectTarget.type === "item"}
		<p>{itemData[$inspectTarget.id].name}</p>
	{:else if $inspectTarget.type === "enemy"}
		<p>Enemy</p>
	{:else}
		<p>Inspect</p>
	{/if}
	<div class="inspect-data flex-overflow">
		{#if $inspectTarget.type === "item"}
			<p>Weight: {itemData[$inspectTarget.id].weight}</p>
			<p>{itemData[$inspectTarget.id].getDescription()}</p>
		{:else if $inspectTarget.type === "enemy"}
			<p>What is this {$inspectTarget.id} supposed do? Kill me?</p>
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
