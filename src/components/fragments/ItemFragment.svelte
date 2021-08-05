<script lang="ts">
	import itemData from "../../scripts/items/itemData";
	import { inspectTarget } from "../../scripts/stores/inspectTarget";
	import typewriter from "../../scripts/utils/typewriter";
	import { afterUpdate } from "svelte";

	export let id: string;
	export let hideInvalid = true;
	export let useTypewriter = false;
	export let complete = false;

	$: if (!itemData[id]) id = "error";
	$: item = itemData[id];

	let button: HTMLButtonElement;

	afterUpdate(() => {
		button?.innerText = item.name;
	});

	function inspectItem() {
		inspectTarget.update(() => {
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
			bind:this={button}
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
</style>
