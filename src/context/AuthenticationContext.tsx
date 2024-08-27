import {
	useState,
	createContext,
	ReactNode, useEffect,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";
import { useNavigate } from "react-router-dom";
import { login as authenticateUser } from "../client";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { IUser } from "./User.ts";

export interface IAuthenticationContext {
	token?: string | null
	user?: IUser | null
	login: (username: string, password: string) => void
	logout: () => void
	handleTokenResponse: (tokenResponse: ITokenResponse) => void
}

export interface ITokenResponse {
	access_token: string
	expires_in: number
	token_type: string
	refresh_token?: string
	scope?: string
}

export const AuthenticationContext = createContext<IAuthenticationContext>({
	login: () => {},
	logout: () => {},
	handleTokenResponse: () => {},
});

type PaiJWT = JwtPayload & {
	"https://wawel.pl": {
		userID: string
		firstName: string
		lastName: string
		email: string
		roles: string[]
	}
}

type AuthenticationProviderProps = {
	children: ReactNode
}

export const AuthenticationProvider = ({children}: AuthenticationProviderProps) => {
	const {setItem, getItem} = useLocalStorage()
	const [user, setUser] = useState<IUser | null>(null);
	const [token, setToken] = useState<string | null>("");
	const navigate = useNavigate();

	useEffect(() => {
		const tokenValue = getItem("token");
		if (tokenValue) {
			setToken(tokenValue);

			const jwtDecodedUser = jwtDecode<PaiJWT>(tokenValue)
			setUser({
				userID: jwtDecodedUser["https://wawel.pl"]?.userID,
				firstName: jwtDecodedUser["https://wawel.pl"]?.firstName,
				lastName: jwtDecodedUser["https://wawel.pl"]?.lastName,
				email: jwtDecodedUser["https://wawel.pl"]?.email,
				roles: jwtDecodedUser["https://wawel.pl"]?.roles,
			} as IUser);
		}
	}, [])

	const login = async (email: string, password: string) => {
		const response = await authenticateUser({
			body: {
				email: email,
				password: password,
			}
		}) as ITokenResponse

		handleTokenResponse(response)
		navigate("/");
	};

	const logout = (): void => {
		setItem("token", "");
		setUser(null);
		navigate("/");
	};

	const handleTokenResponse = (tokenResponse: ITokenResponse)  => {
		if (!tokenResponse.access_token) {
			throw new Error("Token not found")
		}
		const jwtDecodedUser = jwtDecode<PaiJWT>(tokenResponse.access_token)

		setItem("token", tokenResponse.access_token)
		setToken(tokenResponse.access_token);
		setUser({
			userID: jwtDecodedUser["https://wawel.pl"]?.userID,
			firstName: jwtDecodedUser["https://wawel.pl"]?.firstName,
			lastName: jwtDecodedUser["https://wawel.pl"]?.lastName,
			email: jwtDecodedUser["https://wawel.pl"]?.email,
			roles: jwtDecodedUser["https://wawel.pl"]?.roles,
		} as IUser)
	}

	return (
		<AuthenticationContext.Provider value={{token, user, login, logout, handleTokenResponse}}>
			{children}
		</AuthenticationContext.Provider>
	);
};
