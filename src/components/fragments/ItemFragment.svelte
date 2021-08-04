<script lang="ts">
	import itemData from "../../scripts/items/itemData";
	import { inspectTarget } from "../../scripts/stores/inspectTarget";
	import typewriter from "../../scripts/utils/typewriter";

	export let id: string;
	export let hideInvalid = true;
	export let useTypewriter = false;
	export let complete = false;

	let item = itemData["error"];
	$: {
		// Updating display when ID changes
		if (!itemData[id]) id = "error";
		else item = itemData[id];
	}

	function inspectItem() {
		inspectTarget.update((target) => {
			return {
				type: "item",
				id: id ?? "error",
			};
		});
	}
</script>

{#if !hideInvalid || id !== "error"}
	<div class="ItemFragment">
		<button
			class="text"
			on:click={inspectItem}
			style="color: {id === 'error' ? 'red' : 'var(--main-color)'}"
			in:typewriter={{ speed: useTypewriter ? 25 : 0 }}
			on:introend={() => (complete = true)}>{item.name}</button
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
