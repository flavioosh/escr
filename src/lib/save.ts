import type { SaveData, SaveDataV1 } from '$lib/types/save';
import { fromByteArray, toByteArray } from 'base64-js';

const SAVE_START = 69;
const SEED_MARKER = 68;
const RESULTS_MARKER = 82;
const TIMESTAMP_MARKER = 84;
const SCORES_MARKER = 83;

function saveV1(saveData: SaveDataV1): Uint8Array {
	const output = [SAVE_START, 1];

	output.push(
		SEED_MARKER,
		saveData.seed.length,
		...saveData.seed.split('').map((char) => char.charCodeAt(0)),
	);

	output.push(RESULTS_MARKER);
	for (const result of saveData.results) {
		output.push(
			result.a.charCodeAt(0),
			result.a.charCodeAt(1),
			result.b.charCodeAt(0),
			result.b.charCodeAt(1),
			result.winner === 'a' ? 0 : 1,
		);

		if (result.timestamp) {
			output.push(TIMESTAMP_MARKER);
			const timestamp = new Date(result.timestamp).getTime();
			const rawTimestamp = BigInt(timestamp);

			const timestampBytes = [
				Number((rawTimestamp >> 56n) & 0xffn),
				Number((rawTimestamp >> 48n) & 0xffn),
				Number((rawTimestamp >> 40n) & 0xffn),
				Number((rawTimestamp >> 32n) & 0xffn),
				Number((rawTimestamp >> 24n) & 0xffn),
				Number((rawTimestamp >> 16n) & 0xffn),
				Number((rawTimestamp >> 8n) & 0xffn),
				Number(rawTimestamp & 0xffn),
			];

			output.push(...timestampBytes);
		}
	}
	output.push(RESULTS_MARKER);

	output.push(SCORES_MARKER);
	for (const [country, score] of Object.entries(saveData.scores)) {
		output.push(country.charCodeAt(0), country.charCodeAt(1), (score >> 8) & 0xff, score & 0xff);
	}
	output.push(SCORES_MARKER);

	return new Uint8Array(output);
}

export function save(saveData: SaveData): string {
	if (saveData.version === 1) {
		return fromByteArray(saveV1(saveData));
	}

	throw new Error(`Unsupported version (${saveData.version})`);
}

function loadV1(saveData: Uint8Array): SaveDataV1 {
	const output: SaveDataV1 = {
		version: 1,
		seed: '',
		results: [],
		scores: {},
	};
	let i = 2;

	if (saveData[i] !== SEED_MARKER) {
		throw new Error('Invalid save data - missing seed');
	}

	const seedLength = saveData[i + 1];
	const seed = String.fromCharCode(...saveData.slice(i + 2, i + 2 + seedLength));
	output.seed = seed;

	i += 2 + seedLength;

	if (saveData[i] !== RESULTS_MARKER) {
		throw new Error('Invalid save data - missing results section');
	}

	i++;

	while (saveData[i] !== RESULTS_MARKER) {
		if (i > saveData.length) {
			throw new Error('Invalid save data - corrupt results section');
		}

		const a = String.fromCharCode(saveData[i], saveData[i + 1]);
		const b = String.fromCharCode(saveData[i + 2], saveData[i + 3]);
		const winner = saveData[i + 4] === 0 ? 'a' : 'b';

		if (saveData[i + 5] === TIMESTAMP_MARKER) {
			const rawTimestamp = Number(
				(BigInt(saveData[i + 6]) << 56n) |
					(BigInt(saveData[i + 7]) << 48n) |
					(BigInt(saveData[i + 8]) << 40n) |
					(BigInt(saveData[i + 9]) << 32n) |
					(BigInt(saveData[i + 10]) << 24n) |
					(BigInt(saveData[i + 11]) << 16n) |
					(BigInt(saveData[i + 12]) << 8n) |
					BigInt(saveData[i + 13]),
			);
			const timestamp = new Date(rawTimestamp).toISOString();
			i += 14;
			output.results.push({ a, b, winner, timestamp });
		} else {
			output.results.push({ a, b, winner });
			i += 5;
		}
	}

	i++;

	if (saveData[i] !== SCORES_MARKER) {
		throw new Error('Invalid save data - missing scores section');
	}
	i++;

	while (saveData[i] !== SCORES_MARKER) {
		if (i > saveData.length) {
			throw new Error('Invalid save data - corrupt scores section');
		}

		const country = String.fromCharCode(saveData[i], saveData[i + 1]);
		const score = (saveData[i + 2] << 8) | saveData[i + 3];

		output.scores[country] = score;

		i += 4;
	}

	return output;
}

export function load(saveData: string): SaveData {
	const SaveDataBytes = toByteArray(saveData);

	if (SaveDataBytes[0] !== SAVE_START) {
		throw new Error('Invalid save data - start not valid');
	}

	if (SaveDataBytes[1] === 1) {
		return loadV1(SaveDataBytes);
	}

	throw new Error(`Unsupported save version (${SaveDataBytes[1]})`);
}
