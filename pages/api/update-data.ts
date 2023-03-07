import { NextApiRequest, NextApiResponse } from 'next';
import db from 'src/helpers/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const id = req.body.id;
	const status = req.body.status;
	const updateQuery = 'UPDATE irtable SET status = ? WHERE id = ?'
	console.log(updateQuery);

	try {
		const results = await new Promise((resolve, reject) => {
			db.query(updateQuery, [status, id], (err, results) => {
				if (err) {
					reject(err);
				} else {
					resolve(results);
				}
			});
		});
		res.status(200).json('Data successfully updated in IRtable');
	} catch (err) {
		console.error('Error updating: ', err);
		res.status(500).json('Error updating data from IRtable');
	}
}