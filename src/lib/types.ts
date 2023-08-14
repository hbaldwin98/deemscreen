export type Point = {
	x: number;
	y: number;
};

export type DiceRoll = {
	dice: Die[];
	bonus: number;
	output: string;
	total: number;
};

export type Die = {
	sides: number;
	amount: number;
};

export interface Widget {
	name: string;
	position: Point;
	zIndex?: number;
	hidden?: boolean;
}

export type TimerWidget = Widget & {
	time: number;
};

export type NotesWidget = Widget & {
	notes: string[];
    index: number;
};

export type TurnTrackerWidget = Widget & {
	round: number;
	turn: number;
	actors: Actor[];
};

export type SpotifyWidget = Widget & {
    playing: boolean;
    url: string;
}

export type Actor = {
	name: string;
	initiative: number;
	roll?: number;
	dead?: boolean;
};
