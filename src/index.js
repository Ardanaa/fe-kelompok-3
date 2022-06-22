import React from 'react';
import { render } from "react-dom";
import './index.css';
import Home from "./pages/home";
import DaftarJual from "./pages/daftarJual";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = document.getElementById("root");
render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/daftarJual" element={<DaftarJual />} />
    </Routes>
  </Router>,
  root
);
