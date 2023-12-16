import {createContext, useContext, useState} from "react";
import fetchApi from "../utilities/fetchApi";

const SearchContext = createContext();

export const SearchProvider = ({children}) => {
	const [photos, setPhotos] = useState([]);

	const fetchFilteredPhotos = async (filter) => {
		try {
			const response = await fetchApi(`/admin/photos?title=${filter}`, "GET");
			setPhotos(response);
		} catch (error) {
			console.error("Errore nella richiesta filtrata delle foto:", error);
		}
	};

	return (
		<SearchContext.Provider value={{photos, setPhotos, fetchFilteredPhotos}}>
			{children}
		</SearchContext.Provider>
	);
};

export function useSearch() {
	return useContext(SearchContext);
}
