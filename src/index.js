import React from "react";
import { render } from "react-dom";
import "./index.css";
import Home from "./pages/home";
import DaftarJual from "./pages/daftarJual";
import InfoProfile from "./pages/infoProfile";
import InfoProduct from "./pages/infoProduct";
import Login from "./pages/login";
import Register from "./pages/register";
import Produk from "./pages/produk";
import UpdateProduct from "./pages/updateProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const root = document.getElementById("root");
render(
	<Router>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/infoProfile/:id" element={<InfoProfile />} />
			<Route path="/infoProduct" element={<InfoProduct />} />
			<Route path="/updateProduct/:id" element={<UpdateProduct />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/products/:id" element={<Produk />} />
			<Route path="/daftarJual/:id" element={<DaftarJual />} />
		</Routes>
	</Router>,
	root
);
