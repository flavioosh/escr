import { sha256 } from 'js-sha256';

type Xoshiro128pfOutput = {
	float: () => number;
	intInRange: (start: number, end: number) => number;
	weighted: (items: number[]) => number;
};

export function xoshiro128pf(seed?: string | null): Xoshiro128pfOutput {
	let state: Uint32Array;

	if (seed) {
		var hash = sha256.update(seed);
		const data = new Uint8Array(hash.array());
		state = new Uint32Array(data.buffer, 0, 4);
	} else {
		state = new Uint32Array(4);
		crypto.getRandomValues(state);
	}

	const next = () => {
		const result = ((state[0] + state[3]) >>> 0) / 4294967296;

		const t = state[1] << 9;

		state[2] ^= state[0];
		state[3] ^= state[1];
		state[1] ^= state[2];
		state[0] ^= state[3];

		state[2] ^= t;

		state[3] = (state[3] << 11) | (state[3] >> 21);

		return result;
	};

	return {
		float: next,
		intInRange: (start: number, end: number) => Math.floor(next() * (end - start) + start),
		weighted: (items: number[]) => {
			const weights = items.reduce((accumulator: number[], item: number, i: number) => {
				accumulator.push(item + (accumulator[i - 1] ?? 0));
				return accumulator;
			}, []);
			const random = next() * (weights.at(-1) as number);
			return weights.findIndex((weight) => weight > random);
		},
	};
}

export function randomSeed(): string {
	return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString();
}
