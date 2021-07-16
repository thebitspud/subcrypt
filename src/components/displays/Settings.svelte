<script lang="ts">
  import { settings } from "../../scripts/stores/settings";
</script>

<div class="Settings">
  <h2>Settings</h2>
  <label>
    <input type="checkbox" bind:checked={$settings.rightSidePanel} />
    Side Panel on Right
  </label>
  <label>
    <input type="checkbox" bind:checked={$settings.darkMode} />
    Dark Mode
  </label>
  <label>
    <input type="checkbox" bind:checked={$settings.gameHints} />
    Gameplay Hints
  </label>
</div>

{#if $settings.darkMode}
  <style>
    :root {
      --main-color: #fff;
      --bg-color: #181818;
      --border-color: #aaa;
      --link-color: #28f;
    }
  </style>
{/if}
