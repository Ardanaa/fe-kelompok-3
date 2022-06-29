import {
	Button,
	Container,
	Form,
	Nav,
	Navbar,
	Popover,
	OverlayTrigger
} from "react-bootstrap";
import { FiLogIn, FiList, FiBell, FiUser, FiLogOut } from "react-icons/fi";
import React, { useState, useEffect} from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import "../css/navbar.css"

export function NavbarDefault() {
	return (
		<Navbar className="box-shadow " bg="light" expand="lg">
			<Container className="py-1">
				<Navbar.Brand
					href="#"
					className="brand bg-color-primary"
				></Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav
						className="me-auto my-2 my-lg-0"
						style={{ maxHeight: "100px" }}
						navbarScroll
					>
						<Form className="d-flex">
							<Form.Control
								type="search"
								placeholder="Cari di sini ... "
								className="search radius-primary"
								aria-label="Search"
							/>
						</Form>
					</Nav>
				</Navbar.Collapse>
				<Link
					to="/login"
				>
					<Button
						className="ms-auto radius-secondary bg-color-primary border-0"
						variant="primary"
					>
						<FiLogIn className="me-1 mb-1" />
						Masuk
					</Button>
				</Link>
			</Container>
		</Navbar>
	);
};

export function NavbarLogin() {
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
	}, []);
	const logout = () => {
		localStorage.removeItem("token");

		setIsLoggedIn(false);
		setUser({});
	};
	
	const popover = (
		<Popover id="popover-basic">
			<Popover.Header >
				<div className="popover-profile d-flex align-items-center">
				<img src={`http://localhost:2000/public/files/${user.picture}`} alt="" />
				<p className="my-auto">{user.name}</p>
				</div>
			</Popover.Header>
			<Popover.Body>
					<Button className="bg-color-primary border-0" href="/" onClick={(e) => logout(e)}> <FiLogOut className=" mb-1" /> Log Out </Button>
			</Popover.Body>
		</Popover>
	);
	console.log(user)


	return (
		<Navbar className="box-shadow " bg="light" expand="lg">
			<Container className="py-1">
				<Navbar.Brand
					href="#"
					className="brand bg-color-primary"
				></Navbar.Brand>
				<Nav
					className="me-auto my-2 my-lg-0"
					style={{ maxHeight: "100px" }}
					navbarScroll
				>
					<Form className="d-flex">
						<Form.Control
							type="search"
							placeholder="Cari di sini ... "
							className="search radius-primary"
							aria-label="Search"
						/>
					</Form>
				</Nav>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav className="ms-auto">
						<Button variant="light"> <FiList className=" mb-1" />  </Button>
						<Button variant="light"> <FiBell className=" mb-1" />  </Button>
						<OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
							<Button variant="light"> <FiUser className=" mb-1" />  </Button>
						</OverlayTrigger>


					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export function NavbarInfo() {
	return (
		<Navbar className="box-shadow " bg="light" expand="lg">
			<Container className="py-1 ">
				<Navbar.Brand
					href="#"
					className="brand bg-color-primary"
				></Navbar.Brand>
				<p className="navbar-info fw-bold">Lengkapi Info Akun</p>
			</Container>
		</Navbar>
	);
};

export function NavbarProduct() {
	return (
		<Navbar className="box-shadow " bg="light" expand="lg">
			<Container className="py-1 ">
				<Navbar.Brand
					href="#"
					className="brand bg-color-primary"
				></Navbar.Brand>
			</Container>
		</Navbar>
	);
};
