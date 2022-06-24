import React, { useState, useEffect } from "react";
import { NavbarLogin, NavbarDefault } from "../components/navbar";
import CarouselV2 from "../components/carouselv2";
import Products from "../components/products";
import FloatingButton from "../components/floatingButton";
import axios from "axios";


export default function HomeLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({});
	const [isRefresh, setIsRefresh] = useState(false);


  const [successResponse, setSuccessResponse] = useState({
		isSuccess: false,
		message: "",
	});

	const [errorResponse, setErrorResponse] = useState({
		isError: false,
		message: "",
	});

  useEffect(() => {
    const validateLogin = async () => {
      try {
        // Check status user login
        // 1. Get token from localStorage
        const token = localStorage.getItem("token");

        // 2. Check token validity from API
        const currentUserRequest = await axios.get(
          "http://localhost:2000/v1/auth/me",
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
		setIsRefresh(false);
  }, [isRefresh]);

  return isLoggedIn ? (<>
    <NavbarLogin></NavbarLogin>
    <CarouselV2></CarouselV2>
    <Products></Products>
    <FloatingButton></FloatingButton>
  </>
  ) : (<>
    <NavbarDefault></NavbarDefault>
    <CarouselV2></CarouselV2>
    <Products></Products>
    <FloatingButton></FloatingButton>
  </>);
}
