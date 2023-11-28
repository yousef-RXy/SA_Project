import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import Files from "./pages/FilesPage";
import Image from "./pages/ImagePage";
import Home, { loader as eventsLoader } from "./pages/HomePage";
import Quiz, { loader as fetchQuiz } from "./pages/QuizPage";

const router = createBrowserRouter([
	{
		path: "/",
		// 	element: <RootLayout />,
		// 	errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Home />,
				loader: eventsLoader,
			},
			{
				path: "files",
				element: <Files />,
			},
			{
				path: "quizzes/:quizId",
				element: <Quiz />,
				loader: fetchQuiz,
			},
			{
				path: "image",
				element: <Image />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;

// import { useState } from "react";
// import axios from "axios";

// function App() {
// 	const [file, setFile] = useState();
// 	const upload = () => {
// 		const formData = new FormData();
// 		formData.append("file", file);
// 		formData.append("dir", "sa");
// 		axios
// 			.post("http://localhost:3001/test-upload", formData)
// 			.then((res) => {
// 				console.log(res);
// 			})
// 			.catch((er) => console.log(er));
// 	};
// 	return (
// 		<div>
// 			<input
// 				type="file"
// 				onChange={(e) => setFile(e.target.files[0])}
// 			/>
// 			<button
// 				type="button"
// 				onClick={upload}
// 			>
// 				Upload
// 			</button>
// 		</div>
// 	);
// }

// export default App;
