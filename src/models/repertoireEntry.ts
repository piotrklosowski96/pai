import { IScreening } from "./screening.ts";

export interface IRepertoireEntry extends Omit<IScreening, "screeningStart" | "screeningEnd"> {
	screeningDates: Date[]
}