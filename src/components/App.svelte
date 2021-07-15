<script lang="ts">
  import MainPanel from "./MainPanel.svelte";
  import SidePanel from "./SidePanel.svelte";
  import Footer from "./Footer.svelte";

  let leftSidePanel = true;
</script>

<main>
  <div class="game">
    {#if leftSidePanel}
      <SidePanel />
      <MainPanel />
    {:else}
      <MainPanel />
      <SidePanel />
    {/if}
  </div>

  <Footer />
</main>

<style>
  main {
    display: flex;
    flex-flow: column nowrap;

    box-sizing: border-box;
    height: 100%;
    min-width: 20rem;
    padding: 0.5rem;
  }

  .game {
    display: flex;
    flex: 1 auto;
    flex-flow: row wrap;

    max-width: 100%;
  }

  .game > :global(div) {
    margin: 0.5rem;
    outline: #333333 1px solid;
    padding: 0.5rem;
  }
</style>
