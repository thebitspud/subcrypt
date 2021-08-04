<script lang="ts">
	import {
		resources,
		gear,
		inventory,
		accessories,
	} from "../../../scripts/stores/player";
	import Resource from "../../../scripts/player/resources";
	import ItemFragment from "../../fragments/ItemFragment.svelte";
	import itemData from "../../../scripts/items/itemData";

	function modifyStats() {
		if ($resources.health.now >= 10) {
			$resources.health.adjust(-10);
			$resources.health.max += 5;
		}

		if ($resources.energy.now >= 25) {
			$resources.energy.adjust(-25);
			$resources.energy.max += 10;
		}
	}

	function getResourceString(res: Resource): string {
		return `${Math.round(res.now)} / ${Math.round(res.max)}`;
	}

	$: {
		let weight = 0;

		for (let [id, count] of $inventory.items) {
			weight += (itemData[id]?.weight ?? 0) * count;
		}

		for (let id of $gear.slots.values()) {
			weight += itemData[id]?.weight ?? 0;
		}

		for (let id of $accessories.list) {
			weight += itemData[id]?.weight ?? 0;
		}

		$resources.weight.now = weight;
	}
</script>

<div class="PlayerPanel">
	<button on:click={modifyStats}>Modify stats</button>
	<br />
	<p>Health: {getResourceString($resources.health)}</p>
	<p>Energy: {getResourceString($resources.energy)}</p>
	<p>Weight: {getResourceString($resources.weight)}</p>
	<br />
	<p>Primary: <ItemFragment id={$gear.getSlot("primary")} /></p>
	<p>Secondary: <ItemFragment id={$gear.getSlot("secondary")} /></p>
</div>
