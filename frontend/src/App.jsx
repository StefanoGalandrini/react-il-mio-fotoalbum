import {AuthProvider} from "./contexts/AuthContext";
import {SearchProvider} from "./contexts/SearchContext";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProtectedRoute from "./middleware/AdminRoute";
import DefaultLayout from "./pages/DefaultLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CategoriesManage from "./pages/CategoriesManage";

function App() {
	return (
		<>
			<BrowserRouter>
				<AuthProvider>
					<SearchProvider>
						<Routes>
							<Route element={<DefaultLayout />}>
								<Route index path="/" element={<Home />} />
								<Route path="/login" element={<Login />} />
								{/* <Route path="/register" element={<Register />} /> */}
								<Route element={<ProtectedRoute />}>
									<Route path="/dashboard" element={<Dashboard />} />
									<Route
										path="/categories-manage"
										element={<CategoriesManage />}
									/>
									{/* <Route path="/create" element={<Blog />} />
								<Route path="/blog/:slug" element={<Show />} /> */}
								</Route>
							</Route>
						</Routes>
					</SearchProvider>
				</AuthProvider>
			</BrowserRouter>
		</>
	);
}

export default App;
