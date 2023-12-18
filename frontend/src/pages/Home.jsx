import Navbar from "../components/Navbar";
import {useEffect} from "react";
import {useSearchGuest} from "../contexts/SearchContextGuest";
import PhotoCard from "../components/PhotoCard";
import Sidebar from "../components/Sidebar";
import Carousel from "../components/Carousel";

function Home() {
	const {photos, setPhotos, fetchFilteredPhotos} = useSearchGuest();

	useEffect(() => {
		fetchFilteredPhotos("");
	}, []);

	return (
		<>
			<Sidebar />
			<div className="wrapper flex flex-col justify-start items-center ">
				<h1 className="my-8 text-3xl text-teal-300 text-center">
					Le nostre foto
				</h1>

				<Carousel images={photos} />

				<div className="flex flex-wrap justify-center items-start gap-7 mb-20">
					{photos.map((photo) => (
						<PhotoCard key={photo.id} photo={photo} />
					))}
				</div>
			</div>
		</>
	);
}

export default Home;
