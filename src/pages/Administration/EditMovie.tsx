import { useLoaderData, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { addMovieUsingPost, getMovieUsingGet, updateMovieUsingPatch } from "../../client";
import { IMovie } from "../../models/movie.ts";
import { MovieStatus } from "../../models/moveStatus.ts";

export const editMovieLoader = async ({params}) => {
	return getMovieUsingGet({movieId: params.movieId});
}

export const createMovieLoader = async () => {
	return {
		title: "",
		genre: "",
		minAge: 0,
		adsDuration: 0,
		movieDuration: 0,
		cleaningServiceDuration: 0,
		description: "",
		posterImageSource: "",
		mainPageImageSource: "",
		movieId: "",
		type: "D2",
		status: MovieStatus.NIE_GRANY,
		averageRating: 0.0
	} as IMovie
}

const genres = [
	{
		name: "Akcja"
	},
	{
		name: "Horror"
	},
	{
		name: "Komedia"
	},
	{
		name: "Thriller"
	},
	{
		name: "Romans"
	},
	{
		name: "Sensacja"
	},
	{
		name: "Sci-Fi"
	},
]

export function EditMovie() {
	const editedMovie = useLoaderData() as IMovie
	const navigate = useNavigate();

	const [movieId] = useState(editedMovie.id);
	const [title, setTitle] = useState(editedMovie.title)
	const [genre, setGenre] = useState(editedMovie.genre)
	const [ageRestriction, setAgeRestriction] = useState(editedMovie.minAge)
	const [adsDuration, setAdsDuration] = useState(editedMovie.adsDuration)
	const [movieDuration, setMovieDuration] = useState(editedMovie.movieDuration)
	const [cleaningServiceDuration, setCleaningServiceDuration] = useState(editedMovie.cleaningServiceDuration)
	const [description, setDescription] = useState(editedMovie.description)
	const [posterImage, setPosterImage] = useState(editedMovie.posterImageSource);
	const [carouselImage, setCarouselImage] = useState(editedMovie.mainPageImageSource);

	const onChangePicture = useCallback((e, imageHandler) => {
		if (e.target.files[0]) {
			const reader = new FileReader();
			reader.addEventListener("load", () => {
				imageHandler(reader.result);
			});
			reader.readAsDataURL(e.target.files[0]);
		}
	}, [])
	const onMovieSave = useCallback(() => {
		if (movieId) {
			updateMovieUsingPatch({
				movieId: movieId,
				request: {
					title,
					genre,
					minAge: ageRestriction,
					adsDuration,
					movieDuration,
					cleaningServiceDuration,
					description,
					posterSource: posterImage,
					bigImageSource: carouselImage,
				}
			})
		} else {
			addMovieUsingPost({
				request: {
					title,
					genre,
					minAge: ageRestriction,
					adsDuration,
					movieDuration,
					cleaningServiceDuration,
					description,
					posterSource: posterImage,
					bigImageSource: carouselImage,
				}
			})
		}
	}, [movieId,
		title,
		genre,
		ageRestriction,
		adsDuration,
		movieDuration,
		cleaningServiceDuration,
		description,
		posterImage,
		carouselImage
	])

	return (
		<>
			<div className={"flex w-full"}>
				<div className={"flex w-6/12 p-4"}>
					{/*Obrazek plakatu*/}
					<div className={"w-1/2 pr-2"}>
						<h1 className="font-semibold">
							Obrazek plakatu:
						</h1>
						<div className={"flex justify-center items-center rounded border-2 w-full min-h-40"}>
							<label className={"flex justify-center items-center relative"} htmlFor={"poster-input"}>
								<svg className={"absolute"} width="48" height="48" viewBox="0 0 24 24" fill="none"
										 xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule={"evenodd"}
										clipRule={"evenodd"}
										d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
										fill="currentColor"
									/>
									<path
										fillRule={"evenodd"}
										clipRule={"evenodd"}
										d="M13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7V11H7C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H11V17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H13V7Z"
										fill="currentColor"
									/>
								</svg>
								<img className={"object-cover"} src={posterImage} alt={""}/>
							</label>
							<input id="poster-input" type="file" hidden={true} onChange={(e) => {
								onChangePicture(e, setPosterImage)
							}}/>
						</div>
					</div>
					{/*Obrazek na stronie głównej*/}
					<div className={"w-1/2 pl-2"}>
						<h1 className="font-semibold">
							Obrazek na stronie głównej:
						</h1>
						<div className={"flex justify-center items-center rounded border-2 w-full min-h-40"}>
							<label className={"flex justify-center items-center relative"} htmlFor={"carousel-input"}>
								<svg className={"absolute"}
										 width="48"
										 height="48"
										 viewBox="0 0 24 24"
										 fill="none"
										 xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule={"evenodd"}
										clipRule={"evenodd"}
										d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
										fill="currentColor"
									/>
									<path
										fillRule={"evenodd"}
										clipRule={"evenodd"}
										d="M13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7V11H7C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H11V17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H13V7Z"
										fill="currentColor"
									/>
								</svg>
								<img className={"object-cover"} src={carouselImage} alt={""}/>
							</label>
							<input id="carousel-input" type="file" hidden={true} onChange={(e) => {
								onChangePicture(e, setCarouselImage)
							}}/>
						</div>
					</div>
				</div>
				<div className={"w-6/12 p-4"}>
					{/*Tytuł*/}
					<label className={"block pb-2"}>
						<h1 className={"font-semibold"}>
							Tytuł:
						</h1>
						<input type={"text"} className={"block w-full rounded border-2"} value={title} onChange={(e) => {
							setTitle(e.target.value)
						}}/>
					</label>
					{/*Gatunek*/}
					<label className={"block pb-2"}>
						<h1 className={"font-semibold"}>
							Gatunek:
						</h1>
						<select
							className={"block w-full rounded border-2"}
							defaultValue={genre}
							onChange={(e) => setGenre(e.target.value)}
						>
							{
								genres.map((g) => (
									<option value={g.name}>{g.name}</option>
								))
							}
						</select>
					</label>
					{/*Kategoria wiekowa*/}
					<label className={"block pb-2"}>
						<h1 className={"font-semibold"}>
							Kategoria wiekowa
						</h1>
						<label className={"mr-4"}>
							<input
								type="radio"
								name={"ageRestriction"}
								value={7}
								onChange={(e) => {
									setAgeRestriction(Number(e.target.value))
								}}
							/>
							7+
						</label>
						<label className={"mr-4"}>
							<input
								type="radio"
								name={"ageRestriction"}
								value={13}
								onChange={(e) => {
									setAgeRestriction(Number(e.target.value))
								}}
							/>
							13+
						</label>
						<label className={"mr-4"}>
							<input
								type="radio"
								name={"ageRestriction"}
								value={16}
								onChange={(e) => {
									setAgeRestriction(Number(e.target.value))
								}}
							/>
							16+
						</label>
						<label className={"mr-4"}>
							<input
								type="radio"
								name={"ageRestriction"}
								value={18}
								onChange={(e) => {
									setAgeRestriction(Number(e.target.value))
								}}
							/>
							18+
						</label>
					</label>
					{/*Czas trwania bloku reklamowego*/}
					<label className={"block pb-2"}>
						<h1 className={"flex-none font-semibold"}>
							Czas trwania bloku reklamowego:
						</h1>
						<div className={"flex"}>
							<input
								className={"grow rounded border-2"}
								type="number"
								min={0}
								defaultValue={0}
								value={adsDuration}
								onChange={(e) => {
									setAdsDuration(e.target.valueAsNumber);
								}}
							/>
							<h1 className={"flex-none pl-2 inline"}>
								min.
							</h1>
						</div>
					</label>
					{/*Czas trwania filmu*/}
					<label className={"block pb-2"}>
						<h1 className={"flex-none font-semibold"}>
							Czas trwania filmu:
						</h1>
						<div className={"flex"}>
							<input
								className={"grow rounded border-2"}
								type="number"
								min={0}
								defaultValue={0}
								value={movieDuration}
								onChange={(e) => {
									setMovieDuration(e.target.valueAsNumber);
								}}
							/>
							<h1 className={"flex-none pl-2 inline"}>
								min.
							</h1>
						</div>
					</label>
					{/*Czas sprzątania po seansie*/}
					<label className={"block pb-2"}>
						<h1 className={"flex-none font-semibold"}>
							Czas sprzątania po seansie:
						</h1>
						<div className={"flex"}>
							<input
								className={"grow rounded border-2"}
								type="number"
								min={0}
								defaultValue={0}
								value={cleaningServiceDuration}
								onChange={(e) => {
									setCleaningServiceDuration(e.target.valueAsNumber);
								}}
							/>
							<h1 className={"flex-none pl-2 inline"}>
								min.
							</h1>
						</div>
					</label>
					{/*Opis*/}
					<label className={"block pb-2"}>
						<h1 className={"font-semibold"}>
							Opis:
						</h1>
						<textarea
							className={"block w-full rounded border-2"}
							rows={8}
							cols={80}
							value={description}
							onChange={(e) => {
								setDescription(e.target.value);
							}}
						/>
					</label>
					<button
						type="submit"
						onClick={() => {
							onMovieSave();
							navigate(-1);
						}}
					>
						<div className={"pl-8 pr-8 pt-1 pb-1 rounded border-2"}>
							Zapisz
						</div>
					</button>
				</div>
			</div>
		</>
	)
}