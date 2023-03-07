import { NextApiRequest, NextApiResponse } from 'next';
import db from 'src/helpers/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

	const { input_file_link, output_file_link, seq_name, max_gap, max_mis, min_len, max_len } = req.body;
	const insertQuery = `INSERT INTO IRtable (input_file_link, output_file_link, seq_name, max_gap, max_mis, min_len, max_len) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

	try {
		const results = await new Promise((resolve, reject) => {
			db.query(insertQuery, [input_file_link, output_file_link, seq_name, max_gap, max_mis, min_len, max_len], (err, results) => {
				if (err) {
					reject(err);
				} else {
					resolve(results);
				}
			});
		});
		console.log('inserted...');
		res.status(200).json({ message: 'Data successfully inserted into IRtable' });
	} catch (err) {
		console.error('Error in inserting: ', err);
		res.status(500).json({ message: 'Error inserting data into IRtable' });
	}
}
