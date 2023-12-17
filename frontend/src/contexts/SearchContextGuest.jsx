import {createContext, useContext, useState, useEffect} from "react";
import axios from "axios";

const SearchContextGuest = createContext();
const serverUrl = "http://localhost:3000";

export const SearchProviderGuest = ({children}) => {
	const [photos, setPhotos] = useState([]);

	async function fetchFilteredPhotos(filter) {
		await axios({
			method: "GET",
			url: `${serverUrl}/guests/photos?title=${filter}`,
		})
			.then((response) => {
				setPhotos(response.data);
			})
			.catch((error) => {
				console.error("Errore nella richiesta filtrata delle foto:", error);
			});
	}

	return (
		<SearchContextGuest.Provider
			value={{photos, setPhotos, fetchFilteredPhotos}}>
			{children}
		</SearchContextGuest.Provider>
	);
};

export function useSearchGuest() {
	return useContext(SearchContextGuest);
}
