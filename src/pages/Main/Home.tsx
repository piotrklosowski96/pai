import {useState} from "react";
import {getMovies} from "../../client";
import {useLoaderData} from "react-router-dom";

interface IMainPageMovie {
	title: string
	description: string
	mainPageImageSource: string
}

export const homeLoader = async () => {
	const moviesResponse = await getMovies()
	if (!moviesResponse?.movies) {
		return []
	}

	return moviesResponse.movies.map((m) => {
		return {
			title: m.title,
			description: m.description,
			mainPageImageSource: m.mainPageImageURL,
		} as IMainPageMovie
	})
}

export function Home() {
	const movies = useLoaderData() as Array<IMainPageMovie>

	const [slide, setSlide] = useState(movies[0])
	const [slideIndex, setSlideIndex] = useState(0);

	const previousSlide = () => {
		const previousSlideIndex = slideIndex === 0 ? movies.length - 1 : slideIndex - 1
		setSlideIndex(previousSlideIndex)
		setSlide(movies[previousSlideIndex])
	}
	const nextSlide = () => {
		const nextSlideIndex = slideIndex === movies.length - 1 ? 0 : slideIndex + 1
		setSlideIndex(nextSlideIndex)
		setSlide(movies[nextSlideIndex])
	}

	return (
		<>
			<div className="flex absolute top-0 -z-50 w-full h-full">
				<div>
					{/*Plakat*/}
					<img className={"absolute w-full h-full object-cover object-center"} src={slide.mainPageImageSource} alt=""/>
					{/*Tint plakatu*/}
					<div className={"absolute w-full h-full bg-black opacity-60"}></div>
					{/*Przyciski zmiany slajdu*/}
					<div className={"absolute w-full h-full inset-0 flex items-center justify-between p-12"}>
						<button onClick={previousSlide}
										className='p-3 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'/>
						<button onClick={nextSlide}
										className='p-3 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'/>
					</div>
					{/*Tytuł i przyciski*/}
					<div className={"flex flex-col w-11/12 columns-1 absolute top-2/3 pl-32"}>
						<h1 className={"uppercase text-8xl font-black -skew-x-12"}>
							{slide.title}
						</h1>
						{/*Przycisk obejrzyj zwiastun*/}
						<button className={"border-2 w-1/4 mt-8 pl-10 pr-10 pt-2 pb-2"} onClick={() => {
							alert("DUPA")
						}}>
							<h2 className={"text-2xl font-semibold"}>
								Obejrzyj zwiastun
							</h2>
						</button>
						{/*Przycisk kup bilet*/}
						<button className={"border-2 w-1/4 mt-4 pl-10 pr-10 pt-2 pb-2"} onClick={() => {
							alert("DUPA")
						}}>
							<h2 className={"text-2xl font-semibold"}>
								Kup bilet
							</h2>
						</button>
					</div>
				</div>
			</div>
		</>
	)
}