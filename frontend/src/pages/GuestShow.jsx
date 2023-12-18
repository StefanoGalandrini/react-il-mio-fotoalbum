import {useEffect, useState} from "react";
import Navbar from "../components/Navbar.jsx";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import axios from "axios";

function Show() {
	const {id} = useParams();
	const [photo, setPhoto] = useState(null);
	const serverUrl = "http://localhost:3000";

	useEffect(() => {
		axios({
			method: "GET",
			url: `${serverUrl}/guests/photos/${id}`,
			headers: {
				"Content-Type": "application/json",
			},
		}).then((response) => {
			if (response.status === 200) {
				setPhoto(response.data);
			}
		});
	}, [id]);
	if (!photo) {
		return <div>Caricamento...</div>;
	}

	return (
		<div className="h-full w-[70vw] mx-auto mt-[10vh] flex flex-col justify-start items-center text-gray-800">
			<h1 className="text-4xl mt-5 font-bold text-teal-300 text-center mb-14">
				{photo.title}
			</h1>
			<div className="flex flex-wrap text-lg">
				<div className="w-full md:w-7/12">
					<img
						className="max-w-full w-10/12 rounded-md border-2 border-violet-300 w-2xl transition duration-200 hover:scale-105"
						src={
							photo.image
								? `${serverUrl}/${photo.image.replace(/\\/g, "/")}`
								: `${serverUrl}/uploads/missing-image.jpg`
						}
						alt="Photo image"
					/>
				</div>
				<div className="w-full md:w-1/12"></div>
				<div className="w-full md:w-4/12">
					<p className="mb-2 font-bold text-teal-300">Descrizione:</p>
					<p className="mb-8 text-gray-100 font-medium italic">
						{photo.description}
					</p>

					<p className="mb-2 font-bold text-teal-300">Categorie:</p>
					<div className="mb-8 flex flex-wrap">
						{photo.categories?.map((category, index) => (
							<span
								key={index}
								className="inline-block bg-violet-300 text-gray-800 text-sm px-2 py-1 rounded-full mr-2 my-2">
								{category.name}
							</span>
						))}
					</div>
				</div>
			</div>
			<div className="mt-14 flex justify-center">
				<Link
					to="/"
					className="px-3 py-2 rounded-md text-gray-100 bg-teal-600 w-fit transition duration-150 hover:bg-teal-300 hover:text-gray-900">
					Torna alla vista delle Foto
				</Link>
			</div>
		</div>
	);
}

export default Show;
