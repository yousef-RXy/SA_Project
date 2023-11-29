/* eslint-disable no-undef */
require("dotenv").config();
const cors = require("cors");

const express = require("express");
const app = express();

const { upload } = require("./middleware/multer");

const {
	getDocs,
	collection,
	addDoc,
	doc,
	setDoc,
} = require("firebase/firestore");

const {
	ref,
	uploadBytesResumable,
	getDownloadURL,
	listAll,
	getMetadata,
} = require("firebase/storage");

const {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} = require("firebase/auth");

const { auth, storage, db } = require("./config/firebase.config");

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, PUT");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");

	next();
});

async function uploadFile(file, curName, dir) {
	await signInWithEmailAndPassword(
		auth,
		process.env.FIREBASE_USER,
		process.env.FIREBASE_AUTH
	);

	const fileName = `${dir}/${curName}`;
	const storageRef = ref(storage, fileName);
	const metadata = {
		contentType: file.type,
	};
	await uploadBytesResumable(storageRef, file.buffer, metadata);
	return fileName;
}

async function get(cName) {
	let cRef = collection(db, cName);
	const data = await getDocs(cRef);
	let filterdData = {};
	data.docs.forEach(
		(doc) =>
			(filterdData = {
				...filterdData,
				[doc.id]: { ...doc.data(), id: doc.id },
			})
	);
	return filterdData;
}

async function add(cName, data) {
	try {
		let cRef = collection(db, cName);
		const d = await addDoc(cRef, data);
		return d.id;
	} catch (error) {
		return error;
	}
}

async function update(cName, data, id) {
	try {
		const d = await setDoc(doc(db, cName, id), data);
		console.log(d);
		console.log(data);
		console.log(id);
		return d.id;
	} catch (error) {
		return error;
	}
}

app.post("/signup", async (req, res) => {
	let resObj = {};
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			req.body.email,
			req.body.password
		);
		const user = userCredential.user;
		resObj = { status: 200, user };
	} catch (error) {
		const errorCode = error.code;
		const errorMessage = error.message;
		const errobj = { errorCode, errorMessage };
		resObj = { status: 422, errobj };
	}
	res.send(resObj);
});

app.post("/login", async (req, res) => {
	let resObj = {};
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			req.body.email,
			req.body.password
		);
		const user = userCredential.user;
		resObj = { status: 200, user };
	} catch (error) {
		const errorCode = error.code;
		const errorMessage = error.message;
		const errobj = { errorCode, errorMessage };
		resObj = { status: 422, errobj };
	}
	res.send(resObj);
});

// eslint-disable-next-line no-unused-vars
app.get("/user/:id", async (req, res) => {
	const id = req.params.id;
	const subjects = await get("users");
	res.send({ status: 200, user: subjects[id] });
});

app.post("/user", async (req, res) => {
	const token = req.body.token;
	console.log(req.body.token);
	console.log(req.body.subjects);
	const id = await update("users", req.body, token);
	res.send({ status: 200, id });
});

// eslint-disable-next-line no-unused-vars
app.get("/subjects", async (req, res) => {
	const subjects = await get("subjects");
	res.send({ status: 200, subjects });
});

// eslint-disable-next-line no-unused-vars
app.get("/quizzes", async (req, res) => {
	const quizzes = await get("quizzes");
	res.send({ status: 200, quizzes });
});

app.get("/quiz/:id", async (req, res) => {
	const id = req.params.id;
	const quizzes = await get("quizzes");
	res.send({ status: 200, quiz: quizzes[id] });
});

// eslint-disable-next-line no-unused-vars
app.post("/addquiz", async (req, res) => {
	const id = await add("quizzes", req.body.quiz);
	res.send({ status: 200, id });
});

app.post("/uploadfile", upload, async (req, res) => {
	const dir = req.body.dir;
	const ogName = req.file.originalname;
	const file = {
		type: req.file.mimetype,
		buffer: req.file.buffer,
	};
	try {
		const buildImage = await uploadFile(
			file,
			ogName.toLowerCase(),
			dir.toLowerCase()
		);
		res.send({
			status: "SUCCESS",
			imageName: buildImage,
		});
	} catch (err) {
		console.log(err);
	}
});

app.get("/listfiles/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const dirRef = ref(storage, id);

		const filesRef = await listAll(dirRef);
		let files = [];
		for (const fileRef of filesRef.items) {
			const fileMetadata = await getMetadata(fileRef);
			const file = {
				id: Math.random().toString(),
				fullPath: fileRef.fullPath,
				name: fileRef.name,
				contentType: fileMetadata.contentType,
				downloadURL: await getDownloadURL(ref(storage, fileRef.fullPath)),
			};
			files = [...files, file];
		}
		res.send({ status: 200, files });
	} catch (error) {
		return error;
	}
});

app.listen(3001, () => {
	console.log("Server is running on 3001");
});
