import React from "react";
import {NavbarLogin} from "../components/navbar";
import Carousel from "../components/carousel";
import Products from "../components/products";
import FloatingButton from "../components/floatingButton";


export default function HomeLogin() {
	return (<>
  <NavbarLogin></NavbarLogin>
  <Carousel></Carousel>
  <Products></Products>
  <FloatingButton></FloatingButton>
  </>);
}
