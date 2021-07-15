<script lang="ts">
  import MainPanel from "./MainPanel.svelte";
  import SidePanel from "./SidePanel.svelte";
  import Footer from "../Footer.svelte";
  import { settings } from "../../stores/settings";
</script>

<main>
  <div class="game">
    {#if $settings.rightSidePanel}
      <MainPanel />
      <SidePanel />
    {:else}
      <SidePanel />
      <MainPanel />
    {/if}
  </div>

  <Footer />
</main>

<style>
  /* Vertical flexbox for game content + footer */
  main {
    display: flex;
    flex-flow: column nowrap;

    /* Ensures game content reliably fills but does not overflow screen unless
		 * minimum space requirements exceed screen dimensions */
    box-sizing: border-box;
    height: 100%;
    min-width: 20rem;
    padding: 0.5rem;
  }

  /* Horizontal flexbox for main and side containers */
  .game {
    display: flex;
    flex-flow: row wrap;
    flex: 1 auto; /* Makes game content fill screen space not occupied by footer */

    max-width: 100%;
  }

  .game > :global(div) {
    margin: 0.5rem;
    outline: var(--main-color) 1px solid;
    padding: 0.5rem;
  }
</style>
