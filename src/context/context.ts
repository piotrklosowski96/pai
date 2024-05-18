import { createContext } from "react";

import { User } from "../hooks/useUser.ts";

export interface ContextData {
	user: User | null;
	setUser: (user: User | null) => void;
}

export const ApplicationContext = createContext<ContextData>({
	user: null,
	setUser: () => {},
})