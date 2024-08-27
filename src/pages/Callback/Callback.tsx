import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { oauth2Token } from "../../client";
import { useAuthentication } from "../../hooks/useAuthentication.ts";
import { ITokenResponse } from "../../context/AuthenticationContext.tsx";

export function CallbackPage() {
	const { handleTokenResponse } = useAuthentication()
	const [ searchParams] = useSearchParams()
	const [ authenticated, setAuthenticated ] = useState(false)
	const navigate = useNavigate();

	useEffect(() => {
		const code = searchParams.get("code")!;
		const clientID = "a19a16fa-ea14-4edb-9181-80cb886bbeaf"
		const clientSecret = "fd9f1mHx8bW8CkPwyYpcTabS1NJRHqeT"

		oauth2Token({
			clientId: clientID,
			clientSecret: clientSecret,
			code: code,
			grantType: "authorization_code",
			redirectUri: "http://localhost:5173/callback"
		}).then((tokenResponse) => {
			handleTokenResponse(tokenResponse as ITokenResponse)
			setAuthenticated(true)
			navigate("/")
		})
	}, [authenticated, navigate, searchParams])

	return (
		<>
		</>
	)
}