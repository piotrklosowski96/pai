import {
	useState,
	createContext,
	ReactNode, useEffect,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";
import { useNavigate } from "react-router-dom";
import { authenticateUserUsingPost, LoginResponse } from "../client";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { IUser } from "./User.ts";

export interface IAuthenticationContext {
	token?: string
	user?: IUser | null
	login: (username: string, password: string) => void
	logout: () => void
}

export const AuthenticationContext = createContext<IAuthenticationContext>({
	login: () => {},
	logout: () => {}
});

type PaiJWT = JwtPayload & {
	roles: string[];
}

type AuthenticationProviderProps = {
	children: ReactNode
}

export const AuthenticationProvider = ({children}: AuthenticationProviderProps) => {
	const { setItem, getItem } = useLocalStorage()
	const [ user, setUser ] = useState<IUser | null>(null);
	const [ token, setToken ] = useState<string | null>("");
	const navigate = useNavigate();

	useEffect(() => {
		const tokenValue = getItem("token");
		if (tokenValue) {
			setToken(tokenValue);

			const jwtDecodedUser = jwtDecode<PaiJWT>(tokenValue)
			setUser({
				roles: jwtDecodedUser.roles
			} as IUser);
		}
	}, [])

	const login = async (username: string, password: string) => {
		const response = await authenticateUserUsingPost({
			loginRequest: {
				username: username,
				password: password,
			}
		}) as LoginResponse

		if (!response.token) {
			throw new Error("Token not found")
		}
		const jwtDecodedUser = jwtDecode<PaiJWT>(response.token)

		setItem("token", response.token)
		setToken(response.token);
		setUser({
			roles: jwtDecodedUser.roles
		} as IUser)
		navigate("/");
	};

	const logout = (): void => {
		setToken("");
		setUser(null);
		navigate("/login");
	};

	return (
		<AuthenticationContext.Provider value={{token, user, login, logout}}>
			{children}
		</AuthenticationContext.Provider>
	);
};
