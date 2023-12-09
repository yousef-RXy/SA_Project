/* eslint-disable no-unused-vars */
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import QuizComponent from "../components/QuizComponent";

export default function Home() {
	const subjectsObj = useSelector((state) => state.user.subjects);
	const subjects = Object.values(subjectsObj);
	const quizzesObj = useLoaderData();
	const quizzes = Object.values(quizzesObj);
	return (
		<>
			<div className=" grid md:grid-cols-5 grid-cols-2 gap-4 p-8">
				{quizzes.map((quiz) => (
					<QuizComponent
						key={quiz.id}
						quiz={quiz}
					/>
				))}
			</div>
		</>
	);
}

export async function loader() {
	const res = await axios.get("http://localhost:3001/quizzes");
	return res.data.quizzes;
}
