import { IMovie } from "./IMovie.ts";
import { IScreen } from "./screen.ts";

export interface IScreening {
	screeningId: string
	screeningStart: Date
	screeningEnd: Date
	adsDuration: number
	cleaningServiceDuration: number
	movie: IMovie
	screen: IScreen
}
