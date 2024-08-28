import { useAuthentication } from "../../hooks/useAuthentication.ts";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function LoginPage() {
	const {login} = useAuthentication();

	const state = uuidv4();
	const redirectURI = "http://localhost:5173/callback";
	const responseType = "code";
	const clientID = "a19a16fa-ea14-4edb-9181-80cb886bbeaf";

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<>
			<div
				data-testid={"login-page-main-container"}
				className={"flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"}
			>
				<div
          className={"sm:mx-auto sm:w-full sm:max-w-sm"}
        >
					<h2
						data-testid={"login-page-header"}
						className={"mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white"}
					>
						Logowanie
					</h2>
				</div>

				<div
          className={"mt-4 sm:mx-auto sm:w-full sm:max-w-sm"}
        >
					<form
						data-testid={"login-page-form-element"}
						className={"space-y-6"}
						onSubmit={(e) => {
							e.preventDefault();
							login(email, password);
						}}
					>
						<div>
							<label
								data-testid={"login-page-email-label"}
								htmlFor="email"
								className={"block text-sm font-medium leading-6 text-white"}
							>
								Adres email
							</label>
							<div className="mt-2">
								<input
									data-testid={"login-page-email-input-element"}
									id="email"
									name="email"
									required
									className={"block w-full h-10 pl-2 pr-2 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
									onInput={(e) => {
										setEmail(e.currentTarget.value);
									}}
								/>
							</div>
						</div>
						<div>
							<div
                className={"flex items-center justify-between"}
              >
								<label
									data-testid={"login-page-password-label"}
									htmlFor="password"
									className={"block text-sm font-medium leading-6 text-white"}
								>
									Hasło
								</label>
								<div className={"text-sm"}>
									<a
										data-testid={"login-page-forgot-password-link"}
										href="#"
										className={"font-semibold text-indigo-600 hover:text-indigo-500"}
									>
										Zapomniałeś swojego hasła?
									</a>
								</div>
							</div>
							<div className="mt-2">
								<input
									data-testid="login-page-password-input-element"
									className="block w-full h-10 pl-2 pr-2 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									onInput={(e) => {
										setPassword(e.currentTarget.value);
									}}
								/>
							</div>
						</div>
						<div>
							<button
								data-testid="login-page-login-button"
								type="submit"
								className="flex w-full h-10 justify-center items-center rounded-md bg-green-700 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Zaloguj się
							</button>
						</div>
					</form>

					<div className="flex w-full my-4 columns-3">
						<div className="w-full items-center inset-0 flex items-center">
							<div className="w-full border-b border-gray-300"></div>
						</div>
						<div className="flex justify-center">
							<span className="px-4 text-sm text-white"> lub </span>
						</div>
						<div className="w-full inset-0 flex items-center">
							<div className="w-full border-b border-gray-300"></div>
						</div>
					</div>

					{/* Zaloguj się przez Google */}
					<div className={"mt-4"}>
						<button
							data-testid="login-page-google-login-button"
							className="flex w-full h-10 items-center justify-center bg-white border border-button-border-light rounded-md"
							type="submit"
							onClick={() => {
								window.location.href = `http://localhost:8080/api/oauth2/v1/authorize/google?client_id=${clientID}&state=${state}&response_type=${responseType}&redirect_uri=${redirectURI}`;
							}}
						>
							<div className="flex items-center justify-center bg-white w-8 h-8 rounded-full">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									className="w-5 h-5 aspect-square"
								>
									<path
										className="text-[#4285f4] fill-current"
										d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
									/>
									<path
										className="text-[#0f9d58] fill-current"
										d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
									/>
									<path
										className="text-[#f4b400] fill-current"
										d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
									/>
									<path
										className="text-[#db4437] fill-current"
										d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
									/>
								</svg>
							</div>
							<span className="text-sm font-medium text-black tracking-wider">
                Zaloguj przez Google
              </span>
						</button>
					</div>

					{/*	Zaloguj się przez Facebook'a */}
					<div className={"mt-4"}>
						<button
							data-testid="login-page-facebook-login-button"
							className="flex w-full h-10 items-center justify-center text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-[#3b5998]/55"
							type={"submit"}
							onClick={() => {
								window.location.href = `http://localhost:8080/api/oauth2/v1/authorize/facebook?client_id=${clientID}&state=${state}&response_type=${responseType}&redirect_uri=${redirectURI}`;
							}}
						>
							<svg
								className="mr-2 -ml-1 w-4 h-4"
								aria-hidden="true"
								focusable="false"
								data-prefix="fab"
								data-icon="facebook-f"
								role="img"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 320 512"
							>
								<path
									className="text-[#ffffff] fill-current"
									d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"
								/>
							</svg>
							<span className="text-sm font-medium text-white tracking-wider">
                Zaloguj przez Facebook
              </span>
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
