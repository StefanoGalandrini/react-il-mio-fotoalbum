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
		<div className="flex flex-col justify-center items-center w-screen h-screen">
			<h1 className="text-4xl mt-5 font-bold text-teal-300 text-center mb-14">
				Login
			</h1>
			<form
				onSubmit={handleSubmit}
				className="w-4/12 bg-violet-200 shadow-md px-40 py-20 rounded-lg">
				{error && <div className="text-red-500 text-center">{error}</div>}{" "}
				<div className="mb-4">
					<label
						className="block text-gray-800 text-sm font-bold mb-2"
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
						className="block text-gray-800 text-sm font-bold mb-2"
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
						className="mt-5 px-3 py-2 rounded-md text-gray-300 bg-violet-800 w-fit transition duration-150 hover:bg-violet-600 hover:text-white"
						type="submit">
						Login
					</button>
				</div>
			</form>
		</div>
	);
}
