import { browser } from '$app/environment';
import { ENTRIES } from '$lib/data';
import { xoshiro128pf } from '$lib/random';
import type { Entry } from '$lib/types/entry';
import type { Result } from '$lib/types/result';
import { generateId } from '$lib/utils';
import { persisted } from 'svelte-persisted-store';
import { derived, type Stores } from 'svelte/store';

// Populate the seed with an initial value, as it won't get
// persisted until the store is updated
if (browser && !localStorage.getItem('seed')) {
	localStorage.setItem('seed', `"${generateId()}"`);
}

export const seed = persisted<string | null>('seed', null);

export const scores = persisted<Record<string, number>>(
	'scores',
	Object.fromEntries(ENTRIES.map((entry: Entry) => [entry.id, 1400])),
);

export const results = persisted<Result[]>('results', []);

export const entries = derived<Stores, { entryA: Entry; entryB: Entry }>(
	[seed, results],
	([$seed, $results]) => {
		function getProbabilities(excludeIndex: number | null = null): number[] {
			const entryOccurrences = Object.fromEntries(ENTRIES.map((entry) => [entry.id, 0]));
			for (const result of $results) {
				entryOccurrences[result.a] += 1;
				entryOccurrences[result.b] += 1;
			}

			const occurrences = Object.entries(entryOccurrences).map(([, occurrences]) => occurrences);
			const minimumOccurrences = Math.min(...occurrences);
			const maximumOccurrences = Math.max(...occurrences);

			return occurrences.map((occurrence, i) =>
				i === excludeIndex ? 0 : 10 * (maximumOccurrences - (occurrence - minimumOccurrences)) + 1,
			);
		}

		const random = xoshiro128pf($seed);
		const entryScoresA = getProbabilities();
		const entryIndexA = random.weighted(entryScoresA);
		const entryScoresB = getProbabilities(entryIndexA);
		const entryIndexB = random.weighted(entryScoresB);

		const entryA = ENTRIES[entryIndexA];
		const entryB = ENTRIES[entryIndexB];

		return { entryA, entryB };
	},
);

export const entryA = derived(entries, ($entries) => $entries.entryA);
export const entryB = derived(entries, ($entries) => $entries.entryB);
