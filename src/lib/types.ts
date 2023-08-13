type Point = {
    x: number;
    y: number;
};

interface Widget {
    name: string;
    position: Point;
    zIndex?: number;
    hidden?: boolean;
}

type TimerWidget = Widget & {
    time: number;
};

type NotesWidget = Widget & {
    notes: string;
};
