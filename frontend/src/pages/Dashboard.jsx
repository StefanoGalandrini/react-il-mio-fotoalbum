import Navbar from "../components/Navbar.jsx";

function Dashboard() {
	return (
		<div className="flex flex-col justify-center items-center text-white bg-fixed bg-cover bg-center h-screen bg-[url('/background.jpg')]">
			<div className="overflow-auto h-[85vh]">
				<img className="w-[13rem]" src="/logo.png" alt="" />

				<h1 className="mt-20 uppercase text-2xl">
					Il Blog delle scelte sbagliate
				</h1>
				<p className="mt-5 text-2xl text-fuchsia-600">
					soprattutto quelle di vita
				</p>
				<p className="mt-3 text-xl">
					...quando ti rendi conto che imparare la programmazione è bello fino
					ai 25 anni massimo...
				</p>
				<p className="mt-10 text-stone-400 underline">
					Clicca su "Blog" e guarda la lista degli articoli per sfogarti un po'
				</p>
			</div>
		</div>
	);
}

export default Dashboard;
