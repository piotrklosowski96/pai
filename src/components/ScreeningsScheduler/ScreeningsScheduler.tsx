import { useCallback, useEffect, useMemo, useState } from 'react'
import { Calendar, DateLocalizer, Views } from 'react-big-calendar'
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"
import "react-big-calendar/lib/css/react-big-calendar.css"
import withDragAndDrop, {
	DragFromOutsideItemArgs,
	EventInteractionArgs
} from 'react-big-calendar/lib/addons/dragAndDrop'
import { redirect, useLoaderData, useParams, useRevalidator } from "react-router-dom";
import {
	AddScreeningRequestTest,
	addScreeningUsingPost,
	getMoviesUsingGet,
	getScreeningsUsingGet,
	getScreensUsingGet, updateScreeningUsingPatch
} from "../../client";
import { Screening } from "./Screening.tsx";
import { IScreening } from "../../models/screening.ts";
import { IScreen } from "../../models/screen.ts";
import { IMovie } from "../../models/movie.ts";

const DragAndDropCalendar = withDragAndDrop(Calendar<IScreening, IScreen>)

export const screeningsSchedulerLoader = async ({params}) => {
	const screenings = (await getScreeningsUsingGet({cinemaId: params.cinemaId})).map(s => {
		return {
			...s,
			screeningStart: new Date(s.screeningStart!  * 1000),
			screeningEnd: new Date(s.screeningEnd!  * 1000),
		} as unknown as IScreening;
	})

	return {
		cinemaId: params.cinemaId,
		screenings: screenings,
		screens: await getScreensUsingGet({cinemaId: params.cinemaId}),
		availableMovies: await getMoviesUsingGet(),
	}
}

export interface IScreeningsSchedulerProps {
	localizer: DateLocalizer
}

export function ScreeningsScheduler({localizer}: IScreeningsSchedulerProps) {
	// const schedulerData = useLoaderData()

	// const [cinemaId] = useState(schedulerData.cinemaId);
	// const [scheduledScreenings, setScheduledScreenings] = useState<IScreening[]>(schedulerData.screenings)
	// const [screens, setScreens] = useState(schedulerData.screens)
	// const [movies, setMovies] = useState<IMovie[]>(schedulerData.availableMovies)
	// const [draggedScreening, setDraggedScreening] = useState<IScreening | null>(null)

	const [scheduledScreenings, setScheduledScreenings] = useState<IScreening[]>([])
	const [screens, setScreens] = useState([])
	const [movies, setMovies] = useState<IMovie[]>([])
	const [draggedScreening, setDraggedScreening] = useState<IScreening | null>(null)

	let { cinemaId } = useParams();
	useEffect(() => {
		const screenings = (await getScreeningsUsingGet({cinemaId: params.cinemaId})).map(s => {
			return {
				...s,
				screeningStart: new Date(s.screeningStart!  * 1000),
				screeningEnd: new Date(s.screeningEnd!  * 1000),
			} as unknown as IScreening;
		})


			cinemaId: params.cinemaId,
			screenings: screenings,
			screens: await getScreensUsingGet({cinemaId: params.cinemaId}),
			setMovies(await getMoviesUsingGet())

	}, []);

	const handleDragStart = useCallback((screening: IScreening) => setDraggedScreening(screening), [])
	const dragFromOutsideItem = useCallback(() => draggedScreening, [draggedScreening])
	const moveEvent = useCallback((args: EventInteractionArgs<IScreening>) => {
		setScheduledScreenings((screenings: IScreening[]) => {
			const existing = screenings.find((screening: IScreening) => {
				return screening.screeningId === args.event.screeningId
			}) ?? {}
			const filtered = screenings.filter((screening: IScreening) => {
				return screening.screeningId !== args.event.screeningId
			})

			updateScreeningUsingPatch({
				cinemaId: cinemaId,
				screeningId: args.event.screeningId,
				body: {
					screenId: args.resourceId,
					startDate: args.start,
				}
			})

			return [
				...filtered,
				{
					...existing,
					screeningStart: args.start as Date,
					screeningEnd: args.end as Date,
					screenId: args.resourceId,
				}
			]
		})
	}, [setScheduledScreenings])
	const newScreening = useCallback((screening: IScreening) => {
		setScheduledScreenings((screenings: IScreening[]) => {
			return [...screenings, screening ]
		})
	}, [setScheduledScreenings])
	const onDropFromOutside = useCallback((args: DragFromOutsideItemArgs) => {
		if (draggedScreening === undefined || draggedScreening === null) {
			return
		}

		setDraggedScreening(null)
		let screening = {
			title: draggedScreening.title,
			screeningStart: args.start,
			screeningEnd: localizer.add(
				args.start as Date,
				draggedScreening.adsDuration +
				draggedScreening.movieDuration +
				draggedScreening.cleaningServiceDuration,
				'minutes'
			),
			screenId: args.resource,
			adsDuration: draggedScreening.adsDuration,
			movieDuration: draggedScreening.movieDuration,
			cleaningServiceDuration: draggedScreening.cleaningServiceDuration,
			averageRating: draggedScreening.averageRating,
			description: draggedScreening.description,
			type: draggedScreening.type,
			genre: draggedScreening.genre,
			movieId: draggedScreening.movieId,
			minAge: draggedScreening.minAge,
			status: draggedScreening.status,
			bigImageSource: draggedScreening.bigImageSource,
			posterSource: draggedScreening.posterSource,
			trailerSource: draggedScreening.trailerSource,
		}

		addScreeningUsingPost({
			cinemaId: cinemaId,
			body: {
				movieId: screening.movieId,
				movieSoundType: 'LECTOR',
				movieType: 'D2',
				screenId: args.resource,
				startDate: screening.screeningStart,
			} as AddScreeningRequestTest
		}).then(response => {
			screening.screeningId = response.screeningId;
		})
		newScreening(screening)
	}, [draggedScreening, setDraggedScreening, newScreening])

	const {defaultDate, views} = useMemo(() => ({
		defaultDate: new Date(),
		views: {
			day: true,
		},
	}), [])
	const components = useMemo(() => ({
		event: ({event, title}) => {
			const totalTime = event.adsDuration + event.movieDuration + event.cleaningServiceDuration
			const adsDurationHeight = 100 * event.adsDuration / totalTime
			const movieDurationHeight = 100 * event.movieDuration / totalTime
			const cleaningServiceDurationHeight = 100 * event.cleaningServiceDuration / totalTime

			return (
				<div className={"h-full"}>
					<p style={{
						height: adsDurationHeight + "%",
						backgroundColor: "rgb(239, 189, 28)",
						borderRadius: "4px 4px 0 0",
					}}>
						Reklamy
					</p>
					<p style={{
						height: movieDurationHeight + "%",
						backgroundColor: "rgb(217, 30, 77)",
					}}>
						{title}
					</p>
					<p style={{
						height: cleaningServiceDurationHeight + "%",
						backgroundColor: "rgb(85, 85, 85)",
						borderRadius: "0 0 4px 4px",
					}}>Sprzątanie
					</p>
				</div>
			)
		},
	}), [])

	return (
		<>
			<div className={"grid grid-cols-[4fr_1fr] gap-1"}>
				<div className={""}>
					<DragAndDropCalendar
						localizer={localizer}
						formats={{eventTimeRangeFormat: () => ""}}
						components={components}
						defaultDate={defaultDate}
						defaultView={Views.DAY}
						views={views}
						onEventDrop={moveEvent}
						dragFromOutsideItem={dragFromOutsideItem}
						onDropFromOutside={onDropFromOutside}


						events={scheduledScreenings}
						resources={screens}
						startAccessor={(screening: IScreening) => screening.screeningStart}
						endAccessor={(screening: IScreening) => screening.screeningEnd}
						resourceAccessor={(screening: IScreening) => screening.screenId}
						resourceIdAccessor={(screen: IScreen) => screen.screenId}
						resourceTitleAccessor={(screen: IScreen) => screen.screenName}
						step={15}
					/>
				</div>
				<div>
					{
						movies.map((movie: IScreening) => (
							<Screening
								movieId={movie.id}
								title={movie.title}
								format={movie.type}
								adsDuration={movie.adsDuration}
								movieDuration={movie.movieDuration}
								cleaningServiceDuration={movie.cleaningServiceDuration}
								handleDragStart={handleDragStart}
							/>
						))
					}
				</div>
			</div>
		</>
	)
}