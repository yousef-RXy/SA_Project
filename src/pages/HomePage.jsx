/* eslint-disable no-unused-vars */
import { useLoaderData, Link } from "react-router-dom";

import axios from "axios";
import QuizComponent from "../components/QuizComponent";

export default function Home() {
	const quizzesObj = useLoaderData();
	const quizzes = Object.values(quizzesObj);
	return (
		<>
			<div className="bg-zinc-50 grid md:grid-cols-5 grid-cols-2 gap-4 p-8">
				{quizzes.map((quiz) => (
					<QuizComponent
						key={quiz.id}
						quiz={quiz}
					/>
				))}
			</div>
			<Link to="files/sa">files</Link>
		</>
	);
}

export async function loader() {
	const res = await axios.get("http://localhost:3001/quizzes");
	return res.data.quizzes;
}
