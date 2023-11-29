import axios from "axios";
import { json } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
export async function addQuiz() {
	const quiz = {
		name: "intro to sa",
		sub: "sa",
		questions: [
			{ q: "what is sa", choices: ["sa", "se", "as", "cs"], answer: "sa" },
			{ q: "what is cs", choices: ["cs", "se", "as", "cs"], answer: "cs" },
		],
	};
	const res = await axios.post("http://localhost:3001/addquiz", { quiz });
	console.log(res);
}

export async function updateUser(user) {
	console.log("her");
	const res = await axios.post("http://localhost:3001/user", user);

	if (res.data.status === 422 || res.data.status === 401) {
		console.log(res.data);
		return res;
	}

	const resOK = res && res.data.status === 200 && res.statusText === "OK";

	if (!resOK) {
		console.log(res.data);
		throw json({ message: "Could not authenticate user." }, { status: 500 });
	}
}
