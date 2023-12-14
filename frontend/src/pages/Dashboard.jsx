import Navbar from "../components/Navbar.jsx";
import {useAuth} from "../contexts/AuthContext.jsx";

function Dashboard() {
	const auth = useAuth();
	const user = auth.user;
	console.log(user);

	return (
		<div className="flex flex-col justify-center items-center text-gray-800 bg-fixed bg-cover bg-center h-screen bg-[url('/background.jpg')]">
			<div className="overflow-auto h-[85vh]">
				<h1 className="mt-20 uppercase text-2xl">DASHBOARD</h1>
				<div className="mt-5 text-2xl text-fuchsia-600">
					<p>
						Benvenuto,
						{user.firstName} {user.lastName}
					</p>
					<ul>
						<li>vedere tutte le foto inserite (filtrabili)</li>
						<li>vedere i dettagli di una singola foto</li>
						<li>aggiungerne di nuove (con validazione)</li>
						<li>modificarle (con validazione)</li>
						<li>cancellarle</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
