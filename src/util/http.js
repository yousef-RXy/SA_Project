import axios from "axios";
// eslint-disable-next-line no-unused-vars
async function addQuiz(quiz) {
	// const quiz = {
	// 	name: "intro to sa",
	// 	sub: "sa",
	// 	questions: [
	// 		{ q: "what is sa", choices: ["sa", "se", "as", "cs"], answer: "sa" },
	// 		{ q: "what is cs", choices: ["cs", "se", "as", "cs"], answer: "cs" },
	// 	],
	// };
	const res = await axios.post("http://localhost:3001/addquiz", { quiz });
	console.log(res);
}
