import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function AddFile() {
	const navigate = useNavigate();
	const isAdmin = useSelector((state) => state.user.isAdmin);
	useEffect(() => {
		if (!isAdmin) navigate("/");
	}, [isAdmin, navigate]);

	function handleSubmit(e) {
		e.preventDefault();
		const data = new FormData(e.target);
		const dataObj = Object.fromEntries(data.entries());
		axios
			.post("http://localhost:3001/uploadfile", data)
			.then(() => {
				navigate(`/files/${dataObj.dir}`);
			})
			.catch((er) => console.log(er));
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="file"
				name="file"
			/>
			<input
				type="text"
				name="dir"
			/>
			<button>Upload</button>
		</form>
	);
}
