import Navbar from "../components/Navbar";
import {useEffect} from "react";
import {useSearch} from "../contexts/SearchContext";
import PhotoCard from "../components/PhotoCard";
import Sidebar from "../components/Sidebar";
import {useAuth} from "../contexts/AuthContext";

function Dashboard() {
	const {photos, setPhotos, fetchFilteredPhotos} = useSearch();
	const {user} = useAuth();

	useEffect(() => {
		fetchFilteredPhotos("");
	}, []);

	function handlePhotoDelete(deletedPhotoId) {
		const updatedPhotos = photos.filter((p) => p.id !== deletedPhotoId);
		setPhotos(updatedPhotos);
	}

	return (
		<>
			<Sidebar />
			<div className="wrapper flex flex-col justify-start items-between">
				<h1 className="my-8 text-3xl text-teal-300 text-center">
					Ciao, {user.firstName} {user.lastName}
				</h1>
				<div className="flex flex-wrap justify-between items-start gap-7 mb-20">
					{photos.map((photo) => (
						<PhotoCard
							key={photo.id}
							photo={photo}
							onDelete={handlePhotoDelete}
						/>
					))}
				</div>
			</div>
		</>
	);
}

export default Dashboard;
