/* eslint-disable react/prop-types */
// import { Link, useNavigation } from "react-router-dom";
import { Link } from "react-router-dom";
import folderLogo from "../assets/folder-svgrepo-com.svg";

export default function Folder({ name }) {
	// const navigation = useNavigation();
	// console.log(navigation.state);
	return (
		<Link
			to={`${name.toLowerCase()}`}
			className="transition-all drop-shadow place-items-center hover:bg-sky-100 bg-neutral-100 rounded-3xl grid gap-y-2 grid-cols-1 grid-rows-3 p-4"
		>
			<img
				className="row-span-2 w-28"
				src={folderLogo}
			/>
			<p className="text-center w-40 text-ellipsis overflow-hidden">{name}</p>
		</Link>
	);
}
