<script lang="ts">
	import { gear, accessories } from "../../../scripts/stores/player";
	import ItemFragment from "../../fragments/ItemFragment.svelte";
</script>

<div class="GearPanel">
	<p>Primary: <ItemFragment id={$gear.getSlot("primary")} /></p>
	<p>Secondary: <ItemFragment id={$gear.getSlot("secondary")} /></p>
	<br />
	<p>Head: <ItemFragment id={$gear.getSlot("head")} /></p>
	<p>Body: <ItemFragment id={$gear.getSlot("body")} /></p>
	<p>Legs: <ItemFragment id={$gear.getSlot("legs")} /></p>
	<p>Feet: <ItemFragment id={$gear.getSlot("feet")} /></p>
	<br />
	<p>Accessories: ({$accessories.list.length}/{$accessories.max})</p>
	{#each $accessories.list as accessory}
		<p>&nbsp;&nbsp;&nbsp;&nbsp;<ItemFragment id={accessory} /></p>
	{/each}
</div>
