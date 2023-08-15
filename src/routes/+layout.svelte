<script lang="ts">
	import '../app.css';
	import widgets from '$lib/stores/widget.store';
	import { browser } from '$app/environment';
	import WidgetNavItem from '$lib/widget-nav-item.svelte';

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

	let dateTime = getDateTimeStamp();

	function startClock() {
		if (browser) {
			const element = document.getElementById('date-time');
			setInterval(() => {
				if (element) {
					dateTime = getDateTimeStamp();
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

		const day = date.getDate();
		const month = date.getMonth() + 1;
		const formattedDay = days[date.getDay()];
		const formattedMonth = months[month - 1];

		return `${formattedDay}, ${formattedMonth} ${day}<br> ${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
	}

	startClock();
</script>

{#if $widgets}
	<div id="settings" class="fixed flex flex-row top-5 right-10">
		<button class="text-white hover:text-gray-400 font-bold py-2 px-4 rounded-xl opacity-90">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-8 h-8"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
				/>
				<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
			</svg>
		</button>
	</div>

	<div id="social" class="fixed flex flex-row bottom-5 left-5 z-50">
		<a
			href="https://github.com/hbaldwin98/"
			target="_blank"
			class="text-white hover:bg-gray-700 bg-gray-800 font-bold py-2 px-4 rounded-xl opacity-90 cursor-pointer"
		>
			<img src="github-mark-white.svg" class="w-8 h-8" alt="GitHub" />
		</a>
	</div>

	<div
		id="date-time"
		class="fixed text-3xl left-5 top-1/6 mt-5 h-full text-white"
		bind:innerHTML={dateTime}
		contenteditable="true"
	/>

	<aside id="widget-bar" class="fixed left-5 top-1/4 w-16 h-full">
		<WidgetNavItem bind:widget={$widgets.timeTracker}>
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
		</WidgetNavItem>
		<WidgetNavItem bind:widget={$widgets.timer}>
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
		</WidgetNavItem>

		<WidgetNavItem bind:widget={$widgets.notes}>
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
		</WidgetNavItem>
		<WidgetNavItem bind:widget={$widgets.initiativeTracker}>
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
		</WidgetNavItem>
		<WidgetNavItem bind:widget={$widgets.youtube}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				class="w-12 h-12"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.5"
					d="M12 14l9-5-9-5-9 5 9 5z"
				/>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.5"
					d="M12 14l9-5-9-5-9 5 9 5z"
				/>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.5"
					d="M12 14l9-5-9-5-9 5 9 5z"
				/>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.5"
					d="M12 14l9-5-9-5-9 5 9 5z"
				/>
				<circle cx="12" cy="6" r="2.5" />
				<circle cx="12" cy="18" r="2.5" />
			</svg>
		</WidgetNavItem>
		<WidgetNavItem bind:widget={$widgets.actors}>
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
					d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
				/>
			</svg>
		</WidgetNavItem>
	</aside>

	<slot />
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
