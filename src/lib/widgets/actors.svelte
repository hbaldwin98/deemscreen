<script lang="ts">
	import Widget from '$lib/widgets/widget.svelte';
	import widgets from '$lib/stores/widget.store';
	import ActorInfo from '$lib/widgets/actor-info.svelte';

    let actorInfo: ActorInfo;



</script>

<Widget bind:widget={$widgets.actors} resizable={true}>
	<div class="flex flex-col h-full">
		<div class="flex flex-row justify-between items-center">
			<h1 class="text-2xl font-bold">Actors</h1>
			<button class="text-white hover:text-gray-400 font-bold py-2 px-4 rounded-xl opacity-90">
				<svg
					class="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 6v6m0 0v6m0-6h6m-6 0H6"
					/>
				</svg>
			</button>
		</div>
	</div>
</Widget>

<ActorInfo bind:this={actorInfo} />
