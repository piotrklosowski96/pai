import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./layouts/RootLayout.tsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.tsx";
import { RepertoirePage } from "./pages/Repertoire/Repertoire.tsx";
import { EventsPage } from "./pages/Events/Events.tsx";
import { ContactPage } from "./pages/Contact/Contact.tsx";
import { LoginPage } from "./pages/Login/Login.tsx";
import { RegistrationPage } from "./pages/Registration/Registration.tsx";
import {
  AdministrationLayoutWrapper,
  cinemasLoader,
} from "./pages/Administration/AdministrationLayoutWrapper.tsx";
import {
	Movies,
	moviesLoader
} from "./pages/Administration/Movies.tsx";
import {
	ScreeningsScheduler,
	screeningsSchedulerLoader
} from "./components/ScreeningsScheduler/ScreeningsScheduler.tsx";
import {
	EditMovie,
	editMovieLoader
} from "./pages/Administration/EditMovie.tsx";

import { momentLocalizer } from "react-big-calendar";
import moment from 'moment'
import { OpenAPI } from "./client";
const localizer = momentLocalizer(moment)

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root/>,
		errorElement: <ErrorPage/>,
		children: [
			{
				path: "/administracja",
				element: <AdministrationLayoutWrapper/>,
        loader: cinemasLoader,
				children: [
					{
						path: "movies",
						element: <Movies/>,
						loader: moviesLoader
					},
					{
						path: "screenings/:cinemaId",
						element: <ScreeningsScheduler localizer={localizer}/>,
						// loader: screeningsSchedulerLoader,
					},
					{
						path: "movies/:movieId/edit",
						element: <EditMovie/>,
            loader: editMovieLoader,
					}
				]
			},
			{
				path: "/repertuar",
				element: <RepertoirePage/>
			},
			{
				path: "/wydarzenia",
				element: <EventsPage/>
			},
			{
				path: "/kontakt",
				element: <ContactPage/>
			},
			{
				path: "/logowanie",
				element: <LoginPage/>
			},
			{
				path: "/rejestracja",
				element: <RegistrationPage/>
			}
		]
	}
])

OpenAPI.BASE = "http://localhost:8083"

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router}/>
	</React.StrictMode>
)
