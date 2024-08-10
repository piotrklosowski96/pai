import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { completeRegistration, oauth2Token } from "../../clientv2";

export function FinishRegistrationPage() {
	const [login, setLogin] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")
	const [error] = useState<string>("")

	const [searchParams] = useSearchParams()
	const navigate = useNavigate()

	const passwordsMatching = (): boolean => {
		return password === passwordConfirmation
	}

	const completeUserRegistration = () => {
		const clientID = "a19a16fa-ea14-4edb-9181-80cb886bbeaf"
		const clientSecret = "fd9f1mHx8bW8CkPwyYpcTabS1NJRHqeT"

		completeRegistration({
			body: {
				username: login,
				password: password,
			},
			registrationCode: searchParams.get("registration_code")!,
		}).then(() => {
			oauth2Token({
				clientId: clientID,
				clientSecret: clientSecret,
				code: searchParams.get("code")!,
				grantType: "authorization_code",
				redirectUri: "http://localhost:5173/callback"
			}).then(() => {
				navigate("/")
			}).catch((e) => {
				console.log("error", e)
			})
		}).catch((e) => {
			console.log("error", e)
		})
	}

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
						Dokończ swoją rejestrację
					</h2>
				</div>

				<div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" onSubmit={(e) => {
						e.preventDefault();
						completeUserRegistration();
					}}>
						<div>
							<label className="block text-sm font-medium leading-6 text-white">
								Login
								<input
									id="login"
									name="login"
									required
									className="block w-full h-10 mt-2 pl-2 pr-2 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									onInput={(e) => setLogin(e.currentTarget.value)}
								/>
							</label>
						</div>

						<label className="block text-sm font-medium leading-6 text-white mt-2">
							Hasło
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="block w-full h-10 mt-2 pl-2 pr-2 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								onInput={(e) => {
									setPassword(e.currentTarget.value);
								}}
							/>
							<h1
								hidden={passwordsMatching()}
								className={"text-red-700"}
							>
								Podane hasła nie pasują do siebie!
							</h1>
						</label>

						<label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
							Powtórz hasło
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="block w-full h-10 mt-2 pl-2 pr-2 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								onInput={(e) => {
									setPasswordConfirmation(e.currentTarget.value);
								}}
							/>
							<h1
								hidden={passwordsMatching()}
								className={"text-red-700"}
							>
								Podane hasła nie pasują do siebie!
							</h1>
						</label>

						<button
							type={"submit"}
							className="flex w-full h-10 justify-center items-center rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							disabled={!passwordsMatching()}
						>
							Zarejestruj się
						</button>
						<h1
							hidden={error === ""}
							className={"text-red-700"}
						>
							{error}
						</h1>
					</form>
				</div>
			</div>
		</>
	)
}