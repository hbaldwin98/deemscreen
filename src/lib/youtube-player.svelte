<script>
	import { onMount } from 'svelte';

	export let player;
	export let initialVideoId = '';

	const ytPlayerId = 'youtube-player';

	onMount(() => {
		function load() {
			// @ts-ignore
			player = new YT.Player(ytPlayerId, {
				height: '100%',
				width: '100%',
				videoId: initialVideoId,
				playerVars: { autoplay: 0 }
			});
		}

		// @ts-ignore
		if (window.YT) {
			load();
		} else {
			// @ts-ignore
			window.onYouTubeIframeAPIReady = load;
		}
	});
</script>

<svelte:head>
	<script src="https://www.youtube.com/iframe_api"></script>
</svelte:head>

<div id={ytPlayerId} />
