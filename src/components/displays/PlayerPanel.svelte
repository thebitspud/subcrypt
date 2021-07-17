<script lang="ts">
  import { playerData as player } from "../../scripts/stores/playerData";

  function modifyStats() {
    $player.health.max += 5;
    $player.energy.max += 10;
    $player.health.adjust(-10);
    $player.energy.adjust(-20);
    $player.weight.adjust(1);
  }

  function pickupGear() {
    $player.gear.setSlot("primary", "hasheensheen");
    $player.gear.setSlot("secondary", "impostors-bane");
    $player.gear.setSlot("head", "crewmate-helm");
    $player.gear.setSlot("body", "amogian-vest");
    $player.gear.setSlot("legs", "sus-greaves");
    $player.gear.setSlot("feet", "armored-drip");
    player.update((p) => p);
  }
</script>

<div class="PlayerPanel">
  <p>
    Health: {Math.round($player.health.now)} / {Math.round($player.health.max)}
  </p>
  <p>
    Energy: {Math.round($player.energy.now)} / {Math.round($player.energy.max)}
  </p>
  <p>
    Weight: {Math.round($player.weight.now)} / {Math.round($player.weight.max)}
  </p>
  <br />
  <p>Primary: {$player.gear.getSlot("primary") ?? ""}</p>
  <p>Secondary: {$player.gear.getSlot("secondary") ?? ""}</p>
  <br />
  <p>Head: {$player.gear.getSlot("head") ?? ""}</p>
  <p>Body: {$player.gear.getSlot("body") ?? ""}</p>
  <p>Legs: {$player.gear.getSlot("legs") ?? ""}</p>
  <p>Feet: {$player.gear.getSlot("feet") ?? ""}</p>
  <br />
  <button on:click={modifyStats}>Modify stats</button><button
    on:click={pickupGear}>Pick up gear</button
  >
</div>

<style>
  p {
    margin-bottom: 0.25rem;
  }
</style>
