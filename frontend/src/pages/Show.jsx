import {useEffect, useState} from "react";
import Navbar from "../components/Navbar.jsx";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import fetchApi from "../utilities/fetchApi.js";

function Show() {
	const {id} = useParams();
	const [photo, setPhoto] = useState(null);

	useEffect(() => {
		async function fetchArticle() {
			try {
				const response = await fetchApi(`/admin/photos/${id}`, "GET");
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = response;
				setPhoto(data);
			} catch (error) {
				console.error("Errore nel caricamento dell'articolo:", error);
			}
		}

		fetchArticle();
	}, [id]);

	if (!photo) {
		return <div>Caricamento...</div>;
	}

	return (
		<div className="container mx-auto mt-12 p-4">
			<h1 className="text-3xl font-bold text-fuchsia-500 text-center mb-14">
				{article.title}
			</h1>
			<div className="flex flex-wrap">
				<div className="w-full md:w-1/2">
					<img
						className="rounded-md border-1 border-gray-300 w-2xl"
						src={
							article.image
								? `${serverUrl}/${article.image.replace(/\\/g, "/")}`
								: `${serverUrl}/uploads/missing-image.jpg`
						}
						alt="Article image"
					/>
				</div>
				<div className="w-full md:w-1/2 md:pl-4 text-white">
					<p className="text-lg mb-5">
						<strong>Autore:</strong>{" "}
						<span className="text-fuchsia-300">{article.author}</span>
					</p>
					<p className="mb-6">
						<strong>Contenuto:</strong>{" "}
						<span className="text-fuchsia-300">{article.content}</span>
					</p>
					<p className="mb-6">
						<strong>Categoria:</strong>{" "}
						<span className="text-fuchsia-300">
							{article.category?.name || "Nessuna categoria"}
						</span>
					</p>
					<p className="mb-1">
						<strong>Tags:</strong>
					</p>
					<div className="flex flex-wrap">
						{article.tags?.map((tag, index) => (
							<span
								key={index}
								className="inline-block bg-fuchsia-200 text-gray-800 text-xs px-2 py-1 rounded-full mr-2 my-2">
								{tag.name}
							</span>
						))}
					</div>
				</div>
			</div>
			<div className="mt-5 flex justify-center">
				<Link
					to="/blog"
					className="px-3 py-2 rounded-md text-white bg-fuchsia-900 w-fit transition delay-150 hover:bg-fuchsia-700">
					Torna al Blog
				</Link>
			</div>
		</div>
	);
}

export default Show;
