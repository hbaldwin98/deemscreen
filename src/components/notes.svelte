<script lang="ts">
	import widgetStore, { updateWidget } from '../stores/widget.store';
	import Widget from '../components/widget.svelte';

	function updateNotes(event: any, widget: NotesWidget) {
		updateWidget({
			...widget,
			notes: event?.target?.value
		});
	}
</script>

{#if $widgetStore.notes}
	<Widget widget={$widgetStore.notes}>
		<div class="notes-container w-72">
			<div class="w-full h-full flex justify-center items-center">
				<div class="text-6xl font-bold text-gray-800">Notes</div>
			</div>
			<div class="w-full h-full flex justify-center items-center mt-3">
				<textarea
                    value={$widgetStore.notes.notes}
					on:input={(event) => updateNotes(event, $widgetStore.notes)}
					class="w-full h-full p-2 text-gray-800"
					placeholder="Write your notes here..."
				/>
			</div>
		</div>
	</Widget>
{/if}
