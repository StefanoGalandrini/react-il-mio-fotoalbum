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
			<div className="bg-[url('/background.jpg')] mt-[10vh] bg-fixed bg-cover bg-center min-h-screen">
				<Sidebar />
				<div className="h-full w-[88vw] mx-auto mt-[10vh] flex flex-col justify-center items-center text-gray-800">
					<h1 className="my-5 uppercase text-3xl">le nostre foto</h1>
					<div className="container flex flex-wrap justify-start items-stretch gap-5">
						{photos.map((photo) => (
							<PhotoCard key={photo.id} photo={photo} />
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
