import React, {useState, useEffect} from "react";
import axios from "axios";

function MessagesManage() {
	const [messages, setMessages] = useState([]);
	const serverUrl = "http://localhost:3000";

	// Carica i messaggi all'avvio del componente
	useEffect(() => {
		fetchMessages();
	}, []);

	async function fetchMessages() {
		await axios({
			method: "GET",
			url: `${serverUrl}/admin/messages`,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((response) => {
				setMessages(response.data);
			})
			.catch((error) => {
				console.error("Errore nella richiesta dei messaggi:", error);
			});
	}

	// Elimina un messaggio
	async function handleDeleteMessage(id) {
		await axios({
			method: "DELETE",
			url: `${serverUrl}/admin/messages/${id}`,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((response) => {
				console.log("Messaggio eliminato con successo", response);

				// Aggiorna la lista dei messaggi
				fetchMessages();
			})
			.catch((error) => {
				console.error("Errore durante l'eliminazione del messaggio", error);
			});
	}

	return (
		<>
			<div className="mt-[10vh] w-screen h-screen flex flex-col justify-start items-center text-teal-300">
				<h2 className="text-3xl text-center uppercase my-10">
					Gestione Messaggi
				</h2>
				<div className=" w-screen px-[20vw]">
					<div className="flex gap-10">
						{/* Elenco Messaggi */}
						<div className="w-full">
							<h3 className="text-xl mb-5 font-bold text-violet-300">
								Elenco messaggi:
							</h3>
							<ul className="list-disc text-gray-100 grid grid-cols-2 gap-x-16">
								{messages.map((message) => (
									<li
										key={message.id}
										className="text-sm flex justify-between items-center mb-2 border-b-[1px] border-violet-300 pb-2">
										<div>
											<p className="mr-2 text-violet-300">Mittente:</p>
											<p className="font-light italic">{message.email}</p>
											<p className="mr-2 mt-3 text-violet-300 font-bold">
												Messaggio:
											</p>
											<p className="font-light italic">{message.message}</p>
										</div>
										<button
											onClick={() => handleDeleteMessage(message.id)}
											className="ml-10 text-sm bg-red-700 text-slate-200 px-2 py-1 rounded-md hover:bg-red-800 transition">
											<i className="fa-solid fa-trash-can"></i>
										</button>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default MessagesManage;
