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
		<header className="fixed top-0 left-0 right-0 z-50 bg-black/90 shadow-md shadow-white/20">
			<nav className="py-0">
				<div className=" w-[90%] mx-auto h-[10vh] flex items-center justify-between">
					<div className="flex flex-col items-center">
						<p className="font-bold text-teal-300 uppercase text-lg">
							obiettivo
						</p>
						<img
							src="/logo-ok.png"
							alt="Blog Logo"
							className="w-[1.7rem] h-[1.7rem] bg-center bg-cover rounded-full"
						/>
						<p className="uppercase font-bold text-teal-300 text-lg">sfocato</p>
					</div>

					<div className="flex flex-col items-center">
						<p className="text-3xl text-violet-300 uppercase font-bold pl-10">
							Studio fotografico
						</p>
						<p className="text-lg text-violet-500 font-bold pl-10">
							«La perfezione è sopravvalutata»
						</p>
					</div>

					<div id="navbar">
						<ul className="flex gap-3 text-teal-300">
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
										className="text-gray-800 rounded py-1 px-2 border-4 border-transparent hover:border-teal-300 focus:outline-none focus:border-teal-300 focus:border-4"
									/>
									<button
										type="submit"
										className="ml-2 rounded-md text-white bg-teal-600 px-3 py-2 transition delay-150 hover:bg-teal-300 hover:text-stone-700">
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
