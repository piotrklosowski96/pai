import { Disclosure } from '@headlessui/react'
import { Link, Outlet } from "react-router-dom";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

export function LayoutWrapper() {
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
									<Link
										className={classNames('bg-gray-900 text-white', 'rounded-md px-3 py-2 text-sm font-medium')}
										to="/repertuar">
										Repertuar
									</Link>
									<Link
										className={classNames('bg-gray-900 text-white', 'rounded-md px-3 py-2 text-sm font-medium')}
										to="/wydarzenia">
										Wydarzenia
									</Link>
									<Link
										className={classNames('bg-gray-900 text-white', 'rounded-md px-3 py-2 text-sm font-medium')}
										to="/kontakt">
										Kontakt
									</Link>
									<Link
										className={classNames('bg-gray-900 text-white', 'rounded-md px-3 py-2 text-sm font-medium')}
										to="/logowanie">
										Logowanie
									</Link>
									<Link
										className={classNames('bg-gray-900 text-white', 'rounded-md px-3 py-2 text-sm font-medium')}
										to="/rejestracja">
										Rejestracja
									</Link>
								</div>
							</div>
						</div>
					</div>
				</Disclosure>
				<main>
					<Outlet />
				</main>
			</div>
		</>
	)
}
