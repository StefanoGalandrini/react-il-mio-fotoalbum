import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

export default function DefaultLayout() {
	return (
		<>
			<Navbar className="min-h-[15vh]"></Navbar>

			<main className="min-h-[85vh]">
				<Outlet></Outlet>
			</main>
		</>
	);
}
