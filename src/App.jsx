import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Files, { loader as fetchFile } from "./pages/FilesPage";
import Home, { loader as eventsLoader } from "./pages/HomePage";
import Quiz, { loader as fetchQuiz } from "./pages/QuizPage";
import UserData, { loader as fetchSubjects } from "./pages/UserDataPage";
import AuthenticationPage, {
	action as authAction,
} from "./pages/Authentication.jsx";
import RootLayout from "./pages/Root.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		// 	errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Home />,
				loader: eventsLoader,
			},
			{
				path: "files/:subId",
				element: <Files />,
				loader: fetchFile,
			},
			{
				path: "quizzes/:quizId",
				element: <Quiz />,
				loader: fetchQuiz,
			},
			{
				path: "userdata",
				element: <UserData />,
				loader: fetchSubjects,
			},
		],
	},
	{
		path: "/auth",
		element: <AuthenticationPage />,
		action: authAction,
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
