<script lang="ts">
	import itemData from "../../scripts/items/itemData";
	import { inspectTarget } from "../../scripts/stores/inspectTarget";

	export let id: string;
	if (!itemData[id]) id = "error";
	let item = itemData[id];

	function inspectItem() {
		inspectTarget.update((target) => {
			target.type = "item";
			target.id = id ?? "error";

			return target;
		});
	}
</script>

<div class="ItemFragment">
	<button class="text" on:click={inspectItem}>{item.name}</button>
</div>

<style>
	.ItemFragment {
		display: inline-block;
	}

	.ItemFragment > button {
		color: red;
	}
</style>
