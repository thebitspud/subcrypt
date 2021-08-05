<script lang="ts">
	import { inventory as inven } from "../../../scripts/stores/player";
	import ItemFragment from "../../fragments/ItemFragment.svelte";
</script>

<div class="$inventoryPanel">
	{#each [...$inven.items] as [id, qty] (id)}
		<p>
			<ItemFragment {id} hideInvalid={false} />
			{@html qty !== 1 ? ` &times; ${qty}` : ""}
		</p>
	{/each}
</div>

<style>
</style>
