import { momentLocalizer } from 'react-big-calendar'

import { ScreeningsScheduler } from "../../components/ScreeningsScheduler.tsx";
import moment from 'moment'

export function AdministrationPage() {
	const localizer = momentLocalizer(moment)

	return (
		<>
			<ScreeningsScheduler localizer={localizer}/>
		</>
	)
}