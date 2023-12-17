import {createContext, useContext, useState} from "react";
import axios from "axios";

const SearchContext = createContext();
const serverUrl = "http://localhost:3000";

export const SearchProvider = ({children}) => {
	const [photos, setPhotos] = useState([]);

	async function fetchFilteredPhotos(filter) {
		await axios({
			method: "GET",
			url: `${serverUrl}/admin/photos?title=${filter}`,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((response) => {
				setPhotos(response.data);
			})
			.catch((error) => {
				console.error("Errore nella richiesta filtrata delle foto:", error);
			});
	}

	return (
		<SearchContext.Provider value={{photos, setPhotos, fetchFilteredPhotos}}>
			{children}
		</SearchContext.Provider>
	);
};

export function useSearch() {
	return useContext(SearchContext);
}
