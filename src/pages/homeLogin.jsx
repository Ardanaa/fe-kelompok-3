import React, {useState, useEffect} from "react";
import {NavbarLogin, NavbarDefault} from "../components/navbar";
import Carousel from "../components/carousel";
import Products from "../components/products";
import FloatingButton from "../components/floatingButton";
import axios from "axios";


export default function HomeLogin() {
	const [isLoggedIn, setIsLoggedIn] = useState(true);
	const [user, setUser] = useState({});


  useEffect(() => {
		const validateLogin = async () => {
			try {
				// Check status user login
				// 1. Get token from localStorage
				const token = localStorage.getItem("token");

				// 2. Check token validity from API
				const currentUserRequest = await axios.get(
					"http://localhost:2000/auth/me",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				const currentUserResponse = currentUserRequest.data;

				if (currentUserResponse.status) {
					setUser(currentUserResponse.data.user);
				}
			} catch (err) {
				setIsLoggedIn(false);
			}
		};

    validateLogin();
	}, []);

	return isLoggedIn ? (<>
  <NavbarDefault></NavbarDefault>
  <Carousel></Carousel>
  <Products></Products>
  <FloatingButton></FloatingButton>
  </>
  ) : (<>
    <NavbarLogin></NavbarLogin>
    <Carousel></Carousel>
    <Products></Products>
    <FloatingButton></FloatingButton>
  </>);
}
