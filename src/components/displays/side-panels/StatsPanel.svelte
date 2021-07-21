<script lang="ts">
	import { resources, gear } from "../../../scripts/stores/player";
	import Resource from "../../../scripts/player/resources";

	function modifyStats() {
		if ($resources.health.now >= 10) {
			$resources.health.adjust(-10);
			$resources.health.max += 5;
		}

		if ($resources.energy.now >= 25) {
			$resources.energy.adjust(-25);
			$resources.energy.max += 10;
		}
	}

	function getResourceString(res: Resource): string {
		return `${Math.round(res.now)} / ${Math.round(res.max)}`;
	}
</script>

<div class="PlayerPanel">
	<button on:click={modifyStats}>Modify stats</button>
	<br />
	<p>Health: {getResourceString($resources.health)}</p>
	<p>Energy: {getResourceString($resources.energy)}</p>
	<p>Weight: {getResourceString($resources.weight)}</p>
	<br />
	<p>Primary: {$gear.getSlot("primary") ?? ""}</p>
	<p>Secondary: {$gear.getSlot("secondary") ?? ""}</p>
</div>
