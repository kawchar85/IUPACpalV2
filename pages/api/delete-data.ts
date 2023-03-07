import { NextApiRequest, NextApiResponse } from 'next';
import db from 'src/helpers/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { id } = req.query;
	const deleteQuery = "DELETE FROM IRtable WHERE id = ?";

	try {
		const results = await new Promise((resolve, reject) => {
			db.query(deleteQuery, [id], (err, results) => {
				if (err) {
					reject(err);
				} else {
					resolve(results);
				}
			});
		});
		res.status(200).json({ message: 'Data successfully deleted from IRtable' });
	} catch (err) {
		console.error('Error deleting user: ', err);
		res.status(500).json({ message: 'Error deleting data from IRtable' });
	}
}

