<script lang="ts">
	import { browser } from '$app/environment';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	let dispatch = createEventDispatcher();

	export let minWidth = '400px';
	export let minHeight = '400px';
	export let maxWidth = '100%';
	export let maxHeight = '100%';
	export let show = false;

	let dialog: HTMLDialogElement;

	onMount(() => {
		if (browser) {
			const element = document.querySelector('dialog');
			if (element) {
				dialog = element as HTMLDialogElement;
			}
		}
	});

	function onClose() {
		dialog?.close();
		show = false;
		dispatch('close');
	}

	$: show && dialog?.showModal();

	onDestroy(() => {
		show = false;
		onClose();
	});
</script>

<dialog>
	<div
		class="dialog-overlay -z-10"
		on:click={onClose}
		on:keypress={(event) => (event.key === 'Escape' ? onClose() : null)}
		tabindex="0"
		role="button"
	/>
	<div
		class="z-50 flex flex-col"
		style:min-width={minWidth}
		style:max-width={maxWidth}
		style:min-height={minHeight}
		style:max-height={maxHeight}
	>
		<div class="dialog-header">
			<h1 class="text-2xl font-bold dark:text-slate-50 text-slate-500">
				<slot name="title" />
			</h1>
		</div>
		<div class="dialog-content">
			<slot name="body" />
		</div>

		<div class="dialog-actions">
			<slot name="actions" />
		</div>
	</div>
</dialog>

<style lang="postcss">
	dialog {
		@apply bg-transparent;
	}
	.dialog-overlay {
		@apply fixed top-0 left-0 w-full h-full bg-black opacity-50;
	}

	.dialog-header {
		@apply flex flex-row justify-between items-center p-4 z-20 bg-white dark:bg-slate-800 rounded-t-md h-12;
	}

	.dialog-content {
		@apply flex flex-col p-4 z-20 bg-white dark:bg-slate-800 flex-grow;
	}

	.dialog-actions {
		@apply flex flex-row justify-end items-center p-4 z-20 bg-white dark:bg-slate-800 rounded-b-md h-12;
	}
</style>
