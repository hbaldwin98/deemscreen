<script lang="ts">
	import Widget from './widget.svelte';
	import widgetStore, { updateWidget } from '../stores/widget.store';

	let timer: NodeJS.Timeout;
	let timerRunning = false;

	function startTimer(widget: TimerWidget): void {
		if (timerRunning) {
			return;
		}

		timerRunning = true;
		timer = setInterval(() => {
			widget.time++;
			updateWidget(widget);
		}, 1000);
	}

	function stopTimer(): void {
		clearInterval(timer);
		timerRunning = false;
	}

	function calculateTime(time: number): string {
		const hours = Math.floor(time / 3600);
		const minutes = Math.floor((time - hours * 3600) / 60);
		const seconds = time - hours * 3600 - minutes * 60;

		let output = '';
		output += hours < 10 ? `0${hours}` : hours;
		output += minutes < 10 ? `:0${minutes}` : `:${minutes}`;
		output += seconds < 10 ? `:0${seconds}` : `:${seconds}`;
		return output;
	}
</script>

{#if $widgetStore.timer}
	<Widget widget={$widgetStore.timer} bodyStyles="p-3">
		<div class="timer-container w-72">
			<div class="w-full flex justify-center items-center">
				<div class="text-6xl font-bold">{calculateTime($widgetStore.timer.time)}</div>
			</div>
			<div class="w-full flex justify-center items-center mt-3">
				<button
					class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2 w-2/4"
					class:opacity-50={timerRunning}
					class:hover:bg-gray-500={!timerRunning}
					on:click={() => startTimer($widgetStore.timer)}
					disabled={timerRunning}
				>
					Start
				</button>
				<button
					class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded w-2/4"
					on:click={stopTimer}
					class:opacity-50={!timerRunning}
					class:hover:bg-gray-500={timerRunning}
					disabled={!timerRunning}
				>
					Stop
				</button>
				<button
					class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded ml-2"
					on:click={() => ($widgetStore.timer.time = 0)}
				>
					Reset
				</button>
			</div>
		</div>
	</Widget>
{/if}
