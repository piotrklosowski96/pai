import { IMovie } from "../../models/movie.ts";
import { Link } from "react-router-dom";

export interface IMovieProps {
	onArchive: () => void
	onDelete: () => void
}

export function Movie(props: IMovie & IMovieProps) {
	return (
		<>
			<div className={"grid grid-cols-[1fr_2fr_1fr_1fr] gap-1"}>
				<img className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src={props.bigImageSource} alt="" width="384" height="512"/>
				<div>
					<h1 className="flex-auto text-xl font-semibold">
						{props.title}
					</h1>
					Gatunek: {props.genre} | Wiek: {props.minAge}+ | {props.duration} min.
				</div>
				<div>
					{props.status}
				</div>
				<div className={"block"}>
					<Link
						className={"bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"}
						to={`${props.movieId}/edit`}>
						Edytuj
					</Link>
					<button
						className={"bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"}
						onClick={() => props.onArchive()}
					>
						Archiwizuj
					</button>
					<button
						className={"bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"}
						onClick={() => props.onDelete()}
					>
						Usuń
					</button>
				</div>
			</div>
		</>
	)
}