import { IMovie } from "./movie.ts";

export type IScreening = IMovie & {
	screeningId: string
	screeningStart: Date
	screeningEnd: Date
	screenId: number
	resourceId: number
}
