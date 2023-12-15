import React, {useState, useEffect} from "react";
import fetchApi from "../utilities/fetchApi";

function CategoriesManage() {
	const [categories, setCategories] = useState([]);
	const [newCategoryName, setNewCategoryName] = useState("");

	// Carica le categorie all"avvio del componente
	useEffect(() => {
		fetchCategories();
	}, []);

	async function fetchCategories() {
		try {
			const data = await fetchApi("/categories", "GET");
			setCategories(data);
		} catch (error) {
			console.error("Errore nel recupero delle categorie:", error);
		}
	}

	async function handleAddCategory(event) {
		event.preventDefault();
		try {
			await fetchApi("/categories", "POST", {name: newCategoryName});
			setNewCategoryName("");
			fetchCategories();
		} catch (error) {
			console.error("Errore durante l'aggiunta della categoria", error);
		}
	}

	async function handleDeleteCategory(categoryId) {
		try {
			await fetchApi(`/categories/${categoryId}`, "DELETE");
			fetchCategories();
		} catch (error) {
			console.error("Errore durante l'eliminazione della categoria", error);
		}
	}

	return (
		<>
			<div className="h-[90vh] w-screen flex flex-col justify-start items-center text-gray-800 bg-fixed bg-cover bg-center bg-[url('/background.jpg')]">
				<h2 className="text-3xl text-center uppercase my-5">
					Gestione Categorie
				</h2>
				<div className="container mx-auto">
					<div className="flex gap-10">
						{/* Elenco Categorie */}
						<div className="w-1/4">
							<h3 className="text-xl mb-3 font-semibold">Elenco Categorie</h3>
							<ul className="list-disc">
								{categories.map((category) => (
									<li
										key={category.id}
										className="flex justify-between items-center mb-2">
										<span className="mr-2">{category.name}</span>
										<button
											onClick={() => handleDeleteCategory(category.id)}
											className="bg-red-700 text-slate-200 px-2 py-1 rounded-md hover:bg-red-800 transition">
											<i className="fa-solid fa-trash-can"></i>
										</button>
									</li>
								))}
							</ul>
						</div>
						<div className="w-1/2"></div>
						{/* Form Aggiungi Categoria */}
						<div className="w-1/2">
							<h3 className="text-xl mb-3 font-semibold">Aggiungi Categoria</h3>
							<form
								onSubmit={handleAddCategory}
								className="flex flex-col gap-3">
								<input
									type="text"
									value={newCategoryName}
									onChange={(e) => setNewCategoryName(e.target.value)}
									placeholder="Nome della categoria"
									className="border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
								/>
								<button
									type="submit"
									className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
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
