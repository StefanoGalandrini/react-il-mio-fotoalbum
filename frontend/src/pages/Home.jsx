import Navbar from "../components/Navbar";
import {useState, useEffect} from "react";
import {useSearch} from "../contexts/SearchContext";
import PhotoCard from "../components/PhotoCard";
import Sidebar from "../components/Sidebar";
import fetchApi from "../utilities/fetchApi";

function Home() {
	const [photos, setPhotos] = useState([]);
	const {search} = useSearch();

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

	const filteredPhotos = photos.filter((photo) =>
		photo.title.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<>
			<Sidebar />
			<div className="h-[90vh] w-[85vw] flex flex-col justify-start items-center text-gray-800 bg-fixed bg-cover bg-center bg-[url('/background.jpg')]">
				<h1 className="my-5 uppercase text-3xl">le nostre foto</h1>
				<div className="container flex justify-start items-start gap-5">
					{filteredPhotos.map((photo) => (
						<PhotoCard key={photo.id} photo={photo} showAll={false} />
					))}
				</div>
			</div>
		</>
	);
}

export default Home;
