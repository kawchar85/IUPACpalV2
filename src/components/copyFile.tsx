import { useEffect } from "react";
import { storage } from "src/lib/firebase";
import axios from "axios";
import fs from "fs";

interface Props {
	url: string;
}

export default function CopyFile({ url }: Props) {
	useEffect(() => {
		async function copyFirebaseFileToMyFile() {
			const response = await axios.get(url, {
				responseType: "arraybuffer", // Set the response type to arraybuffer to get binary data
			});

			const data = Buffer.from(response.data, "binary"); // Convert the binary data to a buffer

			// Write the buffer to myFile.fasta
			fs.writeFile("src\\helpers\\myFile.txt", data, (err) => {
				if (err) throw err;
				console.log("File written successfully!");
			});
		}

		copyFirebaseFileToMyFile();
	}, []);

	return <div>Copying Firebase file to myFile.fasta...</div>;
}
