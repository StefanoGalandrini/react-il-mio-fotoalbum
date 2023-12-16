import {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";
import {useSearch} from "../contexts/SearchContext";
import {useSearchGuest} from "../contexts/SearchContextGuest";

function NavbarLink({href, children}) {
	return (
		<NavLink
			to={href}
			className="block py-3 px-4 min-w-[80px] text-center rounded-md transition-all duration-300 hover:bg-gray-300 hover:text-primary">
			{children}
		</NavLink>
	);
}

function Navbar() {
	const {isLogged, handleLogout, user} = useAuth();
	const {fetchFilteredPhotos: fetchFilteredAdmin} = useSearch();
	const {fetchFilteredPhotos: fetchFilteredGuest} = useSearchGuest();
	const [search, setSearch] = useState("");
	const navigate = useNavigate();

	function handleSearchChange(event) {
		setSearch(event.target.value);
	}

	function handleSubmit(event) {
		event.preventDefault();
		if (isLogged) {
			fetchFilteredAdmin(search);
		} else {
			fetchFilteredGuest(search);
		}
	}

	function logout() {
		handleLogout();
		navigate("/");
	}

	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-lg">
			<nav className="py-0">
				<div className=" w-[90%] mx-auto h-[10vh] flex items-center justify-between">
					<div className="flex items-center">
						<p className="font-bold text-teal-800 uppercase text-xl">
							obiettivo
						</p>
						<img
							src="/logo-ok.png"
							alt="Blog Logo"
							className="w-[3rem] m-1 rounded-full border-2 border-teal-800 overflow-hidden"
						/>
						<p className="uppercase font-bold text-teal-800 text-xl">sfocato</p>
					</div>

					<div className="text-fuchsia-900">
						<p className="text-3xl uppercase font-bold pl-10">
							La perfezione è sopravvalutata
						</p>
					</div>

					<div>
						<ul className="flex gap-3">
							<li>
								{isLogged ? (
									<NavbarLink href="/dashboard">Dashboard</NavbarLink>
								) : (
									<NavbarLink href="/">Home</NavbarLink>
								)}
							</li>

							<li className="flex items-center">
								<form onSubmit={handleSubmit}>
									<input
										type="text"
										placeholder="Cerca per titolo..."
										value={search}
										onChange={handleSearchChange}
										className="border rounded py-1 px-2 focus:outline-none focus:border-teal-800 focus:border-2"
									/>
									<button
										type="submit"
										className="ml-2 rounded-md text-slate-200 bg-teal-800 px-3 py-1 transition delay-150 hover:bg-teal-600 hover:text-white">
										Cerca
									</button>
								</form>
							</li>
							{isLogged && user?.role === "admin" && (
								<li>
									<NavbarLink href="/add-photo">Aggiungi Foto</NavbarLink>
								</li>
							)}

							<li>
								{isLogged ? (
									<div onClick={logout}>
										<NavbarLink href="/">Logout</NavbarLink>
									</div>
								) : (
									<NavbarLink href="/login">Login</NavbarLink>
								)}
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	);
}

export default Navbar;
