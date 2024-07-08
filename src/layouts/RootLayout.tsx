import { Outlet } from "react-router-dom";
import { AuthenticationProvider } from "../context/AuthenticationContext";
import { Navigation } from "./Navigation.tsx";

export default function Root() {
	return (
		<>
		<AuthenticationProvider>
			<Navigation/>
			<main className="flex">
				<Outlet/>
			</main>
		</AuthenticationProvider>
		</>
	)
}