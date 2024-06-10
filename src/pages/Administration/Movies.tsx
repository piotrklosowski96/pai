import { useLoaderData } from "react-router-dom";
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
	const deleteMovie = (movieId: number) => {
		deleteMovieUsingDelete({movieId: movieId}).then(() => {
			setMovies(movies.filter(movie => movie.movieId !== movieId))
		})
	}

	return (
		<>
			{
				movies.map((movie) => (
					<Movie
						movieId={movie.movieId}
						title={movie.title}
						description={movie.description}
						genre={movie.genre}
						minAge={movie.minAge}
						duration={movie.duration}
						status={movie.status}
						bigImageSource={movie.bigImageSource}
						averageRating={movie.averageRating}
						posterSource={movie.posterSource}
						trailerSource={movie.trailerSource}
						onArchive={() => archiveMovie(movie.movieId)}
						onDelete={() => deleteMovie(movie.movieId)}
					/>
				))
			}
		</>
	)
}