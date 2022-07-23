import React from 'react';
import { render } from "react-dom";
import './index.css';
import Home from "./pages/home";
import DaftarJual from "./pages/daftarJual";
import InfoProfile from "./pages/infoProfile";
import InfoProduct from "./pages/infoProduct";
import Login from "./pages/login";
import Register from "./pages/register";
import Produk from "./pages/produk";
import UpdateProduct from "./pages/updateProduct";
import InfoPenawaran from "./pages/infoPenawaran";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";

const root = document.getElementById("root");
render(
	<Provider store={store}>
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/infoProfile/:id" element={<InfoProfile />} />
				<Route path="/infoProduct" element={<InfoProduct />} />
				<Route path="/updateProduct/:id" element={<UpdateProduct />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/produk/:id" element={<Produk />} />
				<Route path="/daftarJual/:id" element={<DaftarJual />} />
				<Route path="/infoPenawaran/:id" element={<InfoPenawaran />} />
			</Routes>
		</Router>
	</Provider>,
	root
);
