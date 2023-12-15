import Navbar from "../components/Navbar";
import {useState, useEffect} from "react";
import PhotoCard from "../components/PhotoCard";
import fetchApi from "../utilities/fetchApi";

function Home() {
	const [photos, setPhotos] = useState([]);

	// Funzione asincrona per recuperare le foto
	async function fetchPhotos() {
		try {
			const data = await fetchApi("/photos", "GET");
			setPhotos(data);
		} catch (error) {
			console.error("Errore nel recupero delle foto:", error);
		}
	}

	useEffect(() => {
		fetchPhotos();
	}, []);

	return (
		<div className="h-[90vh] flex flex-col justify-start items-center text-gray-800 bg-fixed bg-cover bg-center bg-[url('/background.jpg')]">
			<h1 className="my-5 uppercase text-3xl">le nostre foto</h1>
			<div className="container flex justify-start items-start gap-5">
				{photos.map((photo) => (
					<PhotoCard key={photo.id} photo={photo} />
				))}
			</div>
		</div>
	);
}

export default Home;
