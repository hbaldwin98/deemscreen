<script lang="ts">
	import { rollDice } from '$lib/dice-roller';
	import type { Actor } from '$lib/types';
	import widgets from '$lib/stores/widget.store';
	import Widget from '$lib/widgets/widget.svelte';
	import { buildNewActor } from '$lib/utils/utils';

	function addActor(): void {
		$widgets.combatTracker.actors = $widgets.combatTracker.actors.concat(buildNewActor());
	}

	function endTurn(): void {
		if ($widgets.combatTracker.actors.length === 0) {
			return;
		}

		$widgets.combatTracker.turn =
			($widgets.combatTracker.turn + 1) % $widgets.combatTracker.actors.length;

		if ($widgets.combatTracker.turn === 0) {
			$widgets.combatTracker.round++;
		}
	}

	function clearWidget(): void {
		$widgets.combatTracker.actors = [];
		$widgets.combatTracker.turn = 0;
		$widgets.combatTracker.round = 0;
	}

	function rollInitiative(index: number): void {
		const actor = $widgets.combatTracker.actors[index];
		const roll = rollDice([{ sides: 20, amount: 1 }], actor.info.initiative);
		actor.roll = roll.total;

		$widgets.combatTracker.actors[index] = actor;
		$widgets.combatTracker.actors.sort((a: Actor, b: Actor) => (b.roll ?? 0) - (a.roll ?? 0));
	}
</script>

{#if $widgets.combatTracker}
	<Widget
		bind:widget={$widgets.combatTracker}
		resizable={true}
		maxWidth="450px"
		minWidth="450px"
		minHeight="250px"
	>
		<div slot="body" class="turn-tracker-container overflow-auto flex flex-col w-full">
			<div class="turn-tracker-body flex flex-col flex-grow">
				<p class="text-lg font-bold m-1">Round: {$widgets.combatTracker.round + 1}</p>
				{#if $widgets.combatTracker.actors.length > 0}
					<p class="text-md font-bold mx-1">
						Turn: {$widgets.combatTracker.actors[$widgets.combatTracker.turn]?.name}
					</p>
				{/if}
				{#if $widgets.combatTracker.actors.length > 0}
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
							{#each $widgets.combatTracker.actors as actor, i}
								<tr
									class="h-8"
									class:bg-red-300={$widgets.combatTracker.turn === i}
									class:dark:bg-red-900={$widgets.combatTracker.turn === i}
								>
									<td class="px-1 py-2 w-1 text-center">
										{i + 1}
									</td>
									<td class="px-2 py-2">
										<input type="text" class="w-full bg-transparent" bind:value={actor.name} />
									</td>
									{#if !$widgets.actors.actors.some((a) => a.id === actor.id) && !actor.roll}
										<td class="px-2 py-2">
											<input
												type="number"
												class="w-full bg-transparent"
												bind:value={actor.info.initiative}
											/>
										</td>
									{:else}
										<td class="px-2 py-2">
											<input
												type="number"
												class="w-full bg-transparent"
												bind:value={actor.info.initiative}
												disabled
											/>
										</td>
									{/if}
									<td class="mx-3 my-2">
										{#if !actor.roll}
											<button
												class="bg-blue-200 hover:bg-blue-300 dark:bg-blue-500 hover:dark:bg-blue-400 text-slate-500 dark:text-slate-50 font-bold h-8 px-4 rounded"
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
		</div>
		<div slot="actions" class="w-full flex flex-row">
			<button class="action-btn" on:click={addActor}> Add Actor </button>
			<button class="action-btn" on:click={endTurn}> End Turn </button>
			<button class="action-btn" on:click={clearWidget}> Clear </button>
		</div>
	</Widget>
{/if}
