<script lang="ts">
	import Widget from '$lib/widgets/widget.svelte';
	import widgets from '$lib/stores/widget.store';
	import ActorInfo from '$lib/widgets/actor-info.svelte';
	import { buildNewActor } from '$lib/utils/utils';
	import type { Actor } from '$lib/types';
	import { onDestroy } from 'svelte';

	let unsubscribe = widgets.subscribe((value) => {
		if (value.actors.hidden) {
			value.actors.selected.hidden = true;
		}
	});

	onDestroy(() => {
		$widgets.actors.selected.hidden = true;
		unsubscribe();
	});

	function addToInitiativeTracker(actor: Actor | null | undefined): void {
		if (actor == null) {
			return;
		}

		if (!$widgets.combatTracker.actors) {
			$widgets.combatTracker.actors = [];
		}

		if ($widgets.combatTracker.actors.some((actor) => actor.id === actor?.id)) {
			return;
		}

		actor.roll = 0;
		$widgets.combatTracker.actors = [...$widgets.combatTracker.actors, actor];
	}

	function toggleSelection(actor: Actor): void {
		if ($widgets.actors.selected.actorId === actor.id) {
			$widgets.actors.selected.hidden = true;
			$widgets.actors.selected.actorId = null;
		} else {
			$widgets.actors.selected.hidden = false;
			$widgets.actors.selected.actorId = actor.id;
		}
	}

	function addActor() {
		$widgets.actors.actors = [...$widgets.actors.actors, buildNewActor()];
	}

	function removeActor(index: number) {
		if (!confirm('Are you sure you want to delete this actor?')) {
			return;
		}
		if ($widgets.actors.selected.actorId === $widgets.actors.actors[index].id) {
			$widgets.actors.selected.hidden = true;
		}

		$widgets.actors.actors = $widgets.actors.actors.filter((_, i) => i !== index);
	}
</script>

<Widget bind:widget={$widgets.actors} resizable={true} minWidth="300px" minHeight="250px">
	<div slot="body" class="flex flex-col w-full">
		<div class="flex flex-col h-full px-4 py-2">
			<div class="flex flex-col justify-between">
				{#each $widgets.actors.actors as actor, i}
					<div class="flex flex-row justify-between items-center py-1">
						<h2 class="text-xl font-bold w-full">{actor.name}</h2>

						<button
							class="text-white hover:text-gray-400 font-bold rounded-xl opacity-90 w-6 h-6 mr-2"
							on:click={() => addToInitiativeTracker(actor)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
								/>
							</svg>
						</button>
						<button
							class="text-white hover:text-gray-400 font-bold rounded-xl opacity-90 w-6 h-6 mr-2"
							on:click={() => toggleSelection(actor)}
						>
							{#if $widgets.actors.selected.actorId === actor.id && !$widgets.actors.selected.hidden}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
									/>
								</svg>
							{:else}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
									/>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
							{/if}
						</button>
						<button
							class="text-white hover:text-gray-400 font-bold rounded-xl opacity-90 w-6 h-6"
							on:click={() => removeActor(i)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				{/each}
			</div>
		</div>
	</div>
	<div slot="actions" class="actions flex flex-row justify-between items-center h-full">
		<button class="action-btn" on:click={addActor}> Add Actor </button>
		<button class="action-btn" on:click={() => ($widgets.actors.selected.hidden = true)}>
			Close
		</button>
	</div>
</Widget>

{#if $widgets.actors.selected && !$widgets.actors.selected.hidden}
	<ActorInfo
		bind:widget={$widgets.actors.selected}
		on:addToInitiative={() =>
			addToInitiativeTracker(
				$widgets.actors.actors.find((a) => a.id === $widgets.actors.selected.actorId)
			)}
	/>
{/if}
