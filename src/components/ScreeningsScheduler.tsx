import { useCallback, useMemo, useState } from 'react'
import { Calendar, Views } from 'react-big-calendar'
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"
import "react-big-calendar/lib/css/react-big-calendar.css"
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

const DragAndDropCalendar = withDragAndDrop(Calendar)


const events = [
	{
		id: 0,
		title: 'Board meeting',
		start: new Date(2024, 4, 20, 13, 0, 0),
		end: new Date(2024, 4, 20, 13, 0, 0),
		resourceId: 1,
	},
	{
		id: 1,
		title: 'MS training',
		start: new Date(2024, 4, 20, 14, 11, 0),
		end: new Date(2024, 4, 20, 16, 30, 0),
		resourceId: 2,
	},
	{
		id: 2,
		title: 'Team lead meeting',
		start: new Date(2024, 4, 20, 8, 26, 0),
		end: new Date(2024, 4, 20, 12, 30, 0),
		resourceId: 3,
	},
]

const resourceMap = [
	{resourceId: 1, resourceTitle: 'Board room'},
	{resourceId: 2, resourceTitle: 'Training room'},
	{resourceId: 3, resourceTitle: 'Meeting room 1'},
	{resourceId: 4, resourceTitle: 'Meeting room 2'},
]

export function ScreeningsScheduler({localizer}) {
	const [myEvents, setMyEvents] = useState(events)
	const [draggedEvent, setDraggedEvent] = useState()
	const [displayDragItemInCell, setDisplayDragItemInCell] = useState(true)

	const handleDragStart = useCallback((event) => setDraggedEvent(event), [])
	const dragFromOutsideItem = useCallback((e) => {
		draggedEvent
	}, [draggedEvent])

	const handleDisplayDragItemInCell = useCallback(
		() => setDisplayDragItemInCell((prev) => !prev),
		[]
	)

	const moveEvent = useCallback(({event, start, end, resourceId, isAllDay: droppedOnAllDaySlot = false}) => {
			console.log("on event drop: ", event, start, end, resourceId, droppedOnAllDaySlot)

			const {allDay} = event
			if (!allDay && droppedOnAllDaySlot) {
				event.allDay = true
			}
			if (Array.isArray(event.resourceId)) {
				const filtered = event.resourceId.filter(
					(ev) => ev !== event.sourceResource
				)
				resourceId = [...new Set([...filtered, resourceId])]
			}

			setMyEvents((prev) => {
				const existing = prev.find((ev) => ev.id === event.id) ?? {}
				const filtered = prev.filter((ev) => ev.id !== event.id)
				return [...filtered, {...existing, start, end, resourceId, allDay}]
			})
		},
		[setMyEvents]
	)

	const newEvent = useCallback((event) => {
		setMyEvents((prev) => {
			const idList = prev.map((item) => item.id)
			const newId = Math.max(...idList) + 1
			return [...prev, {...event, id: newId}]
		})
		},
		[setMyEvents]
	)

	const onDropFromOutside = useCallback(({start, end, allDay: isAllDay, resource}) => {
			if (draggedEvent === 'undroppable') {
				setDraggedEvent(null)
				return
			}

			const {name} = draggedEvent
			const event = {
				title: name,
				start,
				end,
				isAllDay,
				resourceId: resource,
			}
			setDraggedEvent(null)
			newEvent(event)
		},
		[draggedEvent, setDraggedEvent, newEvent]
	)

	const {defaultDate, views} = useMemo(
		() => ({
			defaultDate: new Date(),
			views: {
				day: true,
			},
		}),
		[]
	)

	return (
		<>
			<div
				draggable="true"
				key={"1"}
				onDragStart={() => handleDragStart({title: "1"})}
			>
				"1"
			</div>
			<div
				draggable="true"
				key={"2"}
				onDragStart={() => handleDragStart({title: "2"})}
			>
				"2"
			</div>
			<div className="height600">
				<DragAndDropCalendar
					defaultDate={defaultDate}
					defaultView={Views.DAY}
					views={views}
					events={myEvents}
					localizer={localizer}
					onEventDrop={moveEvent}
					dragFromOutsideItem={displayDragItemInCell ? dragFromOutsideItem : null}
					onDropFromOutside={onDropFromOutside}
					resourceIdAccessor="resourceId"
					resources={resourceMap}
					resourceTitleAccessor="resourceTitle"
					selectable
					showMultiDayTimes={false}
					step={15}
					onSelectSlot={(slotInfo) => {
						console.info(`start: ${slotInfo.start}; end: ${slotInfo.end}; resourceId: ${slotInfo.resourceId}`);
					}}
					onItemDrop={(slotInfo) => {
						console.info(`start: ${slotInfo.start}; end: ${slotInfo.end}; resourceId: ${slotInfo.resourceId}`);
					}}
				/>
			</div>
		</>
	)
}