import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Files, { loader as fetchFile } from "./pages/FilesPage";
import Home, { loader as eventsLoader } from "./pages/HomePage";
import Quiz, { loader as fetchQuiz } from "./pages/QuizPage";
import UserData, { loader as fetchSubjects } from "./pages/UserDataPage";
import AuthenticationPage, {
	action as authAction,
} from "./pages/Authentication.jsx";
import RootLayout from "./pages/Root.jsx";
import AddFile from "./pages/AddFilePage.jsx";

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
			{
				path: "addfile",
				element: <AddFile />,
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
