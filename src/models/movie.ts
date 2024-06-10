import { MovieStatus } from "./moveStatus.ts";

export interface IMovie {
	movieId: string
	title: string
	description?: string
	genre: string
	type: 'D2' | 'D3'
	minAge: number
	adsDuration: number
	movieDuration: number
	cleaningServiceDuration: number
	status: MovieStatus
	averageRating: number
	bigImageSource?: string
	posterSource?: string
	trailerSource?: string
}