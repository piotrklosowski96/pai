import React, { createContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";
import { useNavigate } from "react-router-dom";
import { authenticateUserUsingPost, type AuthenticateUserUsingPostResponse, GeneralUserInfoResponse } from "../client";

export interface IAuthenticationContext {
	token?: string
	user?: string
	login: (username: string, password: string) => void
	logout: () => void
}

export const AuthenticationContext = createContext<IAuthenticationContext>({
	login: () => {},
	logout: () => {}
});

type Props = {
	children: React.ReactNode
}

export const AuthenticationProvider = ({children}: Props) => {
	const { setItem, removeItem } = useLocalStorage()
	const [ user, setUser ] = useState("");
	const [ token, setToken ] = useState("");
	const navigate = useNavigate();

	const login = (username: string, password: string) => {
		authenticateUserUsingPost({loginDto: {
				usernameOrEmail: username,
				password: password,
		}}).then((response: AuthenticateUserUsingPostResponse) => {
			setItem("user", JSON.stringify(response))
			navigate("/");
		}).catch((e) => {
			console.log(e);
		})
	};

	const logout = (): void => {
		setUser("");
		setToken("");
		removeItem("user");
		localStorage.removeItem("site");
		navigate("/login");
	};

	return (
		<AuthenticationContext.Provider value={{token, user, login, logout}}>
			{children}
		</AuthenticationContext.Provider>
	);
};
