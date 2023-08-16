<script lang="ts">
	import type { SelectedActorWidget } from "$lib/types";
	import Widget from "./widget.svelte";

    export let widget: SelectedActorWidget;
</script>

<Widget bind:widget={widget}>
    {widget.actor?.name}
</Widget>
