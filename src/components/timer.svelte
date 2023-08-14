<script lang="ts">
	import Widget from './widget.svelte';
	import widgets from '../stores/widget.store';

	let timer: NodeJS.Timeout;
	let timerRunning = false;

	function startTimer(): void {
		if (timerRunning) {
			return;
		}

		timerRunning = true;
		timer = setInterval(() => {
			$widgets.timer.time++;
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

{#if $widgets.timer}
	<Widget bind:widget={$widgets.timer}>
		<div class="timer-container w-72">
			<div class="w-full flex justify-center items-center p-5">
				<div class="text-6xl font-bold">{calculateTime($widgets.timer.time)}</div>
			</div>
			<div class="flex flex-col" />
			<hr class="border-1 border-gray-700 m-0" />
			<div class="w-full flex justify-center items-center">
				<button
					class="hover:bg-gray-700 text-white font-bold w-1/3 py-2 px-4 rounded"
					class:opacity-50={timerRunning}
					class:hover:bg-gray-500={!timerRunning}
					on:click={startTimer}
					disabled={timerRunning}
				>
					Start
				</button>
				<button
					class="hover:bg-gray-700 text-white font-bold w-1/3 py-2 px-4 rounded"
					on:click={stopTimer}
					class:opacity-50={!timerRunning}
					class:hover:bg-gray-500={timerRunning}
					disabled={!timerRunning}
				>
					Stop
				</button>
				<button
					class="hover:bg-gray-700 text-white font-bold w-1/3 py-2 px-4 rounded"
					on:click={() => ($widgets.timer.time = 0)}
				>
					Reset
				</button>
			</div>
		</div>
	</Widget>
{/if}
