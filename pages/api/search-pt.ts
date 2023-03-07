import { NextApiRequest, NextApiResponse } from 'next';
import db from 'src/helpers/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const page = parseInt(req.query.page as string) || 1;
		const perPage = 5;
		const start = (page - 1) * perPage;
		const end = start + perPage;
		const keyToFindOriginal = req.query.keyToFind as string;
		const key = '%' + keyToFindOriginal + "%";
		const keyToFind = parseInt(keyToFindOriginal);
		let results;
		if (isNaN(keyToFind)) {
			results = await new Promise((resolve, reject) => {
				db.query('SELECT * FROM irtable WHERE seq_name LIKE ?', [key], (err, results) => {
					if (err) {
						reject(err);
					} else {
						resolve(results);
					}
				});
			});
		}
		else {
			results = await new Promise((resolve, reject) => {
				db.query('SELECT * FROM irtable WHERE seq_name LIKE ? or ? IN (max_gap, max_mis, min_len, max_len) AND status = 0', [key, keyToFind], (err, results) => {
					if (err) {
						reject(err);
					} else {
						resolve(results);
					}
				});
			});
		}

		const response = {
			data: (results as any).slice(start, end),
			totalPages: ((results as any).length + perPage - 1) / perPage
		};
		res.status(200).json(response);
	} catch (err) {
		console.error('Error fetching data from IRtable: ', err);
		res.status(500).json({ message: 'Error getting data' });
	}
}