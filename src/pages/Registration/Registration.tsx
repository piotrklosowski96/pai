import { useState } from "react";
import { register } from "../../client";
import { useNavigate } from "react-router-dom";

export function RegistrationPage() {
	const [username, setUsername] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
	const [error, setError] = useState<string>("");

	const navigate = useNavigate();

	const passwordsMatching = (): boolean => {
		return password === passwordConfirmation;
	};

	const registerNewUser = () => {
		register({
			body: {
				username: username,
				password: password,
				email: email,
				firstName: firstName,
				lastName: lastName,
			},
		})
			.then(() => {
				navigate("/");
			})
			.catch((e) => {
				setError(e.body);
			});
	};

	return (
		<>
			<div
        className={"flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"}
      >
				<div
          className={"sm:mx-auto sm:w-full sm:max-w-sm"}
        >
					<h2
						data-testid={"register-page-header"}
						className={"mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white"}
					>
						Zarejestruj się
					</h2>
				</div>

				<div
          className={"mt-4 sm:mx-auto sm:w-full sm:max-w-sm"}
        >
					<form
						data-testid={"register-page-form-element"}
						className={"space-y-6"}
						onSubmit={(e) => {
							e.preventDefault();
							registerNewUser();
						}}
					>
						<div>
							<label
								data-testid={"register-page-login-label"}
								className={"block text-sm font-medium leading-6 text-white"}
							>
								Login
								<input
									data-testid={"register-page-login-input-element"}
									id="login"
									name="login"
									required
									className={"block w-full h-10 mt-2 pl-2 pr-2 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
									onInput={(e) => setUsername(e.currentTarget.value)}
								/>
							</label>
						</div>

						<label
							data-testid={"register-page-email-label"}
							className={"block text-sm font-medium leading-6 text-white mt-2"}
						>
							Adres email
							<input
								data-testid={"register-page-email-input-element"}
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								className={"block w-full h-10 mt-2 pl-2 pr-2 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
								onInput={(e) => {
									setEmail(e.currentTarget.value);
								}}
							/>
						</label>

						<label
							data-testid={"register-page-password-label"}
							className={"block text-sm font-medium leading-6 text-white mt-2"}
						>
							Hasło
							<input
								data-testid={"register-page-password-input-element"}
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className={"block w-full h-10 mt-2 pl-2 pr-2 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
								onInput={(e) => {
									setPassword(e.currentTarget.value);
								}}
							/>
							<h1 hidden={passwordsMatching()} className={"text-red-700"}>
								Podane hasła nie pasują do siebie!
							</h1>
						</label>

						<label
							data-testid={"register-page-repeat-password-label"}
							htmlFor="password"
							className={"block text-sm font-medium leading-6 text-white"}
						>
							Powtórz hasło
							<input
								data-testid={"register-page-repeat-password-input-element"}
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className={"block w-full h-10 mt-2 pl-2 pr-2 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
								onInput={(e) => {
									setPasswordConfirmation(e.currentTarget.value);
								}}
							/>
							<h1 hidden={passwordsMatching()} className={"text-red-700"}>
								Podane hasła nie pasują do siebie!
							</h1>
						</label>

						<div>
							<label
								data-testid={"register-page-name-label"}
								className={"block text-sm font-medium leading-6 text-white"}
							>
								Imię
								<input
									data-testid={"register-page-name-input-element"}
									id="login"
									name="login"
									required
									className={"block w-full h-10 mt-2 pl-2 pr-2 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
									onInput={(e) => setFirstName(e.currentTarget.value)}
								/>
							</label>
						</div>

						<div>
							<label
								data-testid={"register-page-last-name-label"}
								className={"block text-sm font-medium leading-6 text-white"}
							>
								Nazwisko
								<input
									data-testid={"register-page-last-name-input-element"}
									id="login"
									name="login"
									required
									className={"block w-full h-10 mt-2 pl-2 pr-2 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
									onInput={(e) => setLastName(e.currentTarget.value)}
								/>
							</label>
						</div>

						<button
							data-testid={"register-page-submit-button"}
							type="submit"
							className={"flex w-full h-10 justify-center items-center rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}
							disabled={!passwordsMatching()}
						>
							Zarejestruj się
						</button>
						<h1 hidden={error === ""} className={"text-red-700"}>
							{error}
						</h1>
					</form>
				</div>
			</div>
		</>
	);
}
