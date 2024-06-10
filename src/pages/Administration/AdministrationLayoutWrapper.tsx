import { Link, Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { getCinemasUsingGet } from "../../client";

export const cinemasLoader = async () => {
	return getCinemasUsingGet();
}

export function AdministrationLayoutWrapper() {
	const cinemas = useLoaderData()
	const navigate = useNavigate();

	return (
		<>
			<div className={"grid grid-cols-[1fr_4fr] gap-1"}>
				<div>
					<Link
						className={"bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"}
						to="movies">
						Filmy
					</Link>
					<br/>
					<br/>
					{
						cinemas.map((c) => (
							<>
								<Link
									className={"bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"}
									onClick={(e) => {
										e.preventDefault();
										navigate(`screenings/${c.id}`)
									}}
									to={`screenings/${c.id}`}
								>
									{c.city}
								</Link>
								{/*TODO: Nope.*/}
								<br/>
								<br/>
							</>
						))
					}
				</div>
				<div>
					<Outlet />
				</div>
			</div>
		</>
	)
}