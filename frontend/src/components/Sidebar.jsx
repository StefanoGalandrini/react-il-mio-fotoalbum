import {useState} from "react";
import {NavLink} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";
import fetchApi from "../utilities/fetchApi";

function Sidebar() {
	const {user} = useAuth();
	const [formData, setFormData] = useState({email: "", message: ""});

	function handleInputChange(event) {
		setFormData({...formData, [event.target.name]: event.target.value});
	}

	async function handleSubmit(event) {
		event.preventDefault();
		try {
			const response = await fetchApi("/messages", "POST", formData);
			console.log(response);
			setFormData({email: "", message: ""});
		} catch (error) {
			console.error("Errore durante l'invio del messaggio", error);
		}
	}

	function NavbarLink({href, children}) {
		return (
			<NavLink
				to={href}
				className="block py-3 px-4 min-w-[80px] text-center rounded-md transition-all duration-300 hover:bg-gray-100 hover:text-primary">
				{children}
			</NavLink>
		);
	}

	return (
		<div className="fixed top-[10vh] h-screen right-0 w-[15vw] bg-gray-400 p-4 shadow">
			{user && user.role === "admin" ? (
				// Menu per Admin
				<div>
					<p className="font-bold text-lg mb-4">Gestione Categorie</p>
					<NavbarLink href="/categories" className="block mb-2">
						Elenco Categorie
					</NavbarLink>
					<NavLink to="/categories/create" className="block mb-2">
						Aggiungi Categoria
					</NavLink>
				</div>
			) : (
				// Form per Messaggi
				<div className="flex flex-col gap-2">
					<p className="font-bold text-lg text-center mb-4">
						Invia un Messaggio
					</p>
					<form onSubmit={handleSubmit} className="flex flex-col gap-2">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleInputChange}
							placeholder="La tua email"
							className="w-full p-2"
						/>
						<label htmlFor="message" className="mt-4">
							Messaggio
						</label>
						<textarea
							id="message"
							name="message"
							value={formData.message}
							onChange={handleInputChange}
							placeholder="Il tuo messaggio"
							className="mb-2 w-full p-2 h-28"></textarea>
						<div className="flex justify-center">
							<button
								type="submit"
								className="w-fit px-4 py-2 bg-teal-800 rounded-md text-slate-300 mt-3 transition duration-150 hover:bg-teal-700 hover:text-white">
								Invia
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
}

export default Sidebar;
