<script lang="ts">
	import type { Widget } from '$lib/types';
	export let widget: Widget;
</script>

<button
    id="{widget.name}-nav-item"
	class="text-white font-bold px-4 rounded mr-2"
	class:bg-gray-700={widget.hidden}
	class:bg-blue-500={!widget.hidden}
	class:hover:bg-blue-400={!widget.hidden}
	class:hover:bg-gray-500={widget.hidden}
	class:opacity-50={widget.hidden}
	on:click={() => (widget.hidden = !widget.hidden)}
>

	<slot />
</button>
