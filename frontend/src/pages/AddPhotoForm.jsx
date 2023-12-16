import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import fetchApi from "../utilities/fetchApi";
import axios from "axios";

function AddPhotoForm() {
	const serverUrl = "http://localhost:3000";
	const navigate = useNavigate();
	const [imagePreview, setImagePreview] = useState(null);
	const [categories, setCategories] = useState([]);
	const [photos, setPhotos] = useState([]);
	const [formErrors, setFormErrors] = useState({});
	const [isEditing, setIsEditing] = useState(false);

	const [photoData, setPhotoData] = useState({
		title: "",
		description: "",
		image: null,
		visible: true,
		userId: 1,
		categories: [],
	});

	// initial loading data
	useEffect(() => {
		async function fetchCategories() {
			try {
				const data = await fetchApi("/admin/categories", "GET");
				setCategories(data);
			} catch (error) {
				console.error("Errore nel recupero delle categorie:", error);
			}
		}
		fetchCategories();
	}, []);

	// Funzione per resettare il form
	function resetForm() {
		setPhotoData({
			title: "",
			description: "",
			image: "",
			categories: [],
			visible: false,
		});
		setIsEditing(false);
		// setShowOverlay(false);
		// setFormErrors({});
	}

	// Salva i dati nel database
	function savePhoto(photo) {
		const formData = new FormData();

		for (let [key, value] of photo.entries()) {
			formData.append(key, value);
		}

		if (photo.imageFile) {
			formData.append("image", photo.imageFile);
		}
		axios({
			method: "POST",
			url: `${serverUrl}/admin/photos`,
			data: formData,
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
		})
			.then((response) => {
				console.log(response);
				if (response.status >= 200 && response.status < 300) {
					setPhotos((prevPhotos) => [...prevPhotos, response.data.photo]);
					resetForm();
					navigate("/dashboard");
				}
			})
			.catch((error) => {
				alert(
					"Errore nel salvataggio della foto: " + error.response.data.message,
				);
				console.log("Errore nel salvataggio della foto:", error);
			});
	}

	// Aggiorna i dati nel database
	async function updatePhoto(photo) {
		const formData = new FormData();
		formData.append("title", photo.get("title"));
		formData.append("description", photo.get("description"));
		formData.append("visible", photo.get("visible"));
		for (let category of photo.getAll("categories[]")) {
			formData.append("categories[]", category);
		}
		// Gestisci l'immagine
		const imageFile = photo.get("image");
		if (imageFile) {
			formData.append("image", imageFile);
		}
		// Recupera l'ID per l'URL della richiesta
		const id = photo.get("id");
		// Invia la richiesta
		try {
			const response = await fetchApi(`/admin/photos/${id}`, "PATCH", formData);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const updatedPhoto = await response.json();
			setPhotos((prevPhotos) =>
				prevPhotos.map((p) => (p.id === updatedPhoto.id ? updatedPhoto : p)),
			);
			resetForm();
		} catch (error) {
			console.error("Errore durante l'aggiornamento dell'articolo:", error);
		}
	}

	// validate form
	function validateForm(data) {
		let errors = {};
		if (!data.title) errors.title = "Il titolo è obbligatorio";
		if (!data.description) errors.description = "La descrizione è obbligatoria";
		if (!data.categories) errors.categories = "Il contenuto è obbligatorio";
		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	}

	/* ------------------------------ */
	/* FUNZIONI */

	function handleChange(event) {
		const {name, value, checked, type, files} = event.target;
		if (name === "image" && files.length > 0) {
			setPhotoData({...photoData, imageFile: files[0]});
		} else if (type === "checkbox" && name === "categories") {
			setPhotoData((prev) => ({
				...prev,
				categories: {
					...prev.categories,
					[value]: checked,
				},
			}));
		} else {
			setPhotoData((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	}

	function handleEdit(photoId) {
		setIsEditing(true);
		const photoToEdit = photos.find((photo) => photo.id === photoId);
		const photoCategories = {};
		photoToEdit.categories.forEach((category) => {
			photoCategories[category.id] = true;
		});
		setPhotoData({
			...photoToEdit,
			categories: photoCategories,
			imageUrl: photoToEdit.image,
		});
	}

	function handleFormSubmit(event) {
		event.preventDefault();
		if (!validateForm(photoData)) {
			return;
		}
		const formData = new FormData();
		formData.append("title", photoData.title);
		formData.append("description", photoData.description);
		formData.append("visible", photoData.visible.toString());
		formData.append("userId", photoData.userId);
		const categoriesArray = Object.keys(photoData.categories)
			.filter((categoryId) => photoData.categories[categoryId])
			.map((categoryId) => parseInt(categoryId));
		categoriesArray.forEach((categoryId) => {
			formData.append("categories[]", categoryId);
		});
		if (photoData.imageFile) {
			formData.append("image", photoData.imageFile);
		}
		if (isEditing) {
			updatePhoto(formData);
		} else {
			savePhoto(formData);
		}
	}

	function handleImageChange(e) {
		handleChange(e);
		if (e.target.files && e.target.files[0]) {
			const fileReader = new FileReader();
			fileReader.onload = (e) => {
				setImagePreview(e.target.result);
			};
			fileReader.readAsDataURL(e.target.files[0]);
		}
	}

	function createCategoryCheckboxes() {
		return categories.map((category) => (
			<div key={category.id} className="flex items-center">
				<input
					id={`category-${category.id}`}
					type="checkbox"
					name="categories"
					value={category.id}
					checked={photoData.categories[category.id] || false}
					onChange={handleChange}
					className="mr-2"
				/>
				<label htmlFor={`category-${category.id}`} className="text-violet-300">
					{category.name}
				</label>
			</div>
		));
	}

	/* ------------------------------ */

	return (
		<div className="overlay fixed inset-0 bg-gray-700 bg-opacity-80 flex justify-center items-center">
			<div className="bg-cyan-950 p-6 rounded-lg shadow-lg border-2">
				<form
					onSubmit={handleFormSubmit}
					className="flex flex-col items-center justify-center space-y-4 w-full max-w-2xl mx-auto">
					{/* Titolo */}
					<div className="flex justify-between items-center space-x-2 w-full">
						<label className="text-white min-w-[7rem]" htmlFor="title">
							Titolo:
						</label>
						<input
							className="border rounded-md px-2 py-1 flex-grow"
							type="text"
							name="title"
							id="title"
							value={photoData.title}
							onChange={handleChange}
						/>
						{formErrors.title && (
							<span className="text-red-500">{formErrors.title}</span>
						)}
					</div>

					{/* Descrizione */}
					<div className="flex justify-between items-center space-x-2 w-full">
						<label className="text-white min-w-[7rem]" htmlFor="description">
							Descrizione:
						</label>
						<textarea
							className="border rounded-md px-2 py-1 w-full"
							name="description"
							id="description"
							value={photoData.description}
							onChange={handleChange}
						/>
						{formErrors.description && (
							<span className="text-red-500">{formErrors.description}</span>
						)}
					</div>

					{/* Immagine */}
					<div className="flex justify-between items-center space-x-2 w-full">
						<div className="w-full md:w-1/2">
							<label className="text-white min-w-[7rem]" htmlFor="image">
								Immagine:
							</label>
							<input
								type="file"
								name="image"
								id="image"
								onChange={handleImageChange}
								className="border rounded-md px-2 py-1 flex-grow text-gray-400"
							/>
						</div>

						{/* Anteprima Immagine */}
						<div className="px-2 w-full md:w-1/2">
							{isEditing && photoData.imageUrl ? (
								<img
									src={`${serverUrl}/${photoData.image.replace(/\\/g, "/")}`}
									alt="Immagine corrente"
									className="w-60 border-2 border-white rounded-md ml-auto"
								/>
							) : imagePreview ? (
								<img
									src={imagePreview}
									alt="Anteprima immagine"
									className="w-60 border-2 border-white rounded-md ml-auto"
								/>
							) : null}
						</div>
					</div>

					{/* Visibile */}
					<div className="flex justify-start items-center space-x-2 w-full">
						<label className="text-white min-w-[7rem]">Visibile:</label>
						<input
							type="checkbox"
							name="visible"
							checked={photoData.visible}
							onChange={handleChange}
						/>
					</div>

					{/* Categorie */}
					<div className="py-5 flex justify-between items-center space-x-2 w-full">
						<label className="text-white min-w-[7rem]">Categorie:</label>
						<div className="flex flex-wrap gap-3 w-full">
							{createCategoryCheckboxes()}
						</div>
						{formErrors.title && (
							<span className="text-red-500">
								Seleziona almeno una categoria
							</span>
						)}
					</div>

					<div className="flex gap-5">
						{/* Bottone di invio */}
						<button
							type="submit"
							className={`px-4 py-2 rounded transition duration-200 ease-in-out
						${
							isEditing
								? "bg-orange-800 text-slate-200 hover:bg-orange-600 hover:text-white cursor-pointer"
								: "bg-purple-800 text-slate-200  hover:bg-purple-600 hover:text-white cursor-pointer"
						}`}>
							{isEditing ? "Modifica" : "Aggiungi"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default AddPhotoForm;
