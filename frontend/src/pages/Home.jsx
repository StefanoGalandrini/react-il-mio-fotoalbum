import Navbar from "../components/Navbar.jsx";

function Home() {
	return (
		<div className="flex flex-col justify-center items-center text-gray-800 bg-fixed bg-cover bg-center h-screen bg-[url('/background.jpg')]">
			<div className="overflow-auto h-[85vh]">
				<h1 className="mt-20 uppercase text-2xl">HOME PUBBLICA</h1>
				<p className="mt-5 text-2xl text-fuchsia-600">
					per vedere tutte le foto visibili a tutti
				</p>
			</div>
		</div>
	);
}

export default Home;
