<script lang="ts">
  import Settings from "../displays/Settings.svelte";
  import pkg from "../../../package.json";

  function newGame() {}
</script>

<div class="MainPanel">
  <h1>Subcrypt</h1>
  <p>A text-based adventure by thebitspud.</p>
  <p>Version {pkg.version}</p>
  <button on:click={newGame} style="margin: 0.5rem auto 1rem">New Game</button>
  <Settings />
</div>

<style>
  .MainPanel {
    min-height: 15rem;
    flex: 3 30rem; /* 3:1 flex ratio between main panel and side panel */
  }
</style>
