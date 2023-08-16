<script lang="ts">
	import Widget from '$lib/widgets/widget.svelte';
	import widgets from '$lib/stores/widget.store';
	import YoutubePlayer from '$lib/youtube-player.svelte';
	let player: any;

	function playVideo() {
		const url = $widgets.youtube.url;
		if (!url) {
			// TODO - custom snackbar component
			alert('Please enter a video ID');
			return;
		}

		player.loadVideoById(url);
	}
</script>

<Widget bind:widget={$widgets.youtube} resizable={true} minWidth="427px" minHeight="240px">
	<div slot="body" class="flex flex-col w-full">
		<YoutubePlayer bind:player initialVideoId="hQPyNe67Oi4" />
		<form>
			<div class="flex flex-row justify-center items-center p-2">
				<input
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					type="text"
					placeholder="Enter Video ID..."
					bind:value={$widgets.youtube.url}
				/>
				<button
					class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded ml-2"
					on:click={playVideo}>Play</button
				>
			</div>
		</form>
	</div>
</Widget>

<style lang="postcss">
</style>
