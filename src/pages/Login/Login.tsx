import { useAuthentication } from "../../hooks/useAuthentication.ts";
import { useState } from "react";

export function LoginPage() {
	const { login } = useAuthentication()

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Logowanie</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" onSubmit={(e) => {
						e.preventDefault()
						login(email, password)
					}}>
						<div>
							<label htmlFor="email" className="block text-sm font-medium leading-6 text-white">Adres email</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									required
									className="block pl-2 pr-2 w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									onInput={(e) => { setEmail(e.currentTarget.value); }}
								/>
							</div>
						</div>
						<div>
							<div className="flex items-center justify-between">
								<label htmlFor="password" className="block text-sm font-medium leading-6 text-white">Hasło</label>
								<div className="text-sm">
									<a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
										Zapomniałeś swojego hasła?
									</a>
								</div>
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="block w-full pl-2 pr-2 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									onInput={(e) => { setPassword(e.currentTarget.value); }}
								/>
							</div>
						</div>
						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Zaloguj się
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}