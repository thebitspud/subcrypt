<script lang="ts">
  import { playerInventory as inven } from "../../scripts/stores/inventory";

  let disabled;
  $: disabled = $inven && inven.hasItem("hasheensheen");

  function hasheensheen() {
    inven.addItem("raw-iron-ore", 5);
    inven.addItem("crewmate-helm", 1);

    while (inven.hasItem("raw-iron-ore", 3)) {
      inven.removeItem("raw-iron-ore", 3);
      inven.addItem("iron-ingot");
      inven.addItem("impostors-bane", 1);
    }

    if (inven.hasItem("iron-ingot", 4)) {
      inven.removeItem("iron-ingot", 4);
      inven.addItem("amogian-vest", 1);
      inven.addItem("sus-greaves");
      inven.addItem("iron-longsword");
    }

    if (inven.hasItem("iron-longsword", 5)) {
      inven.removeItem("iron-longsword", 5);
      inven.addItem("armored-drip", 1);
      inven.addItem("hasheensheen");
    }
  }
</script>

<div class="InventoryPanel">
  {#each [...$inven] as [id, qty]}
    <p>{id}{@html qty !== 1 ? ` &times; ${qty}` : ""}</p>
  {/each}

  {#if !disabled}
    <button on:click={hasheensheen}>Craft Items</button>
  {/if}
</div>

<style>
</style>
