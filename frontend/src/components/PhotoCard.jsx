import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Card({photo, onDelete}) {
	const serverUrl = "http://localhost:3000";
	const navigate = useNavigate();

	function show() {
		navigate(`/show/${photo.id}`);
	}

	function handleEdit() {
		navigate(`/edit-photo/${photo.id}`);
	}

	function handleDelete() {
		axios({
			method: "DELETE",
			url: `${serverUrl}/admin/photos/${photo.id}`,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((response) => {
				if (response.status === 200) {
					onDelete(photo.id);
					alert("Foto eliminata");
				}
			})
			.catch((error) => {
				alert(
					`Errore nell'eliminazione della foto: ${
						error.response?.data?.message || error.message
					}`,
				);
			});
	}

	const imageUrl =
		import.meta.env.VITE_API_URL + "/" + photo.image.replace(/\\/g, "/");
	return (
		<div className=" max-w-md transition transform hover:scale-105 duration-300">
			<div className="bg-gray-100 flex-1 rounded-lg overflow-hidden shadow-md shadow-slate-800 border-2 border-teal-800">
				<img
					src={imageUrl}
					alt={photo.title}
					className="w-full"
					onClick={show}
				/>
				<div className="p-4">
					<h5 className="text-xl text-center mb-3 font-bold text-teal-800">
						{photo.title}
					</h5>
					<p className="text-center italic mb-4">{photo.description}</p>
					<div className="flex gap-2 justify-center">
						{photo.categories.map((category, index) => (
							<span
								key={index}
								className="bg-amber-400 text-gray-800 font-light text-xs rounded-full px-3 py-1">
								{category.name}
							</span>
						))}
					</div>
					<div className="flex justify-center gap-6 mt-6">
						<button
							onClick={handleEdit}
							className="px-3 py-1 rounded-md bg-lime-900 text-stone-300 hover:bg-lime-700 hover:text-white">
							<i className="fa-solid fa-pen-to-square"></i> Modifica
						</button>
						<button
							onClick={handleDelete}
							className="px-3 py-1 rounded-md bg-red-800 text-stone-300 hover:bg-red-600 hover:text-white">
							<i className="fa-solid fa-trash-can"></i> Elimina
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Card;
