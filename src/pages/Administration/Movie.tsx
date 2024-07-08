import { IMovie } from "../../models/movie.ts";
import { Link } from "react-router-dom";
import { MovieStatus } from "../../models/moveStatus.ts";

export interface IMovieProps {
	onArchive: () => void
	onDelete: () => void
}

const movieStatusToString = (movieStatus: MovieStatus) => {
	switch (movieStatus) {
		case MovieStatus.BRAK_SEANSU:
			return <h1>Brak seansu</h1>
		case MovieStatus.GRANY:
			return <h1>Grany</h1>
		case MovieStatus.NIE_GRANY:
			return <h1>Nie grany</h1>
		case MovieStatus.PREMIERA:
			return <h1>Premiera</h1>
		case MovieStatus.PRZED_PREMIERA:
			return <h1>Przed premierą</h1>
		case MovieStatus.ZARCHIWIZOWANY:
			return <h1>Zarchiwizowany</h1>
	}
}

export function Movie(props: (IMovie & IMovieProps)) {
	return (
		<>
			<div className={"flex gap-1 p-4 border-2"}>
				<img className="w-2/12 md:rounded-none rounded-full" src={props.posterImageSource} alt="" width="384" height="512"/>
				<div className={"w-5/12 flex flex-col justify-center p-4"}>
					<h1 className="text-2xl font-semibold">{props.title}</h1>
					<h1>Gatunek: {props.genre}</h1>
					<h1>Wiek: {props.minAge}+</h1>
					<h1>Czas trwania: {props.movieDuration} min.</h1>
					<h1 className={"truncate ..."}>Opis: {props.description}</h1>
				</div>
				<div className={"w-2/12 flex flex-col justify-center p-4"}>
					{movieStatusToString(props.status)}
				</div>
				<div className={"w-3/12 flex flex-col justify-center p-4"}>
					<Link
						className={"block bg-gray-900 text-white rounded-md w-full mt-2 mb-1 px-3 py-2 text-sm font-medium text-center"}
						to={`${props.id}/edit`}>
						Edytuj
					</Link>
					<button
						className={"block bg-gray-900 text-white rounded-md w-full mt-1 mb-1 px-3 py-2 text-sm font-medium text-center"}
						onClick={() => props.onArchive()}
					>
						Archiwizuj
					</button>
					<button
						className={"block bg-gray-900 text-white rounded-md w-full mt-1 mb-2 px-3 py-2 text-sm font-medium text-center"}
						onClick={() => props.onDelete()}
					>
						Usuń
					</button>
				</div>
			</div>
		</>
	)
}