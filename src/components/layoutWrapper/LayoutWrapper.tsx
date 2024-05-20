import { Disclosure } from '@headlessui/react'
import { Link, Outlet } from "react-router-dom";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

export function LayoutWrapper() {
	const paths = [
		{
			name: "Administracja",
			to: "/administracja",
		},
		{
			name: "Repertuar",
			to: "/repertuar"
		},
		{
			name: "Wydarzenia",
			to: "/wydarzenia"
		},
		{
			name: "Kontakt",
			to: "/kontakt"
		},
		{
			name: "Logowanie",
			to: "/logowanie"
		},
		{
			name: "Rejestracja",
			to: "/rejestracja"
		}
	]

	return (
		<>
			<div className="flex flex-col min-h-screen ">
				<Disclosure as="nav" className="bg-gray-700">
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
										paths.map((p) => (
											<Link
												className={classNames('bg-gray-900 text-white', 'rounded-md px-3 py-2 text-sm font-medium')}
												to={p.to}>
												{p.name}
											</Link>
										))
									}
								</div>
							</div>
						</div>
					</div>
				</Disclosure>
				<main className={""}>
					<Outlet/>
				</main>
			</div>
		</>
	)
}
