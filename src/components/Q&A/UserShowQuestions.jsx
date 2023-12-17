export default function UserShowQuestions({ questions }) {
	return questions.map(
		(q, index) =>
			q.answer !== "" && (
				<li key={index}>
					<strong>Course: {q.courseName}</strong>
					<p>Question: {q.question}</p>
					<p>Answer: {q.answer}</p>
				</li>
			)
	);
}
