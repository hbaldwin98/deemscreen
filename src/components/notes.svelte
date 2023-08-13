<script lang="ts">
	import widgetStore, { updateWidget } from '../stores/widget.store';
	import Widget from '../components/widget.svelte';
	import ProsemirrorEditor from 'prosemirror-svelte';
	import { createRichTextEditor, toHTML } from 'prosemirror-svelte/state';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import type { NotesWidget } from '$lib/types';

	let editorState: any;

	onMount(() => {
		if (browser) {
			editorState = createRichTextEditor($widgetStore.notes?.notes || '');
		}
	});

	function updateNotes(event: any, widget: NotesWidget) {
		updateWidget({
			...widget,
			notes: toHTML(event.detail.editorState)
		});
	}
</script>

{#if $widgetStore.notes}
	<Widget
		widget={$widgetStore.notes}
		resizable={true}
		maxWidth="600px"
		minWidth="250px"
		minHeight="200px"
	>
		<div class="notes-container overflow-auto">
			<ProsemirrorEditor
				placeholder="Write your notes here..."
				{editorState}
				on:change={(event) => updateNotes(event, $widgetStore.notes)}
				className="ui-editor bg-dark py-2 px-4 overflow-auto"
			/>
		</div>
	</Widget>
{/if}

<style lang="postcss">
	.notes-container {
		max-width: 600px;
		width: 100%;
	}

	:global(.ui-editor) {
		height: 100%;
	}

	@tailwind base;
	@layer base {
		:global(h1) {
			@apply text-2xl font-bold;
		}

		:global(h2) {
			@apply text-xl font-bold;
		}

		:global(h3) {
			@apply text-lg font-bold;
		}

		:global(h4) {
			@apply text-base font-bold;
		}

		:global(h5) {
			@apply text-sm font-bold;
		}

		:global(h6) {
			@apply text-xs font-bold;
		}

		:global(p) {
			@apply text-base;
		}

		:global(hr) {
			@apply border-0 border-t-2 border-gray-200 my-8;
		}
	}
</style>
