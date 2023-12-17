import AnswerQuestionForm from "./AnswerQuestionForm";

export default function AdminShowQuestions({ questions, onAnswerSubmit }) {
	return questions.map((q, index) => (
		<li key={index}>
			<strong>Course: {q.courseName}</strong>
			<p>Question: {q.question}</p>
			{q.answer !== "" ? (
				<p>Answer: {q.answer}</p>
			) : (
				<AnswerQuestionForm
					index={index}
					onAnswer={onAnswerSubmit}
				/>
			)}
		</li>
	));
}
