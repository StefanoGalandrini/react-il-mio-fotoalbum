import Navbar from "../components/Navbar";
import {useEffect} from "react";
import {useSearchGuest} from "../contexts/SearchContextGuest";
import PhotoCard from "../components/PhotoCard";
import Sidebar from "../components/Sidebar";

function Home() {
	const {photos, fetchFilteredPhotos} = useSearchGuest();

	// useEffect(() => {
	// 	fetchFilteredPhotos("");
	// }, [fetchFilteredPhotos]);

	return (
		<>
			<Sidebar />
			<div className="h-[90vh] w-[85vw] flex flex-col justify-start items-center text-gray-800 bg-fixed bg-cover bg-center bg-[url('/background.jpg')]">
				<h1 className="my-5 uppercase text-3xl">le nostre foto</h1>
				<div className="container flex flex-wrap justify-start items-stretch gap-5">
					{photos.map((photo) => (
						<PhotoCard key={photo.id} photo={photo} />
					))}
				</div>
			</div>
		</>
	);
}

export default Home;
