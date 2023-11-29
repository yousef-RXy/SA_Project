import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";
import MainNavigation from "../components/MainNavigation";
import { useEffect } from "react";

export default function RootLayout() {
	const location = useLocation();
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem("user"));
	const isLogin = user && user.token !== "" && user.token !== null;
	useEffect(() => {
		isLogin && dispatch(userActions.setUser(user));
	}, []);

	return (
		<>
			{isLogin ? (
				<>
					<MainNavigation />
					<main style={{ gridColumn: 2, gridRow: 2 }}>
						<Outlet />
					</main>
				</>
			) : (
				<Navigate
					to="/auth?mode=login"
					state={{ from: location }}
					replace
				/>
			)}
		</>
	);
}
