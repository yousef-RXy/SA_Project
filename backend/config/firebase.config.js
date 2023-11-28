/* eslint-disable no-undef */
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getStorage } = require("firebase/storage");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
	apiKey: process.env.apiKey,
	authDomain: process.env.authDomain,
	projectId: process.env.projectId,
	storageBucket: process.env.storageBucket,
	messagingSenderId: process.env.messagingSenderId,
	appId: process.env.appId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

module.exports = {
	auth,
	storage,
	db,
};
