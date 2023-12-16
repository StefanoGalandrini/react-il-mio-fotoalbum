import Navbar from "../components/Navbar";
import {useEffect} from "react";
import {useSearch} from "../contexts/SearchContext";
import PhotoCard from "../components/PhotoCard";
import Sidebar from "../components/Sidebar";

function Dashboard() {
	const {photos, setPhotos, fetchFilteredPhotos} = useSearch();

	useEffect(() => {
		fetchFilteredPhotos("");
	}, []);

	function handlePhotoDelete(deletedPhotoId) {
		const updatedPhotos = photos.filter((p) => p.id !== deletedPhotoId);
		setPhotos(updatedPhotos);
	}

	return (
		<>
			<div className="bg-[url('/background.jpg')] mt-[10vh] bg-fixed bg-cover bg-center min-h-screen">
				<Sidebar />
				<div className="h-full w-[88vw] mx-auto mt-[10vh] flex flex-col justify-center items-center text-gray-800">
					<h1 className="my-8 uppercase text-3xl">le nostre foto</h1>

					<div className="container flex flex-wrap justify-start items-stretch gap-5 mb-20">
						{photos.map((photo) => (
							<PhotoCard
								key={photo.id}
								photo={photo}
								onDelete={handlePhotoDelete}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default Dashboard;
