import {useState} from "react";
import {NavLink} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";
import fetchApi from "../utilities/fetchApi";

function Sidebar() {
	const {user} = useAuth();
	const [formData, setFormData] = useState({email: "", message: ""});
	const [feedback, setFeedback] = useState(null);
	const [isSuccess, setIsSuccess] = useState(true);

	function handleInputChange(event) {
		setFormData({...formData, [event.target.name]: event.target.value});
		setFeedback(null);
	}

	async function handleSubmit(event) {
		event.preventDefault();
		try {
			const response = await fetchApi("/messages", "POST", formData);
			setFormData({email: "", message: ""});
			setFeedback("Il messaggio è stato inviato con successo");
			setIsSuccess(true);
		} catch (error) {
			setFeedback("Errore durante l'invio del messaggio");
			setIsSuccess(false);
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
		<div className="fixed top-[10vh] h-screen right-0 w-[12vw] bg-white/20 p-4 text-violet-300">
			{user && user.role === "admin" ? (
				// Menu per Admin
				<div className="flex flex-col">
					<p className="font-bold text-xl text-center text-white my-10 uppercase underline underline-offset-4">
						&nbsp;&nbsp;Categorie&nbsp;&nbsp;
					</p>
					<div id="sidebar" className="bg-stone-400 rounded-lg text-violet-800">
						<NavbarLink
							href="/categories-manage"
							className="block mb-2 text-left font-bold">
							Visualizza, aggiungi o rimuovi le categorie delle foto
						</NavbarLink>
					</div>
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
							className="w-full p-2 text-gray-700"
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
							className="mb-2 w-full p-2 h-28 text-gray-700"></textarea>
						<div className="flex justify-center">
							<button
								type="submit"
								className="w-fit px-4 py-2 bg-fuchsia-800 rounded-md text-gray-300 mt-3 transition duration-150 hover:bg-fuchsia-600 hover:text-white">
								Invia
							</button>
						</div>
					</form>
					{feedback && (
						<div
							className={`text-center font-bold p-2 border-2 bg-slate-50 rounded-lg mt-5 ${
								isSuccess ? "text-green-800" : "text-red-700"
							}`}>
							{feedback}
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default Sidebar;
