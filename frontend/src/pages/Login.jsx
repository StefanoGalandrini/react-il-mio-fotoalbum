import {useState} from "react";
import {useAuth} from "../contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {handleInputChange} from "../utilities/handleInputChange";

export default function Login() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const navigate = useNavigate();
	const {handleLoginOrRegistration} = useAuth();
	const [error, setError] = useState("");
	const serverUrl = "http://localhost:3000";

	async function handleSubmit(event) {
		event.preventDefault();
		setError(null);
		await axios({
			method: "post",
			url: `${serverUrl}/login`,
			data: formData,
		})
			.then((response) => {
				handleLoginOrRegistration(response.data);
				navigate("/dashboard");
			})
			.catch((error) => {
				setError(error.message);
			});
	}

	return (
		<div className="flex flex-col justify-center items-center w-screen h-screen">
			<h1 className="text-4xl mt-5 font-bold text-teal-300 text-center mb-14">
				Login
			</h1>
			<form
				onSubmit={handleSubmit}
				className="w-4/12 bg-black/70 shadow-md px-40 py-20 rounded-lg border-2 border-gray-200">
				{error && <div className="text-red-500 text-center">{error}</div>}{" "}
				<div className="mb-4">
					<label
						className="block text-violet-300 text-sm font-bold mb-2"
						htmlFor="email">
						Email
					</label>
					<input
						onChange={(e) => handleInputChange(e, "email", setFormData)}
						id="email"
						type="email"
						name="email"
						placeholder="Inserisci l'email"
						className="bg-gray-100 rounded w-full py-2 px-3 text-gray-700 border-2 border-transparent outline-none focus:border-2 focus:border-violet-500"
					/>
				</div>
				<div className="mb-6">
					<label
						className="block text-violet-300 text-sm font-bold mb-2"
						htmlFor="password">
						Password
					</label>
					<input
						onChange={(e) => handleInputChange(e, "password", setFormData)}
						className="bg-gray-100 autofill: rounded w-full py-2 px-3 text-gray-700 border-2 border-transparent outline-none focus:border-2 focus:border-violet-500"
						id="password"
						type="password"
						name="password"
						placeholder="Enter your password"
					/>
				</div>
				<div className="flex items-center justify-center">
					<button
						className="mt-5 px-3 py-2 rounded-md text-gray-200 bg-violet-500 w-fit transition duration-150 hover:bg-violet-300 hover:text-gray-800"
						type="submit">
						Login
					</button>
				</div>
			</form>
		</div>
	);
}
