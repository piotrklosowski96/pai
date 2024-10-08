import { useEffect, useState } from "react";
import { ICinema } from "../../models/cinema.ts";
import { useLoaderData } from "react-router-dom";
import { IScreening } from "../../models/screening.ts";
import { getScreenings } from "../../client";
import { IRepertoireEntry } from "../../models/repertoireEntry.ts";
import { RepertoireEntry } from "./RepertoireEntry.tsx";

import moment from "moment";
import "moment/dist/locale/pl.js";

export function RepertoirePage() {
	const cinemas = useLoaderData();
	moment.locale("pl");

	const [date, setDate] = useState(new Date());
	const [selectedCinema, setSelectedCinema] = useState<ICinema | null>(null);
	const [repertoire, setRepertoire] = useState<IRepertoireEntry[] | null>([]);

	useEffect(() => {
		if (!selectedCinema) {
			return;
		}

		getScreenings({
			cinemaId: selectedCinema.id,
		})
			.then((response) => {
				return response.screenings as unknown as IScreening[];
			})
			.then((screenings) => {
				return screenings.filter((s) => {
					const screeningDate = new Date(s.screeningStart!);

					return (
						screeningDate.getFullYear() == date.getFullYear() &&
						screeningDate.getMonth() == date.getMonth() &&
						screeningDate.getDate() == date.getDate()
					);
				});
			})
			.then((screenings) => {
				return Object.values(
					screenings.reduce(
						(previousValue: Record<string, IRepertoireEntry>, currentValue) => {
							if (!previousValue[currentValue.movie.id!]) {
								previousValue[currentValue.movie.id!] = {
									...currentValue,
									screeningDates: [],
								};
							}
							previousValue[currentValue.movie.id!].screeningDates.push(
								currentValue.screeningStart
							);

							return previousValue;
						},
						{}
					)
				).map((s) => s);
			})
			.then((screenings) => {
				console.log(screenings);
				setRepertoire(screenings);
			});
	}, [selectedCinema, date]);

	return (
		<>
			<div className={"flex flex-col w-full items-center"}>
				{/*Wybór kina*/}
				<section className={"flex w-full justify-center h-48 bg-black"}>
					<div
						className={"flex flex-col justify-center w-full pl-4 pr-4 max-w-screen-xl"}
					>
						<h1
              data-testid={"repertoire-page-header"}
              className={"text-4xl"}
            >
							Wybierz swoje kino
						</h1>
						<label className={"block mt-4 pb-2"}>
							<h1
								data-testid={"repertoire-city-header"}
								className={"font-semibold"}
							>
								Miasto:
							</h1>
							<select
								data-testid={"repertoire-select-city"}
								className={"w-full rounded border-2"}
								defaultValue={undefined}
								onChange={async (e) => {
									const selectedCinema = cinemas.cinemas.find((c) => {
										return c.city === e.target.value;
									});
									if (selectedCinema) {
										setSelectedCinema(selectedCinema);
									}
								}}
							>
								<option></option>
								{cinemas.cinemas.map((cinema) => (
									<option value={cinema.city}>{cinema.city}</option>
								))}
							</select>
						</label>
					</div>
				</section>

				{selectedCinema && (
					<section
						className={"flex w-full max-w-screen-xl items-center mt-2 pl-4 pr-4"}
					>
						<h1
							data-testid={"repertoire-select-city-cinema-name"}
							className={"block mr-2"}
						>
							Repertuar kina Wawel - {selectedCinema?.city}
						</h1>
						{[...Array(6)]
							.map((_, i) => {
								const newDate = new Date();
								newDate.setDate(newDate.getDate() + i);

								return newDate;
							})
							.map((date) => {
								return (
									<button
										className={"block bg-gray-900 text-white rounded-md my-2 mr-2 px-3 py-2 text-sm font-medium"}
										onClick={() => {
											setDate(date);
										}}
									>
										{moment(date).format("dd (DD.MM)").toUpperCase()}
									</button>
								);
							})}
					</section>
				)}

				{/*Seanse*/}
				<section className={"flex w-full justify-center max-w-screen-xl"}>
					{selectedCinema && (
						<>
							<section className={"w-full pl-4 pr-4"}>
								{repertoire!.map((r) => (
									<RepertoireEntry
										className={"mt-2 rounded-lg bg-gray-800"}
										props={r}
									/>
								))}
							</section>
						</>
					)}
				</section>
			</div>
		</>
	);
}
