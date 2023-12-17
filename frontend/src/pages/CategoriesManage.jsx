import React, {useState, useEffect} from "react";
import axios from "axios";

function CategoriesManage() {
	const [categories, setCategories] = useState([]);
	const [newCategoryName, setNewCategoryName] = useState("");
	const serverUrl = "http://localhost:3000";

	// Carica le categorie all"avvio del componente
	useEffect(() => {
		fetchCategories();
	}, []);

	async function fetchCategories() {
		await axios({
			method: "GET",
			url: `${serverUrl}/admin/categories`,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((response) => {
				setCategories(response.data);
			})
			.catch((error) => {
				console.error("Errore nella richiesta delle categorie:", error);
			});
	}

	async function handleAddCategory(event) {
		event.preventDefault();
		try {
			await axios({
				method: "POST",
				url: `${serverUrl}/admin/categories`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				data: {
					name: newCategoryName,
				},
			});
			setNewCategoryName("");
			fetchCategories();
		} catch (error) {
			console.error("Errore durante l'aggiunta della categoria", error);
		}
	}

	async function handleDeleteCategory(categoryId) {
		try {
			await axios({
				method: "DELETE",
				url: `${serverUrl}/admin/categories/${categoryId}`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			fetchCategories();
		} catch (error) {
			console.error("Errore durante l'eliminazione della categoria", error);
		}
	}

	return (
		<>
			<div className="mt-[10vh] w-screen h-screen flex flex-col justify-start items-center text-teal-300">
				<h2 className="text-3xl text-center uppercase my-10">
					Gestione Categorie
				</h2>
				<div className=" w-screen px-[20vw]">
					<div className="flex gap-10">
						{/* Elenco Categorie */}
						<div className="w-5/12">
							<h3 className="text-xl mb-5 font-bold text-violet-300">
								Elenco categorie:
							</h3>
							<ul className="list-disc text-gray-100 grid grid-cols-2 gap-x-16">
								{categories.map((category) => (
									<li
										key={category.id}
										className="text-sm flex justify-between items-center mb-2 border-b-[1px] border-violet-300 pb-2">
										<span className="mr-2">{category.name}</span>
										<button
											onClick={() => handleDeleteCategory(category.id)}
											className="text-sm bg-red-700 text-slate-200 px-2 py-1 rounded-md hover:bg-red-800 transition">
											<i className="fa-solid fa-trash-can"></i>
										</button>
									</li>
								))}
							</ul>
						</div>
						<div className="w-2/12"></div>
						{/* Form Aggiungi Categoria */}
						<div className="w-5/12">
							<h3 className="text-xl mb-5 font-bold text-violet-300">
								Aggiungi Categoria
							</h3>
							<form
								onSubmit={handleAddCategory}
								className="flex flex-col gap-3">
								<input
									type="text"
									value={newCategoryName}
									onChange={(e) => setNewCategoryName(e.target.value)}
									placeholder="Nome della categoria"
									className="text-gray-800 rounded py-2 px-3 border-4 border-transparent hover:border-violet-300 focus:outline-none focus:border-violet-300 focus:border-4"
								/>
								<button
									type="submit"
									className="px-3 py-2 rounded-md text-gray-100 bg-teal-600 w-fit transition duration-150 hover:bg-teal-300 hover:text-gray-900">
									Aggiungi
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default CategoriesManage;
