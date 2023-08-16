<script lang="ts">
	import Widget from '$lib/widgets/widget.svelte';
	import widgets from '$lib/stores/widget.store';
	import ActorInfo from '$lib/widgets/actor-info.svelte';

	let actorInfo: ActorInfo;

	function addActor() {
		$widgets.actors.actors = [...$widgets.actors.actors, { name: 'New Actor', initiative: 0 }];
	}

	function removeActor(index: number) {
		if ($widgets.actors.selected.actor === $widgets.actors.actors[index]) {
			$widgets.actors.selected.hidden = true;
		}

		$widgets.actors.actors = $widgets.actors.actors.filter((a, i) => i !== index);
	}
</script>

<Widget bind:widget={$widgets.actors} resizable={true} minWidth="300px" minHeight="250px">
	<div slot="body" class="flex flex-col w-full">
		<div class="flex flex-col h-full px-4 py-2">
			<div class="flex flex-col justify-between items-center">
				<h1 class="text-2xl font-bold">Actors</h1>
				{#each $widgets.actors.actors as actor, i}
					<div class="flex flex-row justify-between items-center">
						<h2 class="text-xl font-bold">{actor.name}</h2>
						<button
							class="text-white hover:text-gray-400 font-bold py-2 px-4 rounded-xl opacity-90"
							on:click={() => {
								$widgets.actors.selected.hidden = false;
								$widgets.actors.selected.actor = actor;
							}}
						>
							Show Info
						</button>
						<button
							class="text-white hover:text-gray-400 font-bold py-2 px-4 rounded-xl opacity-90"
							on:click={() => removeActor(i)}
						>
							Remove
						</button>
					</div>
				{/each}
			</div>
		</div>
	</div>
	<div slot="actions" class="actions flex flex-row justify-between items-center h-full">
		<button
			class="action-btn"
			on:click={addActor}
		>
			Add Actor
		</button>
		<button
			class="action-btn"
			on:click={() => ($widgets.actors.selected.hidden = true)}
		>
			Close
		</button>
	</div>
</Widget>

{#if !!$widgets.actors.selected && !$widgets.actors.selected.hidden}
	<ActorInfo bind:this={actorInfo} bind:widget={$widgets.actors.selected} />
{/if}
