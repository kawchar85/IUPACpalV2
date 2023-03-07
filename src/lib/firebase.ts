// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAmATimQNx0ChTI5ufha-P_y0L_1xXBUwY",
	authDomain: "iupacpal.firebaseapp.com",
	projectId: "iupacpal",
	storageBucket: "iupacpal.appspot.com",
	messagingSenderId: "92926241586",
	appId: "1:92926241586:web:49fac54722dba7d218c52b"
};


const app = initializeApp(firebaseConfig);

const storage = getStorage()


export {
	storage, app
}

