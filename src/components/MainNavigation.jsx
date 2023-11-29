import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/user-slice";

// eslint-disable-next-line react/prop-types
function MainNavigation() {
	const dispatch = useDispatch();
	const def = "rounded-full hover:bg-[#005CC8] hover:text-white p-4";
	const active = def + " bg-[#005CC8] text-white";
	const navigate = useNavigate();
	const isAdmin = useSelector((state) => state.user);
	function clickHandler() {
		dispatch(userActions.rmvUser());
		localStorage.removeItem("user");
		navigate("/auth?mode=login");
	}

	return (
		<>
			<header className="z-10 flex p-4 bg-[#fafafa] border-solid border-2 border-black col-span-full justify-between">
				<NavLink
					to={""}
					className="mx-3 font-extrabold text-2xl text-center flex items-center"
				>
					<p>Studently</p>
				</NavLink>
				<button
					onClick={clickHandler}
					className="mx-3 px-3 text-lg text-white rounded-xl bg-[#005cc8] hover:bg-[#004a9e]"
				>
					Logout
				</button>
			</header>
			<header className=" z-10 flex flex-col max-w-4xl p-7 bg-[#fafafa] border-solid border-x-2 border-black col-span-1 row-start-2 ">
				<nav>
					<ul className="flex flex-col items-center gap-8">
						<li>
							<NavLink
								to=""
								className={({ isActive }) => (isActive ? active : def)}
								end
							>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								to="userdata"
								className={({ isActive }) => (isActive ? active : def)}
							>
								User
							</NavLink>
						</li>
					</ul>
				</nav>
			</header>
		</>
	);
}

export default MainNavigation;
