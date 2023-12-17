import {createContext, useContext, useState, useEffect} from "react";
import fetchApi from "../utilities/fetchApi";

const SearchContextGuest = createContext();

export const SearchProviderGuest = ({children}) => {
	const [photos, setPhotos] = useState([]);

	const fetchFilteredPhotos = async (filter) => {
		try {
			const response = await fetchApi(`/guests/photos?title=${filter}`, "GET");
			setPhotos(response);
		} catch (error) {
			console.error("Errore nella richiesta filtrata delle foto:", error);
		}
	};

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
