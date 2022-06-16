import React from "react";
import Navbar from "../components/navbar";
import Carousel from "../components/carousel";
import Products from "../components/products";

export default function Home() {
	return (<>
  <Navbar></Navbar>
  <Carousel></Carousel>
  <Products></Products>
  </>);
}
