import type { Result } from '$lib/types/result';

export type SaveDataV1 = {
	version: 1;
	seed: string;
	results: Result[];
	scores: Record<string, number>;
};

export type SaveData = SaveDataV1;
