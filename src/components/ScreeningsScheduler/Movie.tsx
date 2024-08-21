import { IMovie } from "../../models/IMovie.ts";

export function Movie({ movie, onDragStartHandler}: { movie: IMovie, onDragStartHandler: (movie: IMovie) => void }) {
	return (
		<>
			<div className={"border-2"}
				draggable="true"
				key={movie.id}
				onDragStart={() => onDragStartHandler(movie)}>
				<h1>{movie.id}</h1>
				<h1>{movie.title}</h1>
				<h1>{movie.movieDuration}</h1>
			</div>
		</>
	)
}