<script lang="ts">
	import ItemFragment from "./ItemFragment.svelte";
	import typewriter from "../../scripts/utils/typewriter";
	import ItemEvent from "../../scripts/events/itemEvent";
	import OptionsFragment from "./OptionsFragment.svelte";

	export let event: ItemEvent;
	export let lastEvent;
	let complete = false;

	let eventTextDone = false;
</script>

<div class="ItemEventFragment">
	<span
		class="text"
		in:typewriter={{ speed: event.textSpeed, cursor: false }}
		on:introend={() => {
			eventTextDone = true;
		}}
		style="color: var(--border-color)"
	>
		{event.getText() + " "}</span
	>{!eventTextDone ? "|" : ""}
	{#if eventTextDone}
		<ItemFragment
			id={event.id}
			hideInvalid={false}
			useTypewriter={true}
			bind:complete
		/>
	{/if}
	<br />
	<br />
	{#if complete && lastEvent}
		<OptionsFragment options={event.getOptions()} />
	{/if}
</div>

<style>
	.ItemEventFragment {
		text-align: left;
	}
</style>
