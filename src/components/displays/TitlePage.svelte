<script lang="ts">
	import typewriter from "../../scripts/utils/typewriter";
	import { fade } from "svelte/transition";
	import pkg from "../../../package.json";
</script>

<div class="TitlePage">
	<h1 in:typewriter={{ speed: 125, cursor: true }}>subcrypt</h1>
	<p>
		<span in:fade={{ delay: 1200 }}>A text adventure by </span><a
			draggable="false"
			href="https://github.com/thebitspud"
			rel="noreferrer"
			target="_blank"
			in:fade={{ delay: 1800 }}>thebitspud</a
		>
	</p>
	<p in:fade={{ delay: 2400 }}>Version {pkg.version}</p>
</div>
