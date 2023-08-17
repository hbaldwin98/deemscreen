import { browser } from '$app/environment';
import type {
	NotesWidget,
	TimerWidget as TimeTrackerWidget,
	CombatTrackerWidget,
	Widget,
	YoutubeWidget,
    ActorsWidget,
    CountdownTimerWidget as TimerWidget
} from '$lib/types';
import { writable } from 'svelte/store';

type WidgetStore = {
	timeTracker: TimeTrackerWidget;
    timer: TimerWidget;
	notes: NotesWidget;
	combatTracker: CombatTrackerWidget;
	youtube: YoutubeWidget;
    actors: ActorsWidget;
};

let defaultWidgets: WidgetStore = {
	timeTracker: {
		name: 'timeTracker',
		position: { x: 0, y: 0 },
		time: 0,
		hidden: true
	},
    timer: {
        name: 'timer',
        position: { x: 0, y: 0 },
        time: 0,
        hidden: true
    },
	notes: {
		name: 'notes',
		position: { x: 0, y: 0 },
		notes: [''],
		index: 0,
		hidden: true
	},
	combatTracker: {
		name: 'combatTracker',
		position: { x: 0, y: 0 },
		round: 0,
		turn: 0,
		actors: [],
		hidden: true
	},
	youtube: {
		name: 'youtube',
		position: { x: 0, y: 0 },
		playing: false,
		url: '',
		hidden: true
	},
    actors: {
        name: 'actors',
        position: { x: 0, y: 0 },
        actors: [],
        hidden: true,
        selected: {
            name: 'selectedActor',
            position: { x: 0, y: 0 },
            actor: null,
            hidden: true
        }
    }
};

if (browser) {
	defaultWidgets.notes.position = { x: window.innerWidth / 1.75, y: 400 };
	defaultWidgets.combatTracker.position = { x: window.innerWidth / 1.75, y: 100 };
	defaultWidgets.timer.position = { x: 150, y: 350 };
    defaultWidgets.timeTracker.position = { x: 150, y: 500 };
	defaultWidgets.youtube.position = { x: 150, y: 100 };
    defaultWidgets.actors.position = { x: window.innerWidth / 1.75, y: 700 };

	const storedWidgets = localStorage.getItem('widgets');
	if (storedWidgets) {
		defaultWidgets = {
			...defaultWidgets,
			...JSON.parse(storedWidgets)
		};
	} else {
		defaultWidgets.timer.hidden = false;
        defaultWidgets.timeTracker.hidden = false;
		defaultWidgets.notes.hidden = false;
		defaultWidgets.combatTracker.hidden = false;
		defaultWidgets.youtube.hidden = false;
        defaultWidgets.actors.hidden = false;
	}

	onresize = constrain;
}

const widgets = writable<WidgetStore>(defaultWidgets);

let lastConstrain = 0;
function constrain(): void {
	if (Date.now() - lastConstrain < 50) {
		return;
	}

	widgets.update((value) => {
		for (const widget of Object.values(value)) {
			const element = document.getElementById(`${widget.name}-widget`);
			if (element) {
				const boundingBox = element.getBoundingClientRect();

				if (widget.position.y < 0) {
					widget.position.y = 0;
				}

				if (widget.position.x < 0) {
					widget.position.x = 0;
				}

				if (widget.position.x + boundingBox.width > window.innerWidth) {
					widget.position.x = window.innerWidth - boundingBox.width;
				}

				if (widget.position.y + boundingBox.height > window.innerHeight) {
					widget.position.y = window.innerHeight - boundingBox.height;
				}
			}

			updateWidget(widget);
		}

		return value;
	});
}

function updateWidget(widget: Widget) {
	widgets.update((value) => {
		return {
			...value,
			[widget.name]: widget
		};
	});
}

widgets.subscribe((value) => {
	if (browser) {
		localStorage.setItem('widgets', JSON.stringify(value));
	}
});

export default widgets;
