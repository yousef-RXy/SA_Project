import { useNavigate } from "react-router-dom";
import axios from "axios";
import PDFLogo from "../assets/pdf-svgrepo-com.svg";
import JPGLogo from "../assets/jpg-svgrepo-com.svg";

/* eslint-disable react/prop-types */
export default function File({ name, contentType, fullPath }) {
	const navigate = useNavigate();
	let isPDF;
	if (contentType === "application/pdf") {
		isPDF = true;
	} else {
		isPDF = false;
	}
	const clickHandler = async () => {
		try {
			const res = await axios.post("http://localhost:3001/getfile", {
				fullPath,
			});
			const url = res.data.file;
			if (isPDF) {
				window.open(url);
			} else {
				navigate("/image", {
					state: { url },
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div
			className="drop-shadow place-items-center hover:bg-slate-100 bg-neutral-100 rounded-3xl grid gap-y-2 grid-cols-1 grid-rows-3 p-4"
			onClick={clickHandler}
		>
			<img
				className="row-span-2 w-28"
				src={isPDF ? PDFLogo : JPGLogo}
			/>
			<p className="text-center w-40 text-ellipsis overflow-hidden">{name}</p>
		</div>
	);
}
