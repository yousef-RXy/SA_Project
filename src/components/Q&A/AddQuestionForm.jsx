/* eslint-disable react/prop-types */
import SelectSubject from "../SelectSubject";
import { updateQuestions } from "../../util/http";
import { useState } from "react";

export default function AddQuestionForm({ onAdd, questions }) {
	const [error, setError] = useState("");

	const onSubmit = (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		const courseName = data.get("dir");
		const question = data.get("question");
		if (courseName.length === 0 || question.length === 0) {
			setError(" enter valid data");
		} else {
			// check if question already exists
			let flag = false;
			console.log(typeof questions);
			questions.forEach((q) => {
				if (q.courseName === courseName && q.question === question) {
					setError("Question already exists");
					flag = true;
					return;
				}
			});

			if (flag) return;

			setError("");

			// create new question object
			const newQuestion = {
				courseName,
				question,
				answer: "",
			};

			// add question to database
			updateQuestions(newQuestion);
			onAdd(newQuestion);
		}
	};
	return (
		<div>
			<h2>Add a Question</h2>
			<form onSubmit={onSubmit}>
				<SelectSubject />
				<textarea
					placeholder="Enter your question"
					name="question"
				></textarea>
				<button type="submit">Submit</button>
			</form>
			{error !== "" && <p className=" text-center text-red-500 m-1">{error}</p>}
		</div>
	);
}
