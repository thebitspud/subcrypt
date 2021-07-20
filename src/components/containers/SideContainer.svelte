<script lang="ts">
	import InspectPanel from "../displays/InspectPanel.svelte";
	import InventoryPanel from "../displays/InventoryPanel.svelte";
	import StatsPanel from "../displays/StatsPanel.svelte";
	import SkillsPanel from "../displays/SkillsPanel.svelte";
	import GearPanel from "../displays/GearPanel.svelte";

	// Tab keys and display values
	type SidePanelTabs = "stats" | "gear" | "inventory" | "skills";
	const tabList = new Map<SidePanelTabs, string>([
		["stats", "Stat"],
		["gear", "Gear"],
		["inventory", "Inv."],
		["skills", "Skill"],
	]);
	let currentTab: SidePanelTabs = "stats";
</script>

<div class="SideContainer">
	<div class="overflow-wrapper">
		<div class="tabs">
			{#each [...tabList.keys()] as tab}
				<button class:selected={currentTab === tab} on:click={() => (currentTab = tab)} class="text"
					>{tabList.get(tab)}</button
				>
			{/each}
		</div>
		<div class="content flex-overflow">
			{#if currentTab === "stats"}
				<StatsPanel />
			{:else if currentTab === "gear"}
				<GearPanel />
			{:else if currentTab === "inventory"}
				<InventoryPanel />
			{:else if currentTab === "skills"}
				<SkillsPanel />
			{/if}
		</div>
	</div>
	<InspectPanel />
</div>

<style>
	/* Dynamic flexbox for panel data and inspect content that
   * flexes horizontally or vertically depending on screen size */
	.SideContainer {
		display: flex;
		flex-flow: row wrap;
		flex: 1 0 16rem;
	}

	.SideContainer > :global(div) {
		box-sizing: border-box;
		flex: 1 0 15rem;
		min-height: 12rem;
	}

	.content {
		width: min(20rem, 100%);
		margin: 0 auto 0.5rem;
	}

	.content > :global(div) {
		text-align: left;
	}

	.content > :global(div p) {
		margin-bottom: 0.1rem;
	}

	/* Tab Display */
	.tabs {
		display: flex;
		flex-flow: row nowrap;
		flex: 0 0 auto;
		justify-content: space-evenly;
		margin-bottom: 0.75rem;
	}

	.tabs > button {
		flex: 0 0 auto;
		color: var(--main-color);
		user-select: none;
		opacity: 100%;
		border-bottom: 2px solid var(--main-color);
	}

	.tabs > button:not(.selected) {
		border-bottom-width: 1px;
		opacity: 45%;
	}

	.tabs > button:not(.selected):hover {
		opacity: 65%;
	}
</style>
