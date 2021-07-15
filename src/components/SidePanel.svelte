<script lang="ts">
  import Inspect from "./Inspect.svelte";
</script>

<div class="SidePanel">
  <div class="data">Swows</div>
  <Inspect />
</div>

<style>
  .SidePanel {
    display: flex;
    flex: 1 16rem;
    flex-flow: row wrap;

    min-height: 20rem;
  }

  .SidePanel > :global(div) {
    flex: 1 0 15rem;
  }
</style>
