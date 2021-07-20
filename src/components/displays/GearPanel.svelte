<script lang="ts">
	import { playerData as player } from "../../scripts/stores/playerData";
	import { playerInventory as inven } from "../../scripts/stores/inventory";

	function pickupGear() {
		if (inven.hasItem("hasheensheen") || gear.getSlot("primary") === "hasheensheen") {
			gear.setSlot("primary", "hasheensheen");
			gear.setSlot("secondary", "impostors-bane");
		} else {
			gear.setSlot("primary", "impostors-bane");
		}

		gear.setSlot("head", "crewmate-helm");
		gear.setSlot("body", "sus-proof-vest");
		gear.setSlot("legs", "amogus-pants");
		gear.setSlot("feet", "armored-drip");

		accessories.add("vent-greaves");
		accessories.add("task-list");
		accessories.add("sussy-charm");

		$player.weight.set($player.gear.count());
		player.update((p) => p);
	}

	$: gear = $player.gear;
	$: accessories = gear.accessories;
</script>

<div class="GearPanel">
	<button on:click={pickupGear}>Pick up gear</button>
	<br />
	<p>Primary: {gear.getSlot("primary") ?? ""}</p>
	<p>Secondary: {gear.getSlot("secondary") ?? ""}</p>
	<br />
	<p>Head: {gear.getSlot("head") ?? ""}</p>
	<p>Body: {gear.getSlot("body") ?? ""}</p>
	<p>Legs: {gear.getSlot("legs") ?? ""}</p>
	<p>Feet: {gear.getSlot("feet") ?? ""}</p>
	<br />
	<p>Accessories: ({accessories.list.length}/{accessories.max})</p>
	{#each accessories.list as accessory}
		<p>&nbsp;&nbsp;&nbsp;&nbsp;{accessory}</p>
	{/each}
</div>
