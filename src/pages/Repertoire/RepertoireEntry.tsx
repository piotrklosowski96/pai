import { IRepertoireEntry } from "../../models/repertoireEntry.ts";

import moment from 'moment'
import 'moment/dist/locale/pl.js'

export const RepertoireEntry = ({className, props}: {className: string, props: IRepertoireEntry}) => {
	const movie = props.movie

	return (
		<>
		<div className={`flex gap-1 p-4 border-2 ${className}`}>
			<img className="w-3/12 rounded-lg" src={movie.posterImageURL} alt="" />
			<div className={"w-10/12 flex flex-col p-4"}>
				<h1 className="text-4xl font-semibold">
					{movie.title}
				</h1>
				<span className={"mt-1"}>
					<h1 className={"inline-block"}>Gatunek:&nbsp;</h1>
					{movie.genre}
				</span>
				<span className={"mt-1"}>
					<h1 className={"inline-block"}>Wiek:&nbsp;</h1>
					{movie.ageRestriction}+
				</span>
				<span className={"mt-1"}>
					<h1 className={"inline-block"}>Czas trwania:&nbsp;</h1>
					{movie.movieDuration} min.
				</span>
				<span className={"mt-1"}>
					<h1 className={"inline-block"}>Opis:&nbsp;</h1>
					{movie.description}
				</span>
				<span className={"mt-1 text-2xl"}>
				Seanse:
				</span>
				<div className="flex flex-row space-x-2">
					{
						props.screeningDates.map((screeningDate) => {
							return <>
								<button className={"block bg-gray-900 text-white rounded-md my-2 mr-2 px-3 py-2 text-sm font-medium"}>
									<div className={""}>
										{moment(screeningDate).format("HH:mm").toUpperCase()}
									</div>
								</button>
							</>
						})
					}
				</div>
			</div>
		</div>
		</>
)
}