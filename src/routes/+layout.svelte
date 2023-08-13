<script lang="ts">
	import widgetStore, { updateWidget } from '../stores/widget.store';
	import '../app.css';

	function toggleWidgetVisiblity(widget: Widget) {
		widget.hidden = !widget.hidden;
		updateWidget(widget);
	}
</script>

{#if $widgetStore}
	<aside id="widget-bar" class="fixed left-5 top-1/4 w-16 h-full">
		<button
			class="bg-gray-400 text-white font-bold py-2 px-4 rounded mr-2"
			disabled={!$widgetStore.timer.hidden}
			class:hover:bg-gray-500={$widgetStore.timer.hidden}
			class:opacity-50={!$widgetStore.timer.hidden}
			on:click={() => toggleWidgetVisiblity($widgetStore.timer)}
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
			disabled={!$widgetStore.notes.hidden}
			class:hover:bg-gray-500={$widgetStore.notes.hidden}
			class:opacity-50={!$widgetStore.notes.hidden}
			on:click={() => toggleWidgetVisiblity($widgetStore.notes)}
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
		<slot />
	</aside>
{/if}

<style lang="postcss">
	:global(body) {
		background: url('https://mylarpworld.com/wp-content/uploads/2023/04/Elhorndog_Bard_rogue_and_sorcerer_camping_out_in_the_mountains__12f1d82a-8a1e-4258-a28c-9244eb378225.png');
		background-size: 100vw 100vh;
		background-repeat: no-repeat;
	}
</style>
