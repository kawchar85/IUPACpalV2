import { NextApiRequest, NextApiResponse } from 'next';
import db from 'src/helpers/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const page = parseInt(req.query.page as string) || 1;
		const perPage = 5;
		const start = (page - 1) * perPage;
		const end = start + perPage;
		const results = await new Promise((resolve, reject) => {
			db.query('SELECT * FROM irtable where status = 1', (err, results) => {
				if (err) {
					reject(err);
				} else {
					resolve(results);
				}
			});
		});
		const response = {
			data: (results as any).slice(start, end),
			totalPages: Math.floor(((results as any).length + perPage - 1) / perPage)
		};
		res.status(200).json(response);
	} catch (err) {
		console.error('Error fetching data from IRtable: ', err);
		res.status(500).json({ message: 'Error getting data' });
	}
}