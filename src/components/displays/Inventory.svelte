<script lang="ts">
  import { playerInventory as inven } from "../../scripts/stores/inventory";

  let disabled = false;

  function hasheensheen() {
    inven.addItem("raw-iron-ore", 5);

    while (inven.hasItem("raw-iron-ore", 3)) {
      inven.removeItem("raw-iron-ore", 3);
      inven.addItem("iron-ingot");
    }

    if (inven.hasItem("iron-ingot", 4)) {
      inven.removeItem("iron-ingot", 4);
      inven.addItem("iron-longsword");
    }

    if (inven.hasItem("iron-longsword", 5)) {
      inven.removeItem("iron-longsword", 5);
      inven.addItem("hasheensheen");
    }

    if (inven.hasItem("hasheensheen")) disabled = true;
  }
</script>

<div class="Inventory">
  {#each [...$inven] as [id, qty]}
    <p>{id}{@html qty !== 1 ? ` &times; ${qty}` : ""}</p>
  {/each}

  {#if !disabled}
    <button on:click={hasheensheen}>Craft Items</button>
  {/if}
</div>

<style>
</style>
