<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import widgets from '../stores/widget.store';
	import type { Point, Widget } from '$lib/types';
	import { fade } from 'svelte/transition';

	export let widget: Widget;
	export let bodyStyles: string = '';
	export let resizable: boolean = false;
	export let minWidth: string = '100px';
	export let minHeight: string = '100px';
	export let maxWidth: string = '100%';
	export let maxHeight: string = '100%';

	let offset: Point = {
		x: 0,
		y: 0
	};

	onMount(() => {
		const widgetName = widget.name;
		if (browser) {
			const widgetData = localStorage.getItem(`widgets`);
			if (widgetData) {
				const widget = JSON.parse(widgetData) as any;
				if (widget) {
					widget[widgetName].position = widget[widgetName]
						? widget[widgetName].position
						: { x: 0, y: 0 };
				}
			}
		}
	});

	function constrain(): void {
		const element = document.getElementById(`${widget.name}-widget`);
		if (element) {
			const boundingBox = element.getBoundingClientRect();

			if (widget.position.y < 0) {
				widget.position.y = 0;
			}

			if (widget.position.x < 0) {
				widget.position.x = 0;
			}

			if (widget.position.x + boundingBox.width >= window.innerWidth) {
				widget.position.x = window.innerWidth - boundingBox.width;
			}

			if (widget.position.y + boundingBox.height >= window.innerHeight) {
				widget.position.y = window.innerHeight - boundingBox.height;
			}
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
		}
	}

	function handleTouchDown(event: TouchEvent) {
		offset.x = event.touches[0].clientX - widget.position.x;
		offset.y = event.touches[0].clientY - widget.position.y;
		setDragging(true);
	}

	function handleMouseDown(event: MouseEvent) {
		offset.x = event.clientX - widget.position.x;
		offset.y = event.clientY - widget.position.y;
		setDragging(true);
	}

	function bringToFront(): void {
		const highestZIndex = Object.values($widgets).reduce((acc, curr) => {
			if (!curr.zIndex) {
				return acc;
			}

			return curr.zIndex > acc ? curr.zIndex : acc;
		}, 0);

		widget.zIndex = highestZIndex + 1;
	}

	function hideWidget(): void {
		widget.hidden = true;
	}

	const setDragging = (value: boolean) => {
		isDragging = value;
	};
</script>

<svelte:body
	on:mouseleave={() => setDragging(false)}
	on:mousemove={handleMouseMove}
	on:touchmove={handleTouchMove}
/>

{#if !widget.hidden}
	<div
		id="{widget.name}-widget"
		class="widget-container bg-white dark:bg-slate-800 border-gray-900 rounded-lg shadow-lg resize flex flex-col opacity-90"
		style="left: {widget.position.x}px; top: {widget.position.y}px; z-index: {widget.zIndex}"
		role="dialog"
		on:resize={constrain}
		class:resize={resizable}
		class:overflow-auto={resizable}
		class:overflow-y-hidden={resizable}
		style:min-width={minWidth}
		style:min-height={minHeight}
		style:max-width={maxWidth}
		style:max-height={maxHeight}
		transition:fade={{ duration: 100 }}
	>
		<div
			class="cursor-move bg-white dark:bg-slate-800 rounded-t-lg h-6 w-full select-none"
			on:mousedown={handleMouseDown}
			on:touchstart={handleTouchDown}
			on:mouseup={() => setDragging(false)}
			on:touchend={() => setDragging(false)}
			on:touchcancel={() => setDragging(false)}
			tabindex="0"
			role="menu"
		>
			<div class="h-full w-full flex items-center justify-between">
				<p class="text-slate-500 dark:text-slate-50 text-sm tracking-tight font-bold ml-2">{widget.name}</p>
				<div class="flex items-center">
					<button
						on:click={bringToFront}
						class="h-full w-6 bg-white dark:bg-slate-800 dark:hover:bg-gray-700 rounded-tl-lg"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							class="w-6 h-6 text-slate-300"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
						</svg>
					</button>
					<button
						id="{widget.name}-close"
						class="h-full w-6 bg-white dark:bg-slate-800 dark:hover:bg-gray-700 rounded-tr-lg"
						on:click={hideWidget}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							class="w-6 h-6 text-red-500"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
			</div>
		</div>

		<div
			class="widget-body select-none {bodyStyles} flex-grow flex w-auto text-slate-500 dark:text-slate-50"
			class:overflow-auto={resizable}
		>
			<slot />
		</div>
	</div>
{/if}

<style lang="postcss">
	.widget-container {
		position: fixed;
	}
</style>
