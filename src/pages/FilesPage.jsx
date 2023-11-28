import { useLocation } from "react-router-dom";
import { ref, listAll, getMetadata } from "firebase/storage";
import { storage } from "../config/firebaseConfig";
import { useEffect, useState } from "react";
import File from "../components/File";
// eslint-disable-next-line react/prop-types
export default function Files() {
	const [files, setFiles] = useState([]);
	const { state } = useLocation();
	const subject = state.subject;

	useEffect(() => {
		async function getFiles() {
			try {
				const dirRef = ref(storage, `${subject}/`);

				const filesRef = await listAll(dirRef);

				filesRef.items.forEach(async (fileRef) => {
					const fileMetadata = await getMetadata(fileRef);

					const file = {
						id: Math.random().toString(),
						fullPath: fileRef.fullPath,
						name: fileRef.name,
						contentType: fileMetadata.contentType,
					};

					setFiles((prevState) => [...prevState, file]);
				});
			} catch (error) {
				console.log(error);
			}
		}

		getFiles();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className="bg-zinc-50 grid md:grid-cols-5 grid-cols-2 gap-4 p-8">
			{files &&
				files.map((file) => (
					<File
						key={file.id}
						contentType={file.contentType}
						name={file.name}
						fullPath={file.fullPath}
					/>
				))}
		</div>
	);
}
