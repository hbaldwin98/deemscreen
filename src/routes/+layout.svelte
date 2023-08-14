<script lang="ts">
	import widgets from '../stores/widget.store';
	import '../app.css';
	import { browser } from '$app/environment';

	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const months = [
		'January',
		'Febuary',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	function startClock() {
		if (browser) {
			setInterval(() => {
				const dateTime = getDateTimeStamp();
				const element = document.getElementById('date-time');
				if (element) {
					element.innerHTML = dateTime;
				}
			}, 1000);
		}
	}

	function getDateTimeStamp() {
		const date = new Date();
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();
		const ampm = hours >= 12 ? 'pm' : 'am';
		const formattedHours = hours % 12 || 12;
		const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
		const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
		// get day and month
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const formattedDay = days[date.getDay()];
		const formattedMonth = months[month - 1];

		return `${formattedDay}, ${formattedMonth} ${day} ${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
	}

	startClock();
</script>

{#if $widgets}
	<div id="date-time" class="fixed text-3xl left-5 top-1/6 mt-5 h-full text-white" />

	<aside id="widget-bar" class="fixed left-5 top-1/4 w-16 h-full">
		<button
			class="bg-gray-400 text-white font-bold py-2 px-4 rounded mr-2"
			class:hover:bg-gray-500={$widgets.timer.hidden}
			class:opacity-50={$widgets.timer.hidden}
			on:click={() => $widgets.timer.hidden = !$widgets.timer.hidden}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-12 h-12"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		</button>
		<button
			class="bg-gray-400 text-white font-bold py-2 px-4 mt-2 rounded"
			class:hover:bg-gray-500={$widgets.notes.hidden}
			class:opacity-50={$widgets.notes.hidden}
			on:click={() => $widgets.notes.hidden = !$widgets.notes.hidden}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-12 h-12"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
				/>
			</svg>
		</button>
		<button
			class="bg-gray-400 text-white font-bold py-2 px-4 mt-2 rounded"
			class:hover:bg-gray-500={$widgets.initiativeTracker.hidden}
			class:opacity-50={$widgets.initiativeTracker.hidden}
			on:click={() => $widgets.initiativeTracker.hidden = !$widgets.initiativeTracker.hidden}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-12 h-12"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
				/>
			</svg>
		</button>
		<slot />
	</aside>
{/if}

<style lang="postcss">
	:global(body) {
		background: no-repeat
			url('https://mylarpworld.com/wp-content/uploads/2023/04/Elhorndog_Bard_rogue_and_sorcerer_camping_out_in_the_mountains__12f1d82a-8a1e-4258-a28c-9244eb378225.png');
		background-size: cover;
		background-position: center;
		height: 100vh;
	}
</style>
