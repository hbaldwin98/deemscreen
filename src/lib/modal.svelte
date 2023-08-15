<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	let dialog;

	export let title = 'Modal Title';
	export let visible: boolean;

	function close() {
		visible = false;
		dispatch('close');
	}
</script>
