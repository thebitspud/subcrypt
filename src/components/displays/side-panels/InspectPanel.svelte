<script lang="ts">
	import { inspectTarget } from "../../../scripts/stores/inspectTarget";
	import { settings } from "../../../scripts/stores/settings";

	$: {
		if ($settings.gameHints && !$inspectTarget.id) {
			$inspectTarget.type = "help";
		} else if (!$settings.gameHints && $inspectTarget.type === "help") {
			$inspectTarget.type = "";
		}
	}
</script>

<div class="InspectPanel overflow-wrapper">
	<p>Inspect</p>
	<div class="inspect-data flex-overflow">
		{#if $inspectTarget.type === "item"}
			<p>Nice {$inspectTarget.id} bro!</p>
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
		margin: auto;
		width: min(20rem, 100%);
	}
</style>
