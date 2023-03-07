import { NextApiRequest, NextApiResponse } from 'next';

interface SearchQuery {
	dnaSequence: string;
	minLength?: number;
	maxLength?: number;
	maxMismatches?: number;
	maxGaps?: number;
}

export default function searchHandler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		//return res.status(405).json({ error: 'Method Not Allowed' });
	}

	const { dnaSequence, minLength, maxLength, maxMismatches, maxGaps }: SearchQuery = req.body;

	// perform the search using the provided query parameters
	// and return the search results as a JSON response
	const searchResults = performSearch(dnaSequence, minLength, maxLength, maxMismatches, maxGaps);
	return res.status(200).json(searchResults);
}

function performSearch(dnaSequence: string, minLength?: number, maxLength?: number, maxMismatches?: number, maxGaps?: number) {
	// Perform the search using the provided query parameters
	// For now, just return some dummy search results
	const results = [
		{ id: 1, match: 'ATCGATCGATCG', length: 12, mismatches: 0, gaps: 0 },
		{ id: 2, match: 'ATCGATCG', length: 8, mismatches: 1, gaps: 0 },
		{ id: 3, match: 'ATCGATCGATCG', length: 12, mismatches: 0, gaps: 2 },
		{ id: 4, match: 'ATCGATCG', length: 8, mismatches: 1, gaps: 1 },
	];

	return results;
}