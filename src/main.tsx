import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
	createBrowserRouter,
	Navigate,
	RouterProvider
} from "react-router-dom";
import Root from "./layouts/RootLayout.tsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.tsx";
import { RepertoirePage } from "./pages/Repertoire/Repertoire.tsx";
import { ContactPage } from "./pages/Contact/Contact.tsx";
import { LoginPage } from "./pages/Login/Login.tsx";
import { RegistrationPage } from "./pages/Registration/Registration.tsx";
import {
	Main,
	mainLoader,
} from "./pages/Main/Main.tsx";
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
	createMovieLoader,
	EditMovie,
	editMovieLoader
} from "./pages/Administration/EditMovie.tsx";
import {
	SeatSelection,
	seatsLoader
} from "./pages/SeatSelection/SeatSelection.tsx";

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
				path: "/",
				element: <Main/>,
				loader: mainLoader,
			},
			{
				path: "/seats",
				element: <SeatSelection/>,
				loader: seatsLoader,
			},
			{
				path: "/administracja",
				element: <AdministrationLayoutWrapper/>,
        loader: cinemasLoader,
				children: [
					{
						index: true,
						element: <Navigate to="movies" />
					},
					{
						path: "movies",
						element: <Movies/>,
						loader: moviesLoader,
					},
					{
						path: "movies/:movieId/edit",
						element: <EditMovie/>,
						loader: editMovieLoader,
					},
					{
						path: "movies/create",
						element: <EditMovie/>,
						loader: createMovieLoader,
					},
					{
						path: "screenings/:cinemaId",
						element: <ScreeningsScheduler localizer={localizer}/>,
						loader: screeningsSchedulerLoader,
					},
				]
			},
			{
				path: "/repertuar",
				element: <RepertoirePage/>,
				loader: cinemasLoader,
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
OpenAPI.interceptors.request.use(config => {
	const token = localStorage.getItem('token');
	config.headers!.Authorization =  token ? `Bearer ${token}` : '';

	return config;
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router}/>
	</React.StrictMode>
)
