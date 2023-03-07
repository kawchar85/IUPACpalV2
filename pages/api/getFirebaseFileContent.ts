import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const url = req.query.url as string;
		const response = await axios.get(url);
		const content = response.data;
		res.status(200).send(content);
	} catch (error: any) {
		console.error(error);
		res.status(500).send(error.message);
	}
}

// import { storage } from "src/lib/firebase";
// import axios from "axios";
// import type { NextApiRequest, NextApiResponse } from 'next'

// export default async function handler(
// 	req: NextApiRequest,
// 	res: NextApiResponse) {
// 	const { url } = req.body;
// 	const storageRef = storage.refFromURL(url);
// 	const downloadUrl = await storageRef.getDownloadURL();
// 	const response = await axios.get(downloadUrl, {
// 		responseType: "arraybuffer",
// 	});
// 	const data = Buffer.from(response.data, "binary").toString();
// 	res.status(200).json({ content: data });
// }
