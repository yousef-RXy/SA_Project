/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { Link } from "react-router-dom";

export default function QuizComponent({ quiz }) {
	return <Link to={`quizzes/${quiz.id}`}>{quiz.name}</Link>;
}
