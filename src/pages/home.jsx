import React from "react";
import Navbar from "../components/navbar";
import Carousel from "../components/carousel";
import Products from "../components/products";
import FloatingButton from "../components/floatingButton";


export default function Home() {
	return (<>
  <Navbar></Navbar>
  <Carousel></Carousel>
  <Products></Products>
  <FloatingButton></FloatingButton>
  </>);
}
