import { Link } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication.ts";
import { useState } from "react";

const paths = [
	{
		name: "Strona główna",
		to: "/",
		protected: false,
	},
	{
		name: "Administracja",
		to: "/administracja",
		protected: true,
	},
	{
		name: "Repertuar",
		to: "/repertuar",
		protected: false,
	},
	{
		name: "Kontakt",
		to: "/kontakt",
		protected: false,
	},
]

export const Navigation = () => {
	const {user, logout} = useAuthentication()
	const [open, setOpen] = useState(false)

	return <>
		<nav className="bg-gray-700">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<div className="flex items-center">
						<div className="flex-shrink-0">
							<Link to={"/"}>
								<h1 className="text-3xl text-white">
									Kino WAWEL
								</h1>
							</Link>

						</div>
					</div>
					<div className="md:block">
						<div className="ml-4 flex items-center md:ml-6 space-x-4">
							{
								paths.map((p) => {
									if (p.protected && !user?.roles?.includes("ADMIN")) {
										return <></>
									}

									return <Link
										key={p.name}
										className={'bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'}
										to={p.to}>
										{p.name}
									</Link>
								})
							}
							{
								!user ? (
									<>
										<Link
											key={"Logowanie"}
											className={'bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'}
											to={"/logowanie"}>
											{"Logowanie"}
										</Link>
										<Link
											key={"Rejestracja"}
											className={'bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'}
											to={ "/rejestracja"}>
											{"Rejestracja"}
										</Link>
									</>
								) : (

									<>
										<div onMouseLeave={() => setOpen(false)}>
											<button className={'bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium '} type="button"
															onMouseOver={() => setOpen(true)}>
												{user.firstName} {user.lastName}
												<svg className="w-2.5 h-2.5 ms-3 inline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
													<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
												</svg>
											</button>
											{open ? (
												<div className={"absolute bg-gray-900 rounded-md"}>
													<ul className="py-2 text-sm text-gray-700 dark:text-gray-200"
															aria-labelledby="dropdownHoverButton">
														<li>
															<button className={'bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium '}
																			type={"button"}
																			onClick={() => logout()}
															>
																<a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
																	Wyloguj się
																</a>
															</button>
														</li>
													</ul>
												</div>
											) : null}
										</div>


										{/*Zdjęcie profilowe użytkownika*/}
										<div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
											<svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20"
													 xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
															clipRule="evenodd"></path>
											</svg>
										</div>
									</>
								)
							}
						</div>
					</div>
				</div>
			</div>
		</nav>
	</>
}