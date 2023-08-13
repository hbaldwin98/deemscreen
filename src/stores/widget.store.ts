import { browser } from "$app/environment";
import { writable } from "svelte/store";

type WidgetStore = {
    timer: TimerWidget;
    notes: NotesWidget;
};

const widgetStore = writable<WidgetStore>({
    timer: {
        name: 'timer',
        position: { x: 0, y: 0 },
        time: 0
    },
    notes: {
        name: 'notes',
        position: { x: 0, y: 0 },
        notes: ''
    }
});

if (browser) {
    onresize = constrain;
}

let lastConstrain = 0;
function constrain(): void {
    if (Date.now() - lastConstrain < 50) {
        return;
    }

    widgetStore.update((value) => {
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

function updateWidget(widget: Widget | TimerWidget | NotesWidget) {
    if (browser) {
        localStorage.setItem(`${widget.name}-widget`, JSON.stringify(widget));
    }

    widgetStore.update((value) => {
        return {
            ...value,
            [widget.name]: widget
        };
    });
}

function bringWidgetToFront(widget: Widget) {
    widgetStore.update((value) => {
        const highestZIndex = Object.values(value).reduce((acc, curr) => {
            if (!curr.zIndex) {
                return acc;
            }

            return curr.zIndex > acc ? curr.zIndex : acc;
        }, 0);

        const updatedWidget = {
            ...value,
            [widget.name]: {
                ...value[widget.name],
                zIndex: highestZIndex + 1
            }
        }
        updateWidget(updatedWidget[widget.name]);
        return updatedWidget;
    });
}

export { updateWidget, bringWidgetToFront }
export default widgetStore;
