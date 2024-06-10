interface IScreening {
	movieId: string
	screenId?: number
	title: string
	format: "D2" | "D3"
	adsDuration: number
	movieDuration: number
	cleaningServiceDuration: number
	start?: Date
	end?: Date
	handleDragStart: (e: any) => void
}

export function Screening(screeningProps: IScreening) {
	return (
		<>
			<div className={"border-2"}
				draggable="true"
				key={screeningProps.title}
				onDragStart={() => screeningProps.handleDragStart({
					movieId: screeningProps.movieId,
					title: screeningProps.title,
					format: screeningProps.format,
					adsDuration: screeningProps.adsDuration,
					movieDuration: screeningProps.movieDuration,
					cleaningServiceDuration: screeningProps.cleaningServiceDuration,
				})}>
				<h1>{screeningProps.movieId}</h1>
				<h1>{screeningProps.title}</h1>
				<h1>{screeningProps.format}</h1>
				<h1>{screeningProps.adsDuration}</h1>
				<h1>{screeningProps.movieDuration}</h1>
				<h1>{screeningProps.cleaningServiceDuration}</h1>
			</div>
		</>
	)
}