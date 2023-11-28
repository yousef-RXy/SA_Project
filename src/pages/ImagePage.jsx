import { useLocation } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function Image() {
	const { state } = useLocation();
	const url = state.url;
	return <img src={url} />;
}
