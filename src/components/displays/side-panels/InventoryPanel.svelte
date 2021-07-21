<script lang="ts">
	import { inventory as inven } from "../../../scripts/stores/player";

	function craft() {
		if ($inven.hasItem("iron-longsword", 3)) {
			$inven.removeItem("iron-longsword", 3);
			$inven.addItem("armored-drip");
			$inven.addItem("hasheensheen");
		} else if ($inven.hasItem("iron-ingot", 3)) {
			$inven.removeItem("iron-ingot", 3);
			$inven.addItem("iron-longsword");
			if (Math.random() < 1 / 3) $inven.addItem("sus-proof-vest");
			else if (Math.random() < 1 / 2) $inven.addItem("vent-greaves");
			else $inven.addItem("amogus-pants");
		} else if ($inven.hasItem("raw-iron-ore", 2)) {
			$inven.removeItem("raw-iron-ore", 2);
			$inven.addItem("iron-ingot");
			if (Math.random() < 1 / 8) $inven.addItem("impostors-bane");
			else if (Math.random() < 1 / 7) $inven.addItem("task-list");
		} else {
			$inven.addItem("raw-iron-ore", 1);
			if (Math.random() < 1 / 16) $inven.addItem("crewmate-helm");
			else if (Math.random() < 1 / 25) $inven.addItem("sussy-charm");
		}

		inven.update((o) => o);
	}

	function hasheensheen() {
		for (let i = 0; i < 31; i++) craft();
	}
</script>

<div class="$inventoryPanel">
	<button on:click={craft}>Craft Few</button>
	<button on:click={hasheensheen}>Craft Many</button>
	<br />
	{#each [...$inven.items] as [id, qty]}
		<p>{id}{@html qty !== 1 ? ` &times; ${qty}` : ""}</p>
	{/each}
</div>

<style>
</style>
