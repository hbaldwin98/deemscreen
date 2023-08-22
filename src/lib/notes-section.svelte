<script lang="ts">
	import ProsemirrorEditor from 'prosemirror-svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { createRichTextEditor, toHTML } from 'prosemirror-svelte/state';

	export let value = '';

	let dispatch = createEventDispatcher();
	let editorState: any;

	function onChange(event: any) {
		dispatch('change', toHTML(event.detail.editorState));
	}

	$: editorState = createRichTextEditor(value);
</script>

<div class="notes-container overflow-auto">
	<ProsemirrorEditor
		placeholder="Write your notes here..."
		{editorState}
		on:change={onChange}
		className="ui-editor bg-dark py-2 px-4 overflow-auto h-full"
	/>
</div>

<style lang="postcss">
	.notes-container {
		@apply w-full;
	}

	:global(.ui-editor) {
		@apply py-2 px-4 overflow-auto h-full;
	}

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
</style>
