<script lang="ts">
	import typewriter from "../../scripts/utils/Typewriter";
	import pkg from "../../../package.json";
</script>

<div class="TitlePage">
	<h1 in:typewriter={{ speed: 100 }}>subcrypt</h1>
	<p>
		<!-- prettier-ignore -->
		<span in:typewriter={{ delay: 1000 }}
		>A text-based adventure by </span><a
			draggable="false"
			href="https://github.com/thebitspud"
			rel="noreferrer"
			target="_blank"
			in:typewriter={{ delay: 2250 }}>thebitspud</a
		>
	</p>
	<p in:typewriter={{ delay: 2950 }}>Version {pkg.version}</p>
</div>
