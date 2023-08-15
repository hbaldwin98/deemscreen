<script lang="ts">
	import Widget from '$lib/widgets/widget.svelte';
	import widgets from '$lib/stores/widget.store';

	let timer: NodeJS.Timeout;
	let timerRunning = false;
    let minutes = Math.floor($widgets.timer.time / 60);
    let seconds = $widgets.timer.time % 60;
    
    if (minutes == 0 && seconds == 0) {
        minutes = 10;
        seconds = 0;
    }

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
            if ($widgets.timer.time > 0) {
                console.log($widgets.timer.time);
                $widgets.timer.time--;
                updateTime();
            } else {
                playSound();
                stopTimer();
                return;
            }
		}

		requestAnimationFrame(runTimer);
	}

    function playSound(): void {
        const audio = new Audio('/sounds/alert.mp3');
        audio.volume = 0.2;
        audio.play();
    }

    function updateTime(): void {
        minutes = Math.floor($widgets.timer.time / 60);
        seconds = $widgets.timer.time % 60;
    }

	function stopTimer(): void {
		timerRunning = false;
	}

    function resetTimer(): void {
        minutes = 10;
        seconds = 0;

        stopTimer();
    }

    function formatWithLeadingZeroes(value: number): string {
        return value < 10 ? `0${value}` : value.toString();
    }

    $: $widgets.timer.time = minutes * 60 + seconds;
</script>

{#if $widgets.timer}
	<Widget bind:widget={$widgets.timer}>
		<div class="timer-container w-72 px-5">
			<div class="w-full flex justify-center items-center p-5">
				<input
                    id="{$widgets.timer.name}-minutes"
					type="number"
					class="w-1/3 text-4xl font-bold text-center bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    on:change={e => (minutes = parseInt(e.target.value))}
                    value={formatWithLeadingZeroes(minutes)}
                    disabled={timerRunning}
				/>
				<span class="text-4xl font-bold">:</span>
				<input
                    id="{$widgets.timer.name}-seconds"
					type="number"
					class="w-1/3 text-4xl font-bold text-center bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    on:change={e => (seconds = parseInt(e.target.value))}
                    value={formatWithLeadingZeroes(seconds)}
                    disabled={timerRunning}
				/>
			</div>
			<div class="flex flex-col" />
			<hr class="border-1 border-gray-700 m-0" />
			<div class="w-full flex justify-center items-center">
				<button
                    id="{$widgets.timer.name}-start"
					class="hover:bg-gray-700 text-white font-bold w-1/3 py-2 px-4 rounded"
					class:opacity-50={timerRunning}
					class:hover:bg-gray-500={!timerRunning}
					on:click={startTimer}
					disabled={timerRunning}
				>
					Start
				</button>
				<button
                    id="{$widgets.timer.name}-stop"
					class="hover:bg-gray-700 text-white font-bold w-1/3 py-2 px-4 rounded"
					on:click={stopTimer}
					class:opacity-50={!timerRunning}
					class:hover:bg-gray-500={timerRunning}
					disabled={!timerRunning}
				>
					Stop
				</button>
				<button
                    id="{$widgets.timer.name}-reset"
					class="hover:bg-gray-700 text-white font-bold w-1/3 py-2 px-4 rounded"
					on:click={resetTimer}
				>
					Reset
				</button>
			</div>
		</div>
	</Widget>
{/if}
