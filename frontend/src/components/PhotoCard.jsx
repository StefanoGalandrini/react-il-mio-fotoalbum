import {Navigate, useNavigate} from "react-router-dom";

function Card({photo, showAll}) {
	const navigate = useNavigate();
	const show = () => navigate(`/show/${photo.id}`);
	/* if (!showAll && !photo.visible) {
		return null;
	} */
	const imageUrl =
		import.meta.env.VITE_API_URL + "/" + photo.image.replace(/\\/g, "/");
	return (
		<div className=" max-w-md transition transform hover:scale-105 duration-300">
			<div className="bg-gray-100 flex-1 rounded-lg overflow-hidden shadow-md shadow-slate-800 border-2 border-teal-800">
				<img
					src={imageUrl}
					alt={photo.title}
					className="w-full"
					onClick={show}
				/>
				<div className="p-4">
					<h5 className="text-xl text-center mb-3 font-bold text-teal-800">
						{photo.title}
					</h5>
					<p className="text-center italic mb-4">{photo.description}</p>
					<div className="flex gap-2 justify-center">
						{photo.categories.map((category, index) => (
							<span
								key={index}
								className="bg-amber-700 text-gray-100 text-xs rounded-full px-3 py-1">
								{category.name}
							</span>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Card;
