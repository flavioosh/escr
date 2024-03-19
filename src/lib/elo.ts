export type EloOptions = {
	k: number;
	constant: number;
};

const DEFAULT_OPTIONS: EloOptions = {
	k: 32,
	constant: 480,
};

export function calculateEloScores(
	currentA: number,
	currentB: number,
	winner: 'a' | 'b',
	options: EloOptions = DEFAULT_OPTIONS,
): { a: number; b: number } {
	const qA = Math.pow(10, currentA / options.constant);
	const qB = Math.pow(10, currentB / options.constant);

	const expectedA = qA / (qA + qB);
	const expectedB = qB / (qA + qB);

	const actualA = winner === 'a' ? 1 : 0;
	const actualB = winner === 'b' ? 1 : 0;

	return {
		a: currentA + Math.round(options.k * (actualA - expectedA)),
		b: currentB + Math.round(options.k * (actualB - expectedB)),
	};
}
