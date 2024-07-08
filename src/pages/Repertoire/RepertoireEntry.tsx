import { IRepertoireEntry } from "../../models/repertoireEntry.ts";

export const RepertoireEntry = ({className, props}: {className: string, props: IRepertoireEntry}) => {
	return (
		<>
		<div className={`flex gap-1 p-4 border-2 ${className}`}>
			<img className="w-3/12 rounded-lg" src={props.posterImageSource} alt="" />
			<div className={"w-10/12 flex flex-col p-4"}>
				<h1 className="text-4xl font-semibold">
					{props.title}
				</h1>
				<span className={"mt-1"}>
					<h1 className={"inline-block"}>Gatunek:&nbsp;</h1>
					{props.genre}
				</span>
				<span className={"mt-1"}>
					<h1 className={"inline-block"}>Wiek:&nbsp;</h1>
					{props.minAge}+
				</span>
				<span className={"mt-1"}>
					<h1 className={"inline-block"}>Czas trwania:&nbsp;</h1>
					{props.movieDuration} min.
				</span>
				<span className={"mt-1"}>
					<h1 className={"inline-block"}>Opis:&nbsp;</h1>
					{props.description}
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
										{new Date(screeningDate * 1000).toDateString()}
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