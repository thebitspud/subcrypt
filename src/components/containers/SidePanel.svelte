<script lang="ts">
  import Inspect from "../displays/Inspect.svelte";
  import Inventory from "../displays/Inventory.svelte";
  import PlayerStats from "../displays/PlayerStats.svelte";
  import Skills from "../displays/Skills.svelte";

  type SidePanelTabs = "player" | "inventory" | "skills";
  const tabList = new Map<SidePanelTabs, string>([
    ["player", "Player"],
    ["inventory", "Inven."],
    ["skills", "Skills"],
  ]);
  let currentTab: SidePanelTabs = "inventory";
</script>

<div class="SidePanel">
  <div class="data">
    <div class="Tabs">
      {#each [...tabList.keys()] as tab}
        <button
          class:selected={currentTab === tab}
          on:click={() => (currentTab = tab)}
          class="text">&nbsp;{tabList.get(tab)}&nbsp;</button
        >
      {/each}
    </div>
    {#if currentTab === "inventory"}
      <Inventory />
    {:else if currentTab === "player"}
      <PlayerStats />
    {:else if currentTab === "skills"}
      <Skills />
    {/if}
  </div>
  <Inspect />
</div>

<style>
  /* Dynamic flexbox for panel data and inspect content that
   * flexes horizontally or vertically depending on screen size */
  .SidePanel {
    display: flex;
    flex-flow: row wrap;
    flex: 1 16rem;
  }

  .SidePanel > :global(div) {
    flex: 1 0 15rem;
    min-height: 10rem;
  }

  .Tabs {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    margin-bottom: 0.5rem;
  }

  .Tabs > button {
    flex: 0 0 auto;
    color: var(--main-color);
    text-decoration: underline;
    user-select: none;
    opacity: 100%;
  }

  button:not(.selected) {
    opacity: 45%;
  }

  button:not(.selected):hover {
    opacity: 65%;
  }
</style>
