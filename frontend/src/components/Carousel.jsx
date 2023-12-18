import {useState, useEffect} from "react";

function Carousel({images}) {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (currentIndex >= images.length) {
			setCurrentIndex(0);
		}

		const intervalId = setInterval(() => {
			setCurrentIndex((prevIndex) =>
				getValidIndex(prevIndex + 1, images.length),
			);
		}, 2000);

		return () => clearInterval(intervalId);
	}, [currentIndex, images]);

	function getValidIndex(index, maxIndex) {
		if (index < 0) {
			return maxIndex - 1;
		} else if (index >= maxIndex) {
			return 0;
		} else {
			return index;
		}
	}

	if (images.length === 0) {
		return <div>Caricamento immagini...</div>;
	}

	const prevIndex = getValidIndex(currentIndex - 1, images.length);
	const nextIndex = getValidIndex(currentIndex + 1, images.length);

	return (
		<div className="relative w-full flex justify-center items-center overflow-hidden mb-8">
			{images.length > 1 && (
				<img
					src={`http://localhost:3000/${images[prevIndex]?.image.replace(
						/\\/g,
						"/",
					)}`}
					alt={images[prevIndex]?.title}
					className="w-1/6 rounded-lg border-2 border-teal-300 scale-75 opacity-50"
				/>
			)}
			{images[currentIndex] && (
				<img
					src={`http://localhost:3000/${images[currentIndex]?.image.replace(
						/\\/g,
						"/",
					)}`}
					alt={images[currentIndex]?.title}
					className="w-1/6 rounded-lg border-2 border-teal-300 opacity-100 scale-100"
				/>
			)}
			{images.length > 1 && (
				<img
					src={`http://localhost:3000/${images[nextIndex]?.image.replace(
						/\\/g,
						"/",
					)}`}
					alt={images[nextIndex]?.title}
					className="w-1/6 rounded-lg border-2 border-teal-300 scale-75 opacity-50"
				/>
			)}
		</div>
	);
}

export default Carousel;
