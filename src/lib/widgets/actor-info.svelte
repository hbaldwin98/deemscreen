<script lang="ts">
	import type { Actor, SelectedActorWidget } from '$lib/types';
	import Widget from './widget.svelte';
	import NotesSection from '$lib/notes-section.svelte';
	import { createEventDispatcher, onDestroy } from 'svelte';
	import widgets from '$lib/stores/widget.store';

	export let widget: SelectedActorWidget;

	let actor: Actor = $widgets.actors.actors.find((actor) => actor.id === $widgets.actors.selected.actorId) as Actor;
    let actorNotes: string = actor.notes;

	const dispatch = createEventDispatcher();

	onDestroy(() => {
		$widgets.actors.selected.actorId = null;
		$widgets.actors.selected.hidden = true;
	});

	function addToInitiativeTracker(): void {
		dispatch('addToInitiative');
	}
    
    function updateNotes(notes: CustomEvent<string>) {
        actor.notes = notes.detail;
    }
</script>

<Widget bind:widget minWidth="300px">
	<div slot="body" class="flex flex-col p-2 w-full">
		<label for="name" class="text-lg font-bold">Name</label>
		<input
			name="name"
			type="text"
			class="text-sm font-bold w-full p-1 bg-transparent"
			bind:value={actor.name}
			placeholder="Actor name"
		/>
		<label for="initiative" class="text-lg font-bold">Initiative</label>
		<input
			name="initiative"
			type="number"
			class="text-sm font-bold w-full p-1 bg-transparent"
			bind:value={actor.info.initiative}
			placeholder="Initiative"
		/>
		<NotesSection value={actorNotes} on:change={updateNotes}/>
	</div>
	<div slot="actions" class="flex flex-row w-full">
		<button
			class="action-btn"
			on:click={() => {
				$widgets.actors.selected.actorId = null;
				$widgets.actors.selected.hidden = true;
			}}>Save</button
		>
		<button class="action-btn" on:click={addToInitiativeTracker}> Add to Initiative </button>
	</div>
</Widget>
