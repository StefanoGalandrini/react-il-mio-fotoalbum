import {NavLink, useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";

function NavbarLink({href, children}) {
	return (
		<NavLink
			to={href}
			className="block py-3 px-4 min-w-[80px] text-center rounded-md transition-all duration-300 hover:bg-gray-100 hover:text-primary">
			{children}
		</NavLink>
	);
}

function Navbar() {
	const {isLogged, handleLogout} = useAuth();
	const navigate = useNavigate();

	function logout() {
		handleLogout();
		navigate("/");
	}

	return (
		<header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-lg">
			<nav className="py-4">
				<div className="container px-4 mx-auto flex items-center justify-between">
					<div className="flex items-center">
						<p className="font-bold text-teal-800 text-2xl">LUCE</p>
						<img
							src="/logo-ok.png"
							alt="Blog Logo"
							className="w-[3rem] m-1 rounded-full border-2 border-teal-800 overflow-hidden"
						/>
						<p className="uppercase font-bold text-teal-800 text-2xl">
							riflessa
						</p>
					</div>

					<div className="text-fuchsia-900">
						<p className="text-3xl uppercase text-teal-800 font-bold">
							Immagini per ricordare
						</p>
					</div>

					<div>
						{
							<ul className="flex gap-5">
								<li>
									{isLogged ? (
										<NavbarLink href="/dashboard">Dashboard</NavbarLink>
									) : (
										<NavbarLink href="/">Home</NavbarLink>
									)}
								</li>
								<li>
									<NavbarLink href="/Blog">Blog</NavbarLink>
								</li>
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
						}
					</div>
				</div>
			</nav>
		</header>
	);
}

export default Navbar;