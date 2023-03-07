// Import the necessary Firebase Storage types
import type { FirebaseStorage } from 'firebase/storage';

// Add the `refFromURL()` method to the `FirebaseStorage` interface
declare module 'firebase/storage' {
	interface FirebaseStorage {
		refFromURL(url: string): firebase.storage.Reference;
	}
}
