<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { bringWidgetToFront, updateWidget } from '../stores/widget.store';
	export let widget: Widget;

	let offset: Point = {
		x: 0,
		y: 0
	};

	onMount(() => {
		if (browser) {
			const widgetData = localStorage.getItem(`${widget.name}-widget`);
			if (widgetData) {
				const widget = JSON.parse(widgetData) as Widget;
				if (widget) {
					widget.position = widget ? widget.position : { x: 0, y: 0 };
					updateWidget(widget);
				}
			}
		}
	});

	function constrain(): void {
		const element = document.getElementById(`${widget.name}-widget`);
		if (element) {
			const boundingBox = element.getBoundingClientRect();
			let hasChange = false;

			if (widget.position.y < 0) {
				widget.position.y = 0;
				hasChange = true;
			}

			if (widget.position.x < 0) {
				widget.position.x = 0;
				hasChange = true;
			}

			if (widget.position.x + boundingBox.width >= window.innerWidth) {
				widget.position.x = window.innerWidth - boundingBox.width;
				hasChange = true;
			}

			if (widget.position.y + boundingBox.height >= window.innerHeight) {
				widget.position.y = window.innerHeight - boundingBox.height;
				hasChange = true;
			}

			updateWidget(widget);
		}
	}

	let isDragging = false;
	function handleMouseMove(event: MouseEvent) {
		if (isDragging) {
			widget.position.x = event.clientX - offset.x;
			widget.position.y = event.clientY - offset.y;
			if (browser) {
				constrain();
			}
		}
	}

	function handleTouchMove(event: TouchEvent) {
		if (isDragging) {
			widget.position.x = event.touches[0].clientX - offset.x;
			widget.position.y = event.touches[0].clientY - offset.y;

			updateWidget(widget);
		}
	}

	function handleTouchDown(event: TouchEvent) {
		offset.x = event.touches[0].clientX - widget.position.x;
		offset.y = event.touches[0].clientY - widget.position.y;
		setDragging(true);
		updateWidget(widget);
	}

	function handleMouseDown(event: MouseEvent) {
		offset.x = event.clientX - widget.position.x;
		offset.y = event.clientY - widget.position.y;
		setDragging(true);
		updateWidget(widget);
	}

	function bringToFront(): void {
		bringWidgetToFront(widget);
	}

	function hideWidget(): void {
		widget.hidden = true;
		updateWidget(widget);
	}

	const setDragging = (value: boolean, delay: number = 0) => {
		setTimeout(() => {
			isDragging = value;
		}, delay);
	};
</script>

<div
	id="{widget.name}-widget"
	class="widget-container bg-gray-100 border border-gray-200 rounded-lg shadow-lg"
	on:mousemove={handleMouseMove}
	on:touchmove={handleTouchMove}
	style="left: {widget.position.x}px; top: {widget.position.y}px; z-index: {widget.zIndex}"
	role="dialog"
	on:resize={constrain}
	hidden={widget.hidden}
>
	<div
		class="cursor-move bg-gray-400 rounded-t-lg h-6 w-full select-none"
		on:mousedown={handleMouseDown}
		on:touchstart={handleTouchDown}
		on:mouseup={() => setDragging(false)}
		on:blur={() => setDragging(false, 300)}
		on:mouseout={() => setDragging(false, 300)}
		on:touchend={() => setDragging(false)}
		on:touchcancel={() => setDragging(false)}
		tabindex="0"
		role="menu"
	>
		<div class="h-full w-full flex items-center justify-between">
			<p class="text-white text-sm font-bold ml-2">{widget.name}</p>
			<div class="flex items-center">
				<button
					on:click={bringToFront}
					class="h-full w-6 bg-gray-400 hover:bg-gray-500 rounded-tl-lg"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
					</svg>
				</button>
				<button
					on:click={hideWidget}
					class="h-full w-6 bg-gray-400 hover:bg-gray-500 rounded-tr-lg"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		</div>
	</div>

	<div class="widget-body select-none p-6">
		<slot />
	</div>
</div>

<style lang="postcss">
	.widget-container {
		background-color: #eee;
		position: fixed;
	}

	.widget-body {
		width: fit-content;
	}
</style>
