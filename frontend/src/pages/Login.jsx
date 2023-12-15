import {useState} from "react";
import {useAuth} from "../contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import fetchApi from "../utilities/fetchApi";
import {handleInputChange} from "../utilities/handleInputChange";

export default function Login() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const navigate = useNavigate();
	const {handleLoginOrRegistration} = useAuth();
	const [error, setError] = useState("");

	async function handleSubmit(event) {
		event.preventDefault();
		setError(null);
		try {
			const response = await fetchApi("/login", "POST", formData);
			handleLoginOrRegistration(response);
			navigate("/dashboard");
		} catch (error) {
			setError(error.message);
		}
	}

	return (
		<div className="flex justify-center items-center h-screen">
			<form
				onSubmit={handleSubmit}
				className="bg-gray-300 shadow-md rounded px-8 pt-6 pb-8 mb-4">
				{error && <div className="text-red-500 text-center">{error}</div>}{" "}
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="email">
						Email
					</label>
					<input
						onChange={(e) => handleInputChange(e, "email", setFormData)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="email"
						type="email"
						name="email"
						placeholder="Enter your email"
					/>
				</div>
				<div className="mb-6">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="password">
						Password
					</label>
					<input
						onChange={(e) => handleInputChange(e, "password", setFormData)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="password"
						type="password"
						name="password"
						placeholder="Enter your password"
					/>
				</div>
				<div className="flex items-center justify-center">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit">
						Login
					</button>
				</div>
			</form>
		</div>
	);
}
