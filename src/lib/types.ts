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

export type CountdownTimerWidget = Widget & {
	time: number;
};

export type NotesWidget = Widget & {
	notes: string[];
	index: number;
};

export type CombatTrackerWidget = Widget & {
	round: number;
	turn: number;
	actors: Actor[];
};

export type YoutubeWidget = Widget & {
	playing: boolean;
	url: string;
};

export type SelectedActorWidget = Widget & {
	actorId: string | null;
};

export type ActorsWidget = Widget & {
	actors: Actor[];
	selected: SelectedActorWidget;
};

export type Actor = {
	id: string;
	name: string;
	info: ActorInfo;
	roll?: number;
	notes: string;
};

export type ActorInfo = {
	initiative: number;
	status: Status;
	level?: number;
	hp?: number;
	ac?: number;
	abilityScores?: AbilityScores;
	savingThrows?: SavingThrows;
	skills?: Skills;
};

export type AbilityScores = {
	str: number;
	dex: number;
	con: number;
	int: number;
	wis: number;
	cha: number;
};

export type SavingThrows = {
	str: number;
	dex: number;
	con: number;
	int: number;
	wis: number;
	cha: number;
};

export type Skills = {
	acrobatics: number;
	animalHandling: number;
	arcana: number;
	athletics: number;
	deception: number;
	history: number;
	insight: number;
	intimidation: number;
	investigation: number;
	medicine: number;
	nature: number;
	perception: number;
	performance: number;
	persuasion: number;
	religion: number;
	sleightOfHand: number;
	stealth: number;
	survival: number;
};

export enum Status {
	Normal,
	Dead
}
