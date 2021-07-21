<script lang="ts">
	import { settings } from "../../scripts/stores/settings";
</script>

<div class="SettingsDisplay">
	<h2>Settings</h2>
	<label>
		<input type="checkbox" bind:checked={$settings.rightSidePanel} />
		Right/Bottom Side Panel
	</label>
	<br />
	<label>
		<input type="checkbox" bind:checked={$settings.darkMode} />
		Dark Mode
	</label>
	<br />
	<label>
		<input type="checkbox" bind:checked={$settings.gameHints} />
		Gameplay Hints
	</label>
</div>
