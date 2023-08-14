import { browser } from '$app/environment';
import type {
    NotesWidget,
    TimerWidget,
    TurnTrackerWidget as InitiativeTrackerWidget,
    Widget
} from '$lib/types';
import { writable } from 'svelte/store';

type WidgetStore = {
    timer: TimerWidget;
    notes: NotesWidget;
    initiativeTracker: InitiativeTrackerWidget;
};
const widgets = writable<WidgetStore>({
    timer: {
        name: 'timer',
        position: { x: 0, y: 0 },
        time: 0
    },
    notes: {
        name: 'notes',
        position: { x: 0, y: 0 },
        notes: ''
    },
    initiativeTracker: {
        name: 'initiativeTracker',
        position: { x: 0, y: 0 },
        round: 0,
        turn: 0,
        actors: []
    }
});

if (browser) {
    const storedWidgets = localStorage.getItem('widgets');
    if (storedWidgets) {
        const parsedWidgets = JSON.parse(storedWidgets) as WidgetStore;
        for (const widget of Object.values(parsedWidgets)) {
            updateWidget(widget);
        }
    }

    onresize = constrain;
}

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
    if (browser) {
        localStorage.setItem(`${widget.name}-widget`, JSON.stringify(widget));
    }

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
