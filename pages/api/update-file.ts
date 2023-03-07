import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'helpers', 'input.txt');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		res.status(405).json({ message: 'Method not allowed' });
		return;
	}

	const newContent = req.body.newContent;

	try {
		fs.writeFileSync(filePath, newContent);
		res.status(200).json({ message: 'File updated successfully' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Failed to update file' });
	}
}
