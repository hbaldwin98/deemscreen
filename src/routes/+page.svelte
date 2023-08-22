<script lang="ts">
	import Timer from '$lib/widgets/timer.svelte';
	import Notes from '$lib/widgets/notes.svelte';
	import CombatTracker from '$lib/widgets/combat-tracker.svelte';
	import Youtube from '$lib/widgets/youtube.svelte';
	import Actors from '$lib/widgets/actors.svelte';
	import TimeTracker from '$lib/widgets/time-tracker.svelte';
</script>

<svelte:head>
	<title>Deem Screen</title>
</svelte:head>

<Timer />
<TimeTracker />
<Notes />
<CombatTracker />
<Youtube />
<Actors />
