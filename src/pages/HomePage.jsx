/* eslint-disable no-unused-vars */
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import QuizComponent from "../components/QuizComponent";

export default function Home() {
	const user = JSON.parse(localStorage.getItem("user"));
	const subjectsObj = user.subjects;
	const subjects = Object.values(subjectsObj);
	const quizzesObj = useLoaderData();
	const quizzes = Object.values(quizzesObj);
	return (
		<>
			<div className="container-fluid align-content-center">
				<div className="row align-content-center">
					<div className="col-md-5 QuizeesSection example">
						<h2 className="sectionTitle">
							<i className="fas fa-graduation-cap"></i> Quizees
						</h2>
						{quizzes.map((quiz) => (
							<QuizComponent
								key={quiz._id}
								quiz={quiz}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export async function loader() {
	const res = await axios.get("http://localhost:3001/quiz");
	return res.data.quizzes;
}
