import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import { updateUser } from "../util/http";

export default function UserData() {
	const navigate = useNavigate();
	const subjectsObj = useLoaderData();
	const subjects = Object.values(subjectsObj);
	let user = JSON.parse(localStorage.getItem("user"));
	const [error, setError] = useState(false);

	function handleSubmit(event) {
		event.preventDefault();

		const subject = new FormData(event.target);
		const boxChannel = subject.getAll("box");
		const data = Object.fromEntries(subject.entries());
		data.box = boxChannel;

		if (data.box.length < 4 || data.box.length > 7) {
			setError(true);
		} else {
			setError(false);
			let obj;
			let x = 0;
			data.box.forEach((e) => {
				const eArray = e.split(",");
				obj = { ...obj, [x++]: { name: eArray[0], hours: eArray[1] } };
			});
			user = { ...user, subjects: obj };
			localStorage.setItem("user", JSON.stringify(user));
			updateUser(user);
			navigate("/files");
		}
	}

	return (
		<div className="flex flex-col items-center mx-auto my-3">
			<h1 style={{ textAlign: "center", margin: "5px" }}>
				Choose Your Subjects!
			</h1>
			<form
				className=" w-[450px] p-6 rounded-2xl border-solid border-2 border-black flex flex-col gap-1 bg-[#fafafa]"
				onSubmit={handleSubmit}
			>
				{subjects.map((sub) => {
					const subject = [sub.value, sub.hours];
					return (
						<div
							className="flex items-center justify-between m-3 text-[22px]"
							key={sub.id}
						>
							<label>{sub.value}</label>
							<input
								type="checkbox"
								name="box"
								value={subject}
							/>
						</div>
					);
				})}
				<button className="transition-all text-white bg-[#005cc8] px-3 py-2 text-lg uppercase rounded-xl cursor-pointer hover:bg-[#004a9e]">
					Save
				</button>
			</form>
			{error && (
				<p className=" text-center text-red-500 m-1">
					You can register 4 or 7 subjects only
				</p>
			)}
		</div>
	);
}

export async function loader() {
	const res = await axios.get("http://localhost:3001/subjects");
	return res.data.subjects;
}
