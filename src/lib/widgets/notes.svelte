<script lang="ts">
	import Widget from '$lib/widgets/widget.svelte';
	import NotesSection from '$lib/notes-section.svelte';
	import widgets from '$lib/stores/widget.store';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let notes = '';

	onMount(() => {
		if (browser) {
			const index = $widgets.notes.index ?? 0;
			notes = $widgets.notes?.notes[index] || '';
		}
	});

	function updateNotes(value: CustomEvent<string>) {
		$widgets.notes.notes[$widgets.notes.index] = value.detail;
	}

	function setCurrentNotes(index: number) {
		notes = $widgets.notes.notes[index];
		$widgets.notes.index = index;
	}

	function removeNote() {
		const currentIndex = $widgets.notes.index;

		$widgets.notes.notes = $widgets.notes.notes.filter((_, i) => i !== currentIndex);
		if (currentIndex > 0) {
			setCurrentNotes(currentIndex - 1);
			return;
		}

		if (currentIndex == 0) {
			$widgets.notes.notes[0] = '';
		}

		setCurrentNotes(0);
	}
</script>

{#if $widgets.notes}
	<Widget
		bind:widget={$widgets.notes}
		resizable={true}
		maxWidth="600px"
		minWidth="427px"
		minHeight="240px"
	>
		<div slot="body" class="flex flex-row w-full">
			<div class="flex flex-col w-8 pt-2">
				<button
					on:click={() => ($widgets.notes.notes = [...$widgets.notes.notes, ''])}
					class="flex flex-col items-center justify-center"
					aria-label="Add new note"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 text-white mb-2"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
				{#each $widgets.notes.notes as _, i}
					<div class="flex flex-col items-center justify-center py-1">
						<button on:click={() => setCurrentNotes(i)} aria-label="Select note">
							{#if i === $widgets.notes.index}
								<div class="w-2 h-2 rounded-full bg-white" />
							{:else}
								<div class="w-2 h-2 rounded-full bg-gray-500" />
							{/if}
						</button>
					</div>
				{/each}

				<div class="flex-grow" />
				<button
					on:click={removeNote}
					class="flex flex-col items-center justify-center py-1"
					aria-label="Remove note"
				>
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="red"
							class="w-5 h-5 mb-2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
				</button>
			</div>
			<NotesSection bind:value={notes} on:change={updateNotes} />
		</div>
	</Widget>
{/if}
