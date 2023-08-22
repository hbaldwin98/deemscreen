import { Status, type Actor } from '$lib/types';

export function padDigit(num: number): string {
	return ('0' + num).slice(-2);
}

export function buildNewActor(): Actor {
	return {
		id: Date.now().toString(),
		name: 'New Actor',
		info: {
			initiative: 0,
			status: Status.Normal
		}
	};
}
