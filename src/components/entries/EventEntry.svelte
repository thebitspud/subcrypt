<script lang="ts">
	import GameEvent from "../../scripts/events/GameEvent";
	import typewriter from "../../scripts/utils/Typewriter";

	export let event: GameEvent;
	export let delay = 0;

	function getTextColor(): string {
		if (event.textColor === "default") return `var(--main-color)`;
		if (event.text === "faint") return `var(--border-color)`;
		return event.textColor;
	}
</script>

<div
	class="EventEntry"
	in:typewriter={{ speed: event.textSpeed, delay }}
	style="color: {getTextColor()}"
>
	{event.text}
</div>
