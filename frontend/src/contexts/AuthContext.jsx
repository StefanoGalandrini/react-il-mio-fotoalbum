import {createContext, useContext, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import fetchApi from "../utilities/fetchApi";

const AuthContext = createContext();

export function AuthProvider({children}) {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(
		() => localStorage.getItem("token") ?? null,
	);
	const [isLogged, setIsLogged] = useState(false);
	const [initComplete, setInitComplete] = useState(false);
	const navigate = useNavigate();

	function handleLoginOrRegistration(response) {
		setUser(response.user);
		setIsLogged(true);
		storeToken(response.token);
	}

	function handleLogout() {
		setUser(null);
		storeToken(null);
		setIsLogged(false);
		localStorage.removeItem("token");
		setTimeout(() => {
			navigate("/");
		});
	}

	function storeToken(token) {
		setToken(token);
		localStorage.setItem("token", token);
	}

	async function verifyToken() {
		const storedToken = localStorage.getItem("token");
		if (!storedToken) {
			handleLogout();
			return;
		}
		try {
			const response = await fetchApi("/verify-token", "POST", {
				token: storedToken,
			});
			if (response.user) {
				setUser(response.user);
				setIsLogged(true);
				navigate("/dashboard");
			} else {
				handleLogout();
			}
		} catch (error) {
			console.error("Errore nella verifica del token:", error);
			handleLogout();
		}
	}

	async function initializeData() {
		if (token) {
			await verifyToken();
		}
		setInitComplete(true);
	}

	useEffect(() => {
		initializeData();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				isLogged,
				handleLoginOrRegistration,
				handleLogout,
				initComplete,
			}}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
