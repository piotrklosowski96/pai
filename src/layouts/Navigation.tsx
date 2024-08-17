import { Link } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication.ts";

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
	const {user} = useAuthentication()

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
										{/*Zdjęcie profilowe użytkownika*/}
										<div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
											<svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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