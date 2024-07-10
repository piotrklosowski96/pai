import { Link, useLoaderData } from "react-router-dom";
import { Movie } from "./Movie.tsx";
import {
	deleteMovieUsingDelete,
	getMoviesUsingGet,
	GetMoviesUsingGetResponse
} from "../../client";
import { IMovie } from "../../models/movie.ts";
import { useState } from "react";

export const moviesLoader = async (): Promise<GetMoviesUsingGetResponse> => {
	return getMoviesUsingGet();
}

export function Movies() {
	const loadedMovies = useLoaderData() as IMovie[]
	const [movies, setMovies] = useState(loadedMovies)

	const archiveMovie = (movieId: string) => {
		// archiveMovieUsingPost({movieId: movieId}).then(() => {
		// 	const movieIndex = movies.findIndex(m => m.id === movieId)
		// 	movies[movieIndex].status = MovieStatus.ZARCHIWIZOWANY;
		//
		// 	setMovies([...movies])
		// })
	}
	const deleteMovie = (movieId: string) => {
		deleteMovieUsingDelete({movieId: movieId}).then(() => {
			setMovies(movies.filter(movie => movie.id !== movieId))
		})
	}

	return (
		<>
			<div className={"flex flex-col"}>
				<h1 className={"text-4xl"}>Dostępne filmy</h1>
				<div className={"flex flex-col items-start"}>
					<button className={"block bg-gray-900 text-white rounded-md mt-4 mb-4 px-2 py-2 text-sm font-medium"}>
						<Link to={"create"}>
							Dodaj nowy...
						</Link>
					</button>

				</div>
				{
					movies.map((movie) => (
						<Movie
							id={movie.id}
							title={movie.title}
							description={movie.description}
							genre={movie.genre}
							minAge={movie.minAge}
							duration={movie.duration}
							status={movie.status}
							posterImageSource={movie.posterImageSource}
							bigImageSource={movie.bigImageSource}
							averageRating={movie.averageRating}
							posterSource={movie.posterSource}
							trailerSource={movie.trailerSource}
							onArchive={() => archiveMovie(movie.id)}
							onDelete={() => deleteMovie(movie.id)}
						/>
					))
				}
			</div>
		</>
	)
}