async function fetchApi(path, method = "GET", body = null)
{
	console.log(import.meta.env.VITE_API_URL + path);
	try
	{
		const resp = await fetch(import.meta.env.VITE_API_URL + path, {
			method,
			headers: {
				"Content-Type": body instanceof FormData ? null : "application/json",
				"Authorization": localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : null,
			},
			body: body ? JSON.stringify(body) : null,
		});

		const data = await resp.json();

		if (!resp.ok)
		{

			if (data.error === "TokenExpiredError" || data.error === "AuthError")
			{
				localStorage.removeItem("token");
				window.location = "/login";
			}
			console.log(data);
			throw new Error(data.error ?? "A causa di un errore non è possibile eseguire l'operazione richiesta.");
		}

		return data;
	} catch (err)
	{

		throw err;
	}
}

export default fetchApi;
