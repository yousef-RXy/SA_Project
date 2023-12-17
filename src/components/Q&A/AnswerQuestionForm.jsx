import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function AnswerQuestionForm({ index, onAnswer }) {
	const [answer, setAnswer] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		onAnswer(index, answer);
		setAnswer("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<textarea
				placeholder="Enter your answer"
				value={answer}
				onChange={(e) => setAnswer(e.target.value)}
			></textarea>
			<button>Submit Answer</button>
		</form>
	);
}
