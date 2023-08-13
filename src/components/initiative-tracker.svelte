<script lang="ts">
	import { rollDice } from '$lib/dice-roller';
	import type { Actor, TurnTrackerWidget } from '$lib/types';
	import widgetStore, { updateWidget } from '../stores/widget.store';
	import Widget from './widget.svelte';

	function addActor(widget: TurnTrackerWidget): void {
		widget.actors.push({
			name: 'New Actor',
			initiative: 0,
			roll: 0
		});

		updateWidget(widget);
	}

	function endTurn(widget: TurnTrackerWidget): void {
		widget.turn = (widget.turn + 1) % widget.actors.length;

		if (widget.turn === 0) {
			widget.round++;
		}

		updateWidget(widget);
	}

	function clearWidget(widget: TurnTrackerWidget): void {
		widget.actors = [];
		widget.turn = 0;
		widget.round = 0;

		updateWidget(widget);
	}

	function rollInitiative(widget: TurnTrackerWidget, index: number): void {
		const actor = widget.actors[index];
		const roll = rollDice([{ sides: 20, amount: 1 }], actor.initiative);
		actor.roll = roll.total;

		widget.actors.sort((a: Actor, b: Actor) => (b.roll ?? 0) - (a.roll ?? 0));

		updateWidget(widget);
	}
</script>

{#if $widgetStore.initiativeTracker}
	<Widget
		widget={$widgetStore.initiativeTracker}
		resizable={true}
		maxWidth="450px"
		minWidth="450px"
		minHeight="250px"
	>
		<div class="turn-tracker-container overflow-auto flex flex-col w-full">
			<div class="turn-tracker-body flex flex-col flex-grow">
				<p class="text-lg font-bold m-1">Round: {$widgetStore.initiativeTracker.round + 1}</p>
				{#if $widgetStore.initiativeTracker.actors.length > 0}
					<p class="text-md font-bold mx-1">
						Turn: {$widgetStore.initiativeTracker.actors[$widgetStore.initiativeTracker.turn].name}
					</p>
				{/if}
				{#if $widgetStore.initiativeTracker.actors.length > 0}
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
							{#each $widgetStore.initiativeTracker.actors as actor, i}
								<tr class:bg-red-900={$widgetStore.initiativeTracker.turn === i}>
									<td class="px-1 py-2 w-1 text-center">
										{i + 1}
									</td>
									<td class="px-2 py-2">
										<input
											type="text"
											class="w-full bg-transparent"
											bind:value={actor.name}
											on:change={() => updateWidget($widgetStore.initiativeTracker)}
										/>
									</td>
									<td class="px-2 py-2">
										<input
											type="number"
											class="w-full bg-transparent"
											bind:value={actor.initiative}
											on:change={() => updateWidget($widgetStore.initiativeTracker)}
										/>
									</td>
									<td class="px-3 py-2">
										{#if actor.roll === 0}
											<button
												class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
												on:click={() => rollInitiative($widgetStore.initiativeTracker, i)}
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
					on:click={() => addActor($widgetStore.initiativeTracker)}
				>
					Add Actor
				</button>
				<button
					class="hover:bg-gray-700 text-white font-bold w-1/3 py-2 px-4 rounded"
					on:click={() => endTurn($widgetStore.initiativeTracker)}
				>
					End Turn
				</button>
				<button
					class="hover:bg-gray-700 text-white font-bold w-1/3 py-2 px-4 rounded"
					on:click={() => clearWidget($widgetStore.initiativeTracker)}
				>
					Clear
				</button>
			</div>
		</div>
	</Widget>
{/if}
