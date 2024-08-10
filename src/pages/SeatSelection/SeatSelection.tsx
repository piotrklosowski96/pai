import { useLoaderData } from "react-router-dom";
import { IRepertoireEntry } from "../../models/repertoireEntry.ts";

interface ISeat {
	seatId: string,
	index: number,
	rowIndex: number,
	columnIndex: number,
	rowOffset: number
	columnOffset: number
}

export const seatsLoader = () => {
	const seats: ISeat[] = [
		{
			"seatId": "b5459c31-35b9-4a1d-bcb0-402b7f7614b4",
			"index": 0,
			"rowIndex": 0,
			"columnIndex": 0,
			"rowOffset": 0.0,
			"columnOffset": 0.0
		},
		{
			"seatId": "24d27aa9-364f-4421-b14d-9c408856381b",
			"index": 0,
			"rowIndex": 0,
			"columnIndex": 1,
			"rowOffset": 0.0,
			"columnOffset": 0.0
		},
		{
			"seatId": "52087036-680c-481e-8524-076b762b8791",
			"index": 0,
			"rowIndex": 0,
			"columnIndex": 2,
			"rowOffset": 0.0,
			"columnOffset": 0.0
		},
		{
			"seatId": "2f55e013-91bd-4f4f-b633-329c261840cc",
			"index": 0,
			"rowIndex": 0,
			"columnIndex": 3,
			"rowOffset": 0.0,
			"columnOffset": 0.0
		},

		{
			"seatId": "5160ffbd-7e88-41d7-87e0-94ad27115bba",
			"index": 0,
			"rowIndex": 0,
			"columnIndex": 5,
			"rowOffset": 0.0,
			"columnOffset": 0.0
		},
		{
			"seatId": "a7ec8a33-7070-4cb5-8740-c9d0f79a697b",
			"index": 0,
			"rowIndex": 1,
			"columnIndex": 0,
			"rowOffset": 0.0,
			"columnOffset": 0.0
		},
		{
			"seatId": "e5973ad2-dc29-4f8b-aec9-459e701806b9",
			"index": 0,
			"rowIndex": 1,
			"columnIndex": 1,
			"rowOffset": 0.0,
			"columnOffset": 0.0
		},
		{
			"seatId": "0aef1920-5866-42ae-ae33-b49ff3ea0af3",
			"index": 0,
			"rowIndex": 1,
			"columnIndex": 2,
			"rowOffset": 0.0,
			"columnOffset": 0.0
		},
		{
			"seatId": "77552301-5c65-4bd2-b788-213cfa2ae366",
			"index": 0,
			"rowIndex": 1,
			"columnIndex": 3,
			"rowOffset": 0.0,
			"columnOffset": 0.0
		},

		{
			"seatId": "047a99ce-9cfe-4fa6-98d7-2e738ff4dd59",
			"index": 0,
			"rowIndex": 1,
			"columnIndex": 5,
			"rowOffset": 0.0,
			"columnOffset": 0.0
		},
		{
			"seatId": "fe4bbd85-cf85-4cef-b785-3338cc51540c",
			"index": 0,
			"rowIndex": 2,
			"columnIndex": 0,
			"rowOffset": 0.0,
			"columnOffset": 0.0
		},
		{
			"seatId": "61786316-5c98-4ec1-ba65-cc9b18855546",
			"index": 0,
			"rowIndex": 2,
			"columnIndex": 1,
			"rowOffset": 0.0,
			"columnOffset": 0.0
		},
		{
			"seatId": "27e2111a-69cc-49a0-9fd4-6d79f395a9d2",
			"index": 0,
			"rowIndex": 2,
			"columnIndex": 2,
			"rowOffset": 0.0,
			"columnOffset": 0.0
		},
		{
			"seatId": "8e8641cf-2e72-4010-86b3-d211ffb9fb33",
			"index": 0,
			"rowIndex": 2,
			"columnIndex": 3,
			"rowOffset": 0.0,
			"columnOffset": 0.0
		},

		{
			"seatId": "b24242cc-964e-4a12-895b-46d59b476372",
			"index": 0,
			"rowIndex": 2,
			"columnIndex": 5,
			"rowOffset": 0.0,
			"columnOffset": 0.0
		},
		{
			"seatId": "e455b393-4b36-4066-b942-c17642293ac3",
			"index": 0,
			"rowIndex": 3,
			"columnIndex": 0,
			"rowOffset": 0.0,
			"columnOffset": 0.0
		},
		{
			"seatId": "3d032ffa-8e51-41fa-9f1e-ec88ed3b1e6d",
			"index": 0,
			"rowIndex": 3,
			"columnIndex": 1,
			"rowOffset": 0.0,
			"columnOffset": 0.0
		},
		{
			"seatId": "ac04130d-3ea4-46cc-b205-53ac039b8b92",
			"index": 0,
			"rowIndex": 3,
			"columnIndex": 2,
			"rowOffset": 0.0,
			"columnOffset": 0.0
		},
		{
			"seatId": "6114185b-8f4f-47ac-9e5c-da8c9198e58b",
			"index": 0,
			"rowIndex": 3,
			"columnIndex": 3,
			"rowOffset": 0.0,
			"columnOffset": 0.0
		},

		{
			"seatId": "86bef07b-07bc-4756-8de4-cb31e9a32a34",
			"index": 0,
			"rowIndex": 3,
			"columnIndex": 5,
			"rowOffset": 0.0,
			"columnOffset": 0.0
		},
		{
			"seatId": "e455b393-4b36-4066-b942-c17642293ac3",
			"index": 0,
			"rowIndex": 4,
			"columnIndex": 0,
			"rowOffset": 0.0,
			"columnOffset": 0.0
		},
		{
			"seatId": "3d032ffa-8e51-41fa-9f1e-ec88ed3b1e6d",
			"index": 0,
			"rowIndex": 4,
			"columnIndex": 1,
			"rowOffset": 0.0,
			"columnOffset": 0.0
		},
		{
			"seatId": "ac04130d-3ea4-46cc-b205-53ac039b8b92",
			"index": 0,
			"rowIndex": 4,
			"columnIndex": 2,
			"rowOffset": 0.0,
			"columnOffset": 0.0
		},
		{
			"seatId": "6114185b-8f4f-47ac-9e5c-da8c9198e58b",
			"index": 0,
			"rowIndex": 4,
			"columnIndex": 3,
			"rowOffset": 0.0,
			"columnOffset": 0.0
		},

		{
			"seatId": "86bef07b-07bc-4756-8de4-cb31e9a32a34",
			"index": 0,
			"rowIndex": 4,
			"columnIndex": 5,
			"rowOffset": 0.0,
			"columnOffset": 0.0
		},

		{
			"seatId": "e455b393-4b36-4066-b942-c17642293ac3",
			"index": 0,
			"rowIndex": 5,
			"columnIndex": 0,
			"rowOffset": 0.0,
			"columnOffset": 0.0
		},
		{
			"seatId": "3d032ffa-8e51-41fa-9f1e-ec88ed3b1e6d",
			"index": 0,
			"rowIndex": 5,
			"columnIndex": 1,
			"rowOffset": 0.0,
			"columnOffset": 0.0
		},
		{
			"seatId": "ac04130d-3ea4-46cc-b205-53ac039b8b92",
			"index": 0,
			"rowIndex": 5,
			"columnIndex": 2,
			"rowOffset": 0.0,
			"columnOffset": 0.0
		},
		{
			"seatId": "6114185b-8f4f-47ac-9e5c-da8c9198e58b",
			"index": 0,
			"rowIndex": 5,
			"columnIndex": 3,
			"rowOffset": 0.0,
			"columnOffset": 0.0
		},
		{
			"seatId": "6114185b-8f4f-47ac-9e5c-da8c9198e58b",
			"index": 0,
			"rowIndex": 5,
			"columnIndex": 4,
			"rowOffset": 0.0,
			"columnOffset": 0.0
		},
		{
			"seatId": "86bef07b-07bc-4756-8de4-cb31e9a32a34",
			"index": 0,
			"rowIndex": 5,
			"columnIndex": 5,
			"rowOffset": 0.0,
			"columnOffset": 0.0
		},
	]

	seats.sort((a, b) => {
		const rowOrder = a.rowIndex - b.rowIndex
		const columnOrder = b.columnIndex - b.columnIndex

		return rowOrder == 0 ? columnOrder : rowOrder;
	})

	return {
		seats,
		rowsCount: Math.max(...seats.map(s => s.rowIndex)) + 1,
		columnsCount: Math.max(...seats.map(s => s.columnIndex)) + 1,
	}
}

