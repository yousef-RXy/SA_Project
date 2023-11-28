/* eslint-disable no-unused-vars */
import { useNavigate, useLoaderData, Link } from "react-router-dom";
import axios from "axios";
import QuizComponent from "../components/QuizComponent";

export default function Home() {
	const quizzesObj = useLoaderData();
	const quizzes = Object.values(quizzesObj);
	const navigate = useNavigate();

	const clickHandler = () => {
		navigate("files", {
			state: { subject: "sa" },
		});
	};

	return (
		<>
			{quizzes.map((quiz) => (
				<QuizComponent
					key={quiz.id}
					quiz={quiz}
				/>
			))}
			<p onClick={clickHandler}>files</p>
		</>
	);
}

export async function loader() {
	const res = await axios.get("http://localhost:3001/quizzes");
	return res.data.quizzes;
}
