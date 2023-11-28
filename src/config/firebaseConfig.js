// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCCQNJ1qhvNf4Rw5k9PNogs0us0KYuHBTE",
	authDomain: "saproject-32b53.firebaseapp.com",
	projectId: "saproject-32b53",
	storageBucket: "saproject-32b53.appspot.com",
	messagingSenderId: "27218272659",
	appId: "1:27218272659:web:f093138c63affe0dad0866",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
