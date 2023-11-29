import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/user-slice";
import { IoAddOutline } from "react-icons/io5";
import { CiFileOn, CiSquareCheck } from "react-icons/ci";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
function MainNavigation() {
	const [showAddIcons, setShowAddIcons] = useState(false);
	const dispatch = useDispatch();
	const def = "rounded-full hover:bg-[#005CC8] hover:text-white p-4";
	const active = def + " bg-[#005CC8] text-white";
	const navigate = useNavigate();
	const isAdmin = useSelector((state) => state.user.isAdmin);
	const addStyle = isAdmin
		? "transition-all relative flex justify-center cursor-pointer font-bold text-3xl text-white"
		: "hidden";

	let quizIconsStyle = showAddIcons ? "top-[-90px] " : "invisible top-0";
	let fileIconsStyle = showAddIcons ? "top-[-50px] " : "invisible top-0";

	function addClickHandler() {
		setShowAddIcons((state) => !state);
	}

	function fileClickHandler() {
		navigate("/addfile");
	}

	function quizClickHandler() {
		setShowAddIcons((state) => !state);
	}

	function logoutClickHandler() {
		dispatch(userActions.rmvUser());
		localStorage.removeItem("user");
		navigate("/auth?mode=login");
	}

	return (
		<>
			<header className="z-20 flex p-4 bg-[#fafafa] border-solid border-2 border-black col-span-full justify-between">
				<NavLink
					to={""}
					className="mx-3 font-extrabold text-2xl text-center flex items-center"
				>
					<p>Studently</p>
				</NavLink>
				<button
					onClick={logoutClickHandler}
					className="transition-all mx-3 px-3 text-lg text-white rounded-xl bg-[#005cc8] hover:bg-[#004a9e]"
				>
					Logout
				</button>
			</header>
			<header className=" justify-between z-10 flex flex-col max-w-4xl p-7 bg-[#fafafa] border-solid border-x-2 border-black col-span-1 row-start-2 ">
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
				<div
					onClick={addClickHandler}
					className={addStyle}
				>
					<div
						onClick={fileClickHandler}
						className={
							"z-10 duration-300 transform transition-all p-1 cursor-pointer text-2xl text-white bg-[#005cc8] hover:bg-[#004a9e] rounded-lg absolute " +
							fileIconsStyle
						}
					>
						<CiFileOn />
					</div>
					<div
						onClick={quizClickHandler}
						className={
							"hidden z-10 duration-300 transform transition-all p-1 cursor-pointer text-2xl text-white bg-[#005cc8] hover:bg-[#004a9e] rounded-lg absolute " +
							quizIconsStyle
						}
					>
						<CiSquareCheck />
					</div>
					<IoAddOutline className="z-20 transition-all w-24 h-[40px] bg-[#005cc8] hover:bg-[#004a9e] rounded-lg " />
				</div>
			</header>
		</>
	);
}

export default MainNavigation;
