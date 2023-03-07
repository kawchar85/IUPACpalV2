import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "src/lib/firebase";

export function uploadFileCallBack(file: any, fileName: string) {
	return new Promise((resolve, reject) => {
		if (!file) return;
		const storageRef = ref(storage, `files/${fileName}`);
		const uploadTask = uploadBytesResumable(storageRef, file);
		uploadTask.on(
			"state_changed",
			(snapshot: any) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log("Upload is " + progress + "% done");
			},
			(error: any) => {
				reject(error);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((url: any) => {
					console.log(url);
					resolve({ data: { link: url } });
				});
			}
		);
	});
}
