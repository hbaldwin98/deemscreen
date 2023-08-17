<script lang="ts">
	import type { SelectedActorWidget } from '$lib/types';
	import Widget from './widget.svelte';
	import { createEventDispatcher } from 'svelte';

	export let widget: SelectedActorWidget;

	const dispatch = createEventDispatcher();

	function addToInitiativeTracker(): void {
		dispatch('addToInitiative');
	}
</script>

<Widget bind:widget>
	<div slot="body" class="flex flex-col p-2">
		{#if widget.actor}
			<label for="name" class="text-lg font-bold">Name</label>
			<input
				name="name"
				type="text"
				class="text-sm font-bold w-full p-1 bg-transparent"
				bind:value={widget.actor.name}
				placeholder="Actor name"
			/>
			<label for="initiative" class="text-lg font-bold">Initiative</label>
			<input
				name="initiative"
				type="number"
				class="text-sm font-bold w-full p-1 bg-transparent"
				bind:value={widget.actor.info.initiative}
				placeholder="Initiative"
			/>

			<button class="action-btn" on:click={addToInitiativeTracker}> Add to Initiative </button>
		{/if}
	</div>
</Widget>
