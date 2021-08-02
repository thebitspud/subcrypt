<script lang="ts">
	import itemData from "../../scripts/items/itemData";
	import { inspectTarget } from "../../scripts/stores/inspectTarget";

	export let id: string;
	export let hideInvalid = true;
	let item = itemData["error"];

	$: {
		// Updating display when ID changes
		if (!itemData[id]) id = "error";
		else item = itemData[id];
	}

	function inspectItem() {
		inspectTarget.update((target) => {
			target.type = "item";
			target.id = id ?? "error";
			// console.log(target);

			return target;
		});
	}
</script>

{#if !hideInvalid || id !== "error"}
	<div class="ItemFragment">
		<button
			class="text"
			on:click={inspectItem}
			style="color: {id === 'error' ? 'red' : 'var(--main-color)'}"
			>{item.name}</button
		>
	</div>
{/if}

<style>
	.ItemFragment {
		display: inline-block;
	}

	.ItemFragment > button {
		color: red;
	}
</style>
