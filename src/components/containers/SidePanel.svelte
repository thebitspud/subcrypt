<script lang="ts">
  import Inspect from "../displays/Inspect.svelte";
  import Inventory from "../displays/Inventory.svelte";
  import PlayerStats from "../displays/PlayerInfo.svelte";

  type SidePanelTabs = "inventory" | "player";
  let currentTab: SidePanelTabs = "inventory";
</script>

<div class="SidePanel">
  <div class="data">
    <p>player // inven. // skills</p>
    {#if currentTab === "inventory"}
      <Inventory />
    {:else if currentTab === "player"}
      <PlayerStats />
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
</style>
