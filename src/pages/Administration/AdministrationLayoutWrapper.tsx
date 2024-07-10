import { Link, Outlet, useLoaderData } from "react-router-dom";
import { getCinemasUsingGet } from "../../client";

export const cinemasLoader = async () => {
	return getCinemasUsingGet();
}

export function AdministrationLayoutWrapper() {
	const cinemas = useLoaderData()

	return (
		<div className={"flex justify-center w-full"}>
			<div className={"flex w-full justify-center w-full max-w-screen-2xl"}>
				<div className={"w-2/12 bg-gray-800 p-2"}>
					<Link
						className={"block bg-gray-900 text-white rounded-md my-2 mr-2 px-3 py-2 text-sm font-medium"}
						to="movies">
						Filmy
					</Link>
					{
						cinemas.map((c) => (
							<>
								<Link
									key={`screenings/${c.id}`}
									className={"block bg-gray-900 text-white rounded-md my-2 mr-2 px-3 py-2 text-sm font-medium"}
									to={`screenings/${c.id}`}
								>
									{c.city}
								</Link>
							</>
						))
					}
				</div>
				<div className={"w-10/12 p-2"}>
					<Outlet/>
				</div>
			</div>
		</div>
	)
}