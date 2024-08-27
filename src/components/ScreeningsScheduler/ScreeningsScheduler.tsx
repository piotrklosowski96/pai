import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Calendar, DateLocalizer, Views } from 'react-big-calendar'
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"
import "react-big-calendar/lib/css/react-big-calendar.css"
import withDragAndDrop, {
	DragFromOutsideItemArgs,
	EventInteractionArgs
} from 'react-big-calendar/lib/addons/dragAndDrop'
import { useLoaderData } from "react-router-dom";
import {
	getMovies,
	addScreening,
	getScreenings,
	updateScreening,
	getScreens
} from "../../client";
import { Movie } from "./Movie.tsx";
import { IScreening } from "../../models/screening.ts";
import { IScreen } from "../../models/screen.ts";
import { IMovie } from "../../models/IMovie.ts";

const DragAndDropCalendar = withDragAndDrop(Calendar<IScreening, IScreen>)

interface ISchedulerLoaderResult {
	screenings: IScreening[]
	screens: IScreen[]
	movies: IMovie[]
}

export const screeningsSchedulerLoader = async ({params}): Promise<ISchedulerLoaderResult> => {
	const screeningsResponse = getScreenings({cinemaId: params.cinemaId});
	const screensResponse = getScreens({cinemaId: params.cinemaId});
	const moviesResponse = getMovies();

	return {
		screenings: (await screeningsResponse)?.screenings?.map(s => {
			return {
				...s,
				screeningStart: new Date(s.screeningStart!),
				screeningEnd: new Date(s.screeningEnd!),
			} as IScreening;
		}) || [],
		screens: (await screensResponse).screens?.map(s => {
			return {
				screenId: s.screenId,
				screenName: s.screenName,
			} as IScreen
		}) || [],
		movies: (await moviesResponse).movies?.map(m => {
			return {
				id: m.id,
				title: m.title,
				genre: m.genre,
				ageRestriction: m.ageRestriction,
				description: m.description,
				movieDuration: m.movieDuration,
				status: m.status,
				posterImageURL: m.posterImageURL,
				mainPageImageURL: m.mainPageImageURL,
				trailerURL: m.trailerURL,
			} as IMovie
		}) || [],
	}
}

export interface IScreeningsSchedulerProps {
	localizer: DateLocalizer
}

export function ScreeningsScheduler({localizer}: IScreeningsSchedulerProps) {
	const schedulerData = useLoaderData() as ISchedulerLoaderResult

	const [scheduledScreenings, setScheduledScreenings] = useState<IScreening[]>(schedulerData.screenings);
	const [screens, setScreens] = useState(schedulerData.screens);
	const [movies, setMovies] = useState<IMovie[]>(schedulerData.movies);
	const [draggedMovie, setDraggedMovie] = useState<IMovie>();

	useEffect(() => {
		setScheduledScreenings(schedulerData.screenings)
		setScreens(schedulerData.screens)
		setMovies(schedulerData.movies)
	}, [schedulerData]);

	const handleDragStart = useCallback((movie: IMovie) => {
		console.log("handleDragStart", movie)
		setDraggedMovie(movie)
	}, [])

	const moveEvent = useCallback((args: EventInteractionArgs<IScreening>) => {
		setScheduledScreenings((screenings: IScreening[]): IScreening[] => {
			const screeningToUpdate = screenings.find((screening: IScreening) => {
				return screening.screeningId === args.event.screeningId
			});
			if (screeningToUpdate === null || screeningToUpdate === undefined) {
				return []
			}

			const restOfScreenings = screenings.filter((screening: IScreening) => {
				return screening.screeningId !== args.event.screeningId
			})

			updateScreening({
				screeningId: args.event.screeningId,
				body: {
					screenId: args.resourceId as string,
					screeningStart: new Date(args.start).toISOString(),
				},
			});

			return [
				...restOfScreenings,
				{
					...screeningToUpdate,
					screeningStart: args.start as Date,
					screeningEnd: args.end as Date,
					screen: {
						...(screeningToUpdate.screen),
						screenId: args.resourceId as string,
					},
				}
			]
		})
	}, [setScheduledScreenings])
	const newScreening = useCallback((screening: IScreening) => {
		setScheduledScreenings((screenings: IScreening[]) => {
			return [...screenings, screening]
		})
	}, [setScheduledScreenings])
	const onDropFromOutside = useCallback((args: DragFromOutsideItemArgs) => {
		if (draggedMovie === undefined || draggedMovie === null) {
			return
		}

		console.log(draggedMovie)

		setDraggedMovie(undefined)
		addScreening({
			body: {
				screenId: args.resource,
				movieId: draggedMovie.id,
				screeningStart: new Date(args.start).toISOString(),
				adsDuration: 30,
				cleaningServiceDuration: 30,
				movieSoundType: 'LECTOR',
				movieType: 'D2',
			}
		}).then(response => {
			newScreening({
				screeningId: response.screeningId!,
				screeningStart: new Date(response.screeningStart!),
				screeningEnd: new Date(response.screeningEnd!),
				adsDuration: response.adsDuration!,
				cleaningServiceDuration: response.cleaningServiceDuration!,
				movie: response.movie!,
				screen: {
					screenId: response.screen!.screenId!,
					screenName: response.screen!.screenName!,
				}
			})
		}).catch(error => {
			console.log(error)
		})
	}, [draggedMovie, newScreening])

	const {defaultDate, views} = useMemo(() => ({
		defaultDate: new Date(),
		views: {
			day: true,
		},
	}), [])
	const components = useMemo(() => ({
		event: ({event, title}: { event: IScreening, title: string }) => {
			const totalTime = event.adsDuration + event.movie!.movieDuration! + event.cleaningServiceDuration
			const adsDurationHeight = 100 * event.adsDuration / totalTime
			const movieDurationHeight = 100 * event.movie!.movieDuration! / totalTime
			const cleaningServiceDurationHeight = 100 * event.cleaningServiceDuration / totalTime

			return (
				<div className={"w-full h-full"}>
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
						{event.movie.title}
					</p>
					<p style={{
						height: cleaningServiceDurationHeight + "%",
						backgroundColor: "rgb(85, 85, 85)",
						borderRadius: "0 0 4px 4px",
					}}>
						Sprzątanie
					</p>
				</div>
			)
		},
		timeSlotWrapper: ({value, resource}: {value: Date, resource: string}) => {
			const hourString = value.getHours().toLocaleString('pl-PL', {minimumIntegerDigits: 2})
			const minutesString = value.getMinutes().toLocaleString('pl-PL', {minimumIntegerDigits: 2})

			if (!resource) {
				return (
					<>
						<div className={"h-full w-full bg-gray-700 pl-2 pr-2"}>
							<h1 className={"h-full w-full text-white"}>
								{hourString}:{minutesString}
							</h1>
						</div>
					</>
				)
			}

			return <></>
		},
		dayColumnWrapper: ({children}: { children: React.ReactNode }) => {
			return (
				<div className={`bg-gray-700 rbc-day-slot rbc-time-column`}>
					{children}
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
						onDropFromOutside={onDropFromOutside}
						events={scheduledScreenings}
						startAccessor={(screening: IScreening) => screening.screeningStart}
						endAccessor={(screening: IScreening) => screening.screeningEnd}
						resources={screens}
						resourceAccessor={(screening: IScreening) => screening.screen.screenId}
						resourceIdAccessor={(screen: IScreen) => screen.screenId}
						resourceTitleAccessor={(screen: IScreen) => screen.screenName}
						step={30}
					/>
				</div>
				<div>
					{
						movies.map((movie: IMovie) => (
							<Movie
								key={movie.id}
								movie={movie}
								onDragStartHandler={handleDragStart}
							/>
						))
					}
				</div>
			</div>
		</>
	)
}