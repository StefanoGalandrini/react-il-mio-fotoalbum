import {useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";
import axios from "axios";

function PhotoCard({photo, onDelete}) {
	const serverUrl = "http://localhost:3000";
	const navigate = useNavigate();
	const {user} = useAuth();

	const cardClass = user ? "admin-card" : "guest-card";

	function show() {
		if (user) {
			navigate(`/show/${photo.id}`);
		} else {
			navigate(`/guest-show/${photo.id}`);
		}
	}

	function handleEdit() {
		const transformedPhoto = {
			...photo,
			categories: photo.categories.reduce((acc, category) => {
				acc[category.id] = true;
				return acc;
			}, {}),
		};
		navigate(`/edit-photo/${photo.id}`, {
			state: {
				transformedPhoto: transformedPhoto,
				editPhoto: true,
			},
		});
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
		<div
			id="card-template"
			className={`${cardClass} transition-all transform hover:scale-105 duration-200`}>
			<div
				onClick={show}
				style={{"--image": `url("${imageUrl}")`}}
				className="card-image bg-[image:var(--image)] cursor-pointer"></div>
			<div className="card-text p-4">
				<h5 className="text-xl text-center mb-3 font-bold text-teal-300">
					{photo.title}
				</h5>
				{/* <p className="text-center font-light text-gray-200 italic mb-8">
					{photo.description}
				</p> */}
				{/* <div className="flex flex-wrap gap-2 justify-center">
					{photo.categories.map((category, index) => (
						<span
							key={index}
							className="bg-amber-400 text-gray-950 font-normal text-xs rounded-full px-3 py-1">
							{category.name}
						</span>
					))}
				</div> */}
			</div>
			{user ? (
				<div className="card-buttons flex justify-center gap-6 mt-6">
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
			) : null}
		</div>
	);
}

export default PhotoCard;
