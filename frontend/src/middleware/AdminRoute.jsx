import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";

export default function ProtectedRoute() {
	const {isLogged, initComplete} = useAuth();

	if (!isLogged && initComplete) {
		return <Navigate to="/login" />;
	}

	return initComplete && <Outlet />;
}