export const SeatSelection = () => {
	const seats = useLoaderData()

	return (
		<>
			<div className={"w-1/2 h-1/2"}>
				<div className={`grid`} style={{
					gridTemplateColumns: `repeat(${seats.columnsCount}, 1fr)`
				}}>
					{
						seats.seats.map((seat, i) => {
							return (
								<div className={`aspect-square`} style={{
									gridColumn: seat.columnIndex + 1,
									gridRow: seat.rowIndex + 1,
									marginLeft: `${seat.columnOffset}%`
								}}>
									<div className={"items-center justify-center min-w-10 min-h-10 m-2 aspect-square"}>
										<svg xmlns="http://www.w3.org/2000/svg" version="1.1"
												 x="0px" y="0px" viewBox="0 0 256 256" enableBackground="new 0 0 256 256">
											<g>
												<g>
													<path fill="#000000" d="M39.5,55.9C39.5,40,52.7,27.1,69,27.1h118c16.3,0,29.5,12.9,29.5,28.8v129.7h-177V55.9z"/>
													<path fill="#000000" d="M39.5,200.1c0,15.9,13.2,28.8,29.5,28.8h118c16.3,0,29.5-12.9,29.5-28.8v-7.2h-177V200.1z"/>
													<path fill="#000000" d="M10,55.9h22.1v144.2H10V55.9z"/>
													<path fill="#000000" d="M223.9,55.9H246v144.2h-22.1V55.9z"/>
												</g>
											</g>
										</svg>
									</div>
								</div>
							)
						})
					}
				</div>
			</div>
		</>
	)
}