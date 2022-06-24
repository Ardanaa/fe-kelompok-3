import React from "react";
import { render } from "react-dom";
import "./index.css";
import Home from "./pages/home";
import InfoProduct from "./pages/infoProduct";
import Login from './pages/login';
import Register from "./pages/register";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = document.getElementById("root");
render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/infoProduct" element={<InfoProduct />} />
      <Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
    </Routes>
  </Router>,
  root
);
