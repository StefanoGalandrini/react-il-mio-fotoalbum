import {createContext, useContext, useState, useEffect} from "react";
import fetchApi from "../utilities/fetchApi";

const SearchContextGuest = createContext();

export const SearchProviderGuest = ({children}) => {
	const [photos, setPhotos] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	const fetchFilteredPhotos = async (filter) => {
		try {
			const response = await fetchApi(`/guests/photos?title=${filter}`, "GET");
			setPhotos(response);
		} catch (error) {
			console.error("Errore nella richiesta filtrata delle foto:", error);
		}
	};

	useEffect(() => {
		fetchFilteredPhotos(searchTerm);
	}, [searchTerm]);

	return (
		<SearchContextGuest.Provider value={{photos, setSearchTerm}}>
			{children}
		</SearchContextGuest.Provider>
	);
};

export function useSearchGuest() {
	return useContext(SearchContextGuest);
}
