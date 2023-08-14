<script lang="ts">
	import { rollDice } from '$lib/dice-roller';
	import type { Actor } from '$lib/types';
	import widgets from '../stores/widget.store';
    import Widget from '$lib/widget.svelte';

	function addActor(): void {
		$widgets.initiativeTracker.actors = $widgets.initiativeTracker.actors.concat({
			name: 'New Actor',
			initiative: 0,
			roll: 0
		});
	}

	function endTurn(): void {
		$widgets.initiativeTracker.turn =
			($widgets.initiativeTracker.turn + 1) % $widgets.initiativeTracker.actors.length;

		if ($widgets.initiativeTracker.turn === 0) {
			$widgets.initiativeTracker.round++;
		}
	}

	function clearWidget(): void {
		$widgets.initiativeTracker.actors = [];
		$widgets.initiativeTracker.turn = 0;
		$widgets.initiativeTracker.round = 0;
	}

	function rollInitiative(index: number): void {
		const actor = $widgets.initiativeTracker.actors[index];
		const roll = rollDice([{ sides: 20, amount: 1 }], actor.initiative);
		actor.roll = roll.total;

        $widgets.initiativeTracker.actors[index] = actor;
		$widgets.initiativeTracker.actors.sort((a: Actor, b: Actor) => (b.roll ?? 0) - (a.roll ?? 0));
	}
</script>

{#if $widgets.initiativeTracker}
	<Widget
		bind:widget={$widgets.initiativeTracker}
		resizable={true}
		maxWidth="450px"
		minWidth="450px"
		minHeight="250px"
	>
		<div class="turn-tracker-container overflow-auto flex flex-col w-full">
			<div class="turn-tracker-body flex flex-col flex-grow">
				<p class="text-lg font-bold m-1">Round: {$widgets.initiativeTracker.round + 1}</p>
				{#if $widgets.initiativeTracker.actors.length > 0}
					<p class="text-md font-bold mx-1">
						Turn: {$widgets.initiativeTracker.actors[$widgets.initiativeTracker.turn]?.name}
					</p>
				{/if}
				{#if $widgets.initiativeTracker.actors.length > 0}
					<table class="table-fixed w-full">
						<thead>
							<tr>
								<th class="w-1/12" />
								<th class="w-1/2">Name</th>
								<th class="w-1/6">Initiative</th>
								<th class="w-1/6">Roll</th>
							</tr>
						</thead>

						<tbody>
							{#each $widgets.initiativeTracker.actors as actor, i}
								<tr class:bg-red-900={$widgets.initiativeTracker.turn === i}>
									<td class="px-1 py-2 w-1 text-center">
										{i + 1}
									</td>
									<td class="px-2 py-2">
										<input
											type="text"
											class="w-full bg-transparent"
											bind:value={actor.name}
										/>
									</td>
									<td class="px-2 py-2">
										<input
											type="number"
											class="w-full bg-transparent"
											bind:value={actor.initiative}
										/>
									</td>
									<td class="px-3 py-2">
										{#if actor.roll === 0}
											<button
												class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
												on:click={() => rollInitiative(i)}
											>
												Roll
											</button>
										{:else}
											{actor.roll}
										{/if}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				{:else}
					<div class="text-lg text-center">No actors</div>
				{/if}
			</div>
			<hr class="border-1 border-gray-700 m-0" />
			<div class="w-full flex flex-row">
				<button
					class="hover:bg-gray-700 text-white font-bold w-1/3 py-2 px-4 rounded"
					on:click={addActor}
				>
					Add Actor
				</button>
				<button
					class="hover:bg-gray-700 text-white font-bold w-1/3 py-2 px-4 rounded"
					on:click={endTurn}
				>
					End Turn
				</button>
				<button
					class="hover:bg-gray-700 text-white font-bold w-1/3 py-2 px-4 rounded"
					on:click={clearWidget}
				>
					Clear
				</button>
			</div>
		</div>
	</Widget>
{/if}
