/**
 * Simple typewriter effect for Svelte components
 * @param node The HTML element to create a typewriter effect for
 * @param speed Time (in ms) taken to print each consecutive character
 * @param delay Time (in ms) between node being displayed and effect starting
 * @param cursor Whether to append a visual text cursor while the transition is active
 */
const typewriter = (
	node: HTMLElement,
	{ speed = 50, delay = 0, cursor = true }
) => {
	const valid =
		node.childNodes.length === 1 &&
		node.childNodes[0].nodeType === Node.TEXT_NODE;

	if (!valid) {
		throw new Error(
			`This transition only works on elements with a single text node child.`
		);
	}

	const text = node.textContent ?? "";
	const duration = text.length * speed;

	return {
		delay,
		duration,
		tick: (t: number) => {
			const i = Math.ceil(text.length * t);
			const showCursor = cursor && i > 0 && i < text.length;
			node.textContent = text.slice(0, i) + (showCursor ? "|" : "");
		},
	};
};

export default typewriter;
