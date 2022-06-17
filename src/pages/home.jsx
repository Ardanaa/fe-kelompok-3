import React from "react";
import {NavbarDefault} from "../components/navbar";
import Carousel from "../components/carousel";
import Products from "../components/products";
import FloatingButton from "../components/floatingButton";


export default function Home() {
	return (<>
  <NavbarDefault></NavbarDefault>
  <Carousel></Carousel>
  <Products></Products>
  <FloatingButton></FloatingButton>
  </>);
}
