// import { useContext } from "react";
// import { ApplicationContext } from "../context/context.ts";
// import { useLocalStorage } from "./useLocalStorage.ts";

export interface User {
	user: User | null;
	setUser: (user: User | null) => void;
}

// export const useUser = () => {
// 	const { user, setUser } = useContext(ApplicationContext)
// 	const { setItem } = useLocalStorage()
//
// 	const
//
// }