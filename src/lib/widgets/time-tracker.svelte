<script lang="ts">
	import Widget from '$lib/widgets/widget.svelte';
	import widgets from '$lib/stores/widget.store';
	import { padDigit } from '$lib/utils/utils';

	let timerRunning = false;
	let previous = 0;

	function startTimer(): void {
		if (timerRunning) {
			return;
		}

		timerRunning = true;
		previous = (Date.now() / 1000) | 0;

		runTimer();
	}

	function runTimer(): void {
		if (!timerRunning) {
			return;
		}

		const now = (Date.now() / 1000) | 0;
		if (now > previous) {
			previous = now;
			$widgets.timeTracker.time++;
		}

		requestAnimationFrame(runTimer);
	}

	function stopTimer(): void {
		timerRunning = false;
	}

	function calculateTime(time: number): string {
		const hours = Math.floor(time / 3600);
		const minutes = Math.floor((time - hours * 3600) / 60);
		const seconds = time - hours * 3600 - minutes * 60;

		return `${padDigit(hours)}:${padDigit(minutes)}:${padDigit(seconds)}`;
	}
</script>

{#if $widgets.timeTracker}
	<Widget bind:widget={$widgets.timeTracker}>
		<div slot="body" class="timer-container w-72 px-5">
			<div class="w-full flex justify-center items-center p-5">
				<div id="{$widgets.timeTracker.name}-time" class="text-4xl font-bold">
					{calculateTime($widgets.timeTracker.time)}
				</div>
			</div>
		</div>
		<div slot="actions" class="w-full flex justify-center items-center">
			<button
				id="{$widgets.timeTracker.name}-start"
				class="text-slate-500 dark:text-slate-50 font-bold py-2 px-4 rounded-xl w-full"
				class:dark:hover:text-gray-400={!timerRunning}
				class:hover:text-grey-800={!timerRunning}
				class:opacity-50={timerRunning}
				on:click={startTimer}
				disabled={timerRunning}
			>
				Start
			</button>
			<button
				id="{$widgets.timeTracker.name}-stop"
				class="text-slate-500 dark:text-slate-50 font-bold py-2 px-4 rounded-xl w-full"
				class:dark:hover:text-gray-400={timerRunning}
				class:hover:text-grey-800={timerRunning}
				class:opacity-50={!timerRunning}
				on:click={stopTimer}
				disabled={!timerRunning}
			>
				Stop
			</button>
			<button
				id="{$widgets.timeTracker.name}-reset"
				class="action-btn"
				on:click={() => ($widgets.timeTracker.time = 0)}
			>
				Reset
			</button>
		</div>
	</Widget>
{/if}
