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
		name: "Wydarzenia",
		to: "/wydarzenia",
		protected: false,
	},
	{
		name: "Kontakt",
		to: "/kontakt",
		protected: false,
	},
	{
		name: "Logowanie",
		to: "/logowanie",
		protected: false,
	},
	{
		name: "Rejestracja",
		to: "/rejestracja",
		protected: false,
	}
]

export const Navigation = () => {
	const {user} = useAuthentication()

	return <>
		<nav className="bg-gray-700">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<div className="flex items-center">
						<div className="flex-shrink-0">
							<img
								className="h-8 w-8"
								src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
								alt="Your Company"
							/>
						</div>
					</div>
					<div className="md:block">
						<div className="ml-4 flex items-center md:ml-6 space-x-4">
							{
								paths.map((p) => {
									if (p.protected && !user?.roles.includes("administrator")) {
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
						</div>
					</div>
				</div>
			</div>
		</nav>
	</>
}