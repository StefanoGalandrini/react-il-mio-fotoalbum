import {AuthProvider} from "./contexts/AuthContext";
import {SearchProvider} from "./contexts/SearchContext";
import {SearchProviderGuest} from "./contexts/SearchContextGuest";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProtectedRoute from "./middleware/AdminRoute";
import DefaultLayout from "./pages/DefaultLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CategoriesManage from "./pages/CategoriesManage";
import Create from "./pages/AddPhotoForm";
import AddPhotoForm from "./pages/AddPhotoForm";
import EditPhotoForm from "./pages/EditPhotoForm";
import Show from "./pages/Show";

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<SearchProvider>
					<SearchProviderGuest>
						<Routes>
							<Route path="/" element={<DefaultLayout />}>
								<Route index element={<Home />} />
								<Route path="login" element={<Login />} />

								{/* Rotte protette */}
								<Route element={<ProtectedRoute />}>
									<Route path="dashboard" element={<Dashboard />} />
									<Route
										path="categories-manage"
										element={<CategoriesManage />}
									/>
									<Route path="create" element={<Create />} />
									<Route path="add-photo" element={<AddPhotoForm />} />
									<Route path="show/:id" element={<Show />} />
									<Route path="edit-photo/:id" element={<EditPhotoForm />} />
								</Route>
							</Route>
						</Routes>
					</SearchProviderGuest>
				</SearchProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
