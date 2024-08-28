import { Link, useLoaderData } from "react-router-dom";
import { Movie } from "./Movie.tsx";
import { deleteMovie, getMovies, GetMoviesResponse } from "../../client";
import { IMovie } from "../../models/IMovie.ts";
import { useState } from "react";

export const moviesLoader = async (): Promise<GetMoviesResponse> => {
	return getMovies();
};

export function Movies() {
	const loadedMovies = useLoaderData() as IMovie[];
	const [movies, setMovies] = useState(loadedMovies);

	const archiveMovie = (movieId: string) => {
		// archiveMovieUsingPost({movieId: movieId}).then(() => {
		// 	const movieIndex = movies.findIndex(m => m.id === movieId)
		// 	movies[movieIndex].status = MovieStatus.ZARCHIWIZOWANY;
		//
		// 	setMovies([...movies])
		// })
	};
	const deleteMovie = (movieId: string) => {

		deleteMovie({movieId: movieId}).then(() => {
			setMovies(movies.filter((movie) => movie.id !== movieId));
		});
	};

	return (
		<>
			<div className={"flex flex-col"}>
				<h1 className={"text-4xl"}>Dostępne filmy</h1>
				<div
					data-testid={`administration-movies-container`}
					className={"flex flex-col items-start"}
				>
					<button
						className={
							"block bg-gray-900 text-white rounded-md mt-4 mb-4 px-2 py-2 text-sm font-medium"
						}
					>
						<Link
							data-testid={`administration-add-new-movie-button`}
							to={"create"}
						>
							Dodaj nowy...
						</Link>
					</button>
				</div>
				{movies.movies.map((movie) => (
					<Movie
						key={movie.id}
						movie={movie}
						onArchive={() => archiveMovie(movie.id)}
						onDelete={() => deleteMovie(movie.id)}
					/>
				))}
			</div>
		</>
	);
}
