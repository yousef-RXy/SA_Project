import {
	Form,
	Link,
	useSearchParams,
	useActionData,
	useNavigation,
} from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
	const data = useActionData();
	const navigation = useNavigation();
	const [searchParams] = useSearchParams();
	const isLogin = searchParams.get("mode") === "login";
	const isSubmitting = navigation.state === "submitting";
	console.log(data);
	return (
		<>
			<Form
				method="post"
				className={classes.form}
			>
				<h1>{isLogin ? "Log in" : "Create a new user"}</h1>

				{data && data.data && data.data.errobj && (
					<p>{data.data.errobj.errorMessage}</p>
				)}
				{data && data.message && <p>{data.message}</p>}
				<p>
					<label htmlFor="email">Email</label>
					<input
						id="email"
						type="email"
						name="email"
						required
					/>
				</p>
				<p>
					<label htmlFor="password">Password</label>
					<input
						id="password"
						type="password"
						name="password"
						required
					/>
				</p>
				{!isLogin && (
					<p>
						<label htmlFor="password-confirmation">Password Confirmation</label>
						<input
							id="password-confirmation"
							type="password"
							name="password-confirmation"
							required
						/>
					</p>
				)}
				<div className={classes.actions}>
					<Link to={`?mode=${isLogin ? "signup" : "login"}`}>
						{isLogin ? "Create new user" : "Login"}
					</Link>
					<button disabled={isSubmitting}>
						{isSubmitting ? "Submitting..." : isLogin ? "Login" : "SignUp"}
					</button>
				</div>
			</Form>
		</>
	);
}

export default AuthForm;
