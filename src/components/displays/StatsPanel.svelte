<script lang="ts">
	import { playerData as player } from "../../scripts/stores/playerData";
	import Resource from "../../scripts/types/resources";

	function modifyStats() {
		if ($player.health.now > 10) {
			$player.health.adjust(-10);
			$player.health.max += 5;
		}

		if ($player.energy.now > 25) {
			$player.energy.adjust(-25);
			$player.energy.max += 10;
		}
	}

	function getResourceString(res: Resource): string {
		return `${Math.round(res.now)} / ${Math.round(res.max)}`;
	}
</script>

<div class="PlayerPanel">
	<button on:click={modifyStats}>Modify stats</button>
	<br />
	<p>Health: {getResourceString($player.health)}</p>
	<p>Energy: {getResourceString($player.energy)}</p>
	<p>Weight: {getResourceString($player.weight)}</p>
	<br />
	<p>Primary: {$player.gear.getSlot("primary") ?? ""}</p>
	<p>Secondary: {$player.gear.getSlot("secondary") ?? ""}</p>
</div>
