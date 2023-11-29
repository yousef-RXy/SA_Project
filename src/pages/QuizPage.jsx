import axios from "axios";
import { useLoaderData } from "react-router-dom";

export default function Quiz() {
	const { quiz } = useLoaderData();
	console.log(quiz);
	return <>hi</>;
}

// eslint-disable-next-line no-unused-vars, react-refresh/only-export-components
export async function loader({ request, params }) {
	const id = params.quizId;

	const res = await axios.get("http://localhost:3001/quiz/" + id);
	return res.data;
}
