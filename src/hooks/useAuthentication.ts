import { useContext } from "react";
import { AuthenticationContext, IAuthenticationContext } from "../context/AuthenticationContext.tsx";

export const useAuthentication = (): IAuthenticationContext => {
	return useContext(AuthenticationContext);
};