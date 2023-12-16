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
			url: `${serverUrl}/admin/photos/${id}`,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		}).then((response) => {
			if (response.status === 200) {
				setPhoto(response.data);
			}
		});
	}, [id]);
	console.log(photo);
	if (!photo) {
		return <div>Caricamento...</div>;
	}

	return (
		<div className="bg-[url('/background.jpg')] mt-[10vh] bg-fixed bg-cover bg-center min-h-screen">
			<div className="h-full w-[85vw] mt-[10vh] flex flex-col justify-start items-center text-gray-800">
				<h1 className="text-4xl mt-5 font-bold text-fuchsia-900 text-center mb-14">
					{photo.title}
				</h1>
				<div className="flex flex-wrap text-lg">
					<div className="w-full md:w-6/12">
						<img
							className="rounded-md border-2 border-teal-800 shadow-lg w-2xl transition delay-200 hover:scale-105"
							src={
								photo.image
									? `${serverUrl}/${photo.image.replace(/\\/g, "/")}`
									: `${serverUrl}/uploads/missing-image.jpg`
							}
							alt="Photo image"
						/>
					</div>
					<div className="w-full md:w-1/12"></div>
					<div className="w-full md:w-5/12 md:pl-4 text-stone-800">
						<p className="mb-6">
							<strong>Descrizione:</strong>{" "}
							<span className="text-teal-900">{photo.description}</span>
						</p>
						<p className="mb-1">
							<strong>Categorie:</strong>
						</p>
						<div className="flex flex-wrap">
							{photo.categories?.map((category, index) => (
								<span
									key={index}
									className="inline-block bg-teal-800 text-gray-100 text-xs px-2 py-1 rounded-full mr-2 my-2">
									{category.name}
								</span>
							))}
						</div>
					</div>
				</div>
				<div className="mt-14 flex justify-center">
					<Link
						to="/dashboard"
						className="px-3 py-2 rounded-md text-white bg-fuchsia-900 w-fit transition delay-150 hover:bg-fuchsia-700">
						Torna alla vista delle Foto
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Show;
