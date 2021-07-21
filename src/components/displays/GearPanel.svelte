<script lang="ts">
	import { resources, inventory as inven, gear, accessories } from "../../scripts/stores/player";

	function pickupGear() {
		if ($inven.hasItem("hasheensheen") || $gear.getSlot("primary") === "hasheensheen") {
			$gear.setSlot("primary", "hasheensheen");
			$gear.setSlot("secondary", "impostors-bane");
		} else {
			$gear.setSlot("primary", "impostors-bane");
		}

		$gear.setSlot("head", "crewmate-helm");
		$gear.setSlot("body", "sus-proof-vest");
		$gear.setSlot("legs", "amogus-pants");
		$gear.setSlot("feet", "armored-drip");
		gear.update((o) => o);

		$accessories.add("vent-greaves");
		$accessories.add("task-list");
		$accessories.add("sussy-charm");
		accessories.update((o) => o);

		$resources.weight.set($gear.count());
		resources.update((o) => o);
	}
</script>

<div class="GearPanel">
	<button on:click={pickupGear}>Pick up gear</button>
	<br />
	<p>Primary: {$gear.getSlot("primary") ?? ""}</p>
	<p>Secondary: {$gear.getSlot("secondary") ?? ""}</p>
	<br />
	<p>Head: {$gear.getSlot("head") ?? ""}</p>
	<p>Body: {$gear.getSlot("body") ?? ""}</p>
	<p>Legs: {$gear.getSlot("legs") ?? ""}</p>
	<p>Feet: {$gear.getSlot("feet") ?? ""}</p>
	<br />
	<p>Accessories: ({$accessories.list.length}/{$accessories.max})</p>
	{#each $accessories.list as accessory}
		<p>&nbsp;&nbsp;&nbsp;&nbsp;{accessory}</p>
	{/each}
</div>
