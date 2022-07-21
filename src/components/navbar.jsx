import {
	Button,
	Container,
	Form,
	Nav,
	Navbar,
	Popover,
	OverlayTrigger,
	Row,
	Stack,
	Offcanvas
} from "react-bootstrap";
import { FiLogIn, FiList, FiBell, FiUser, FiLogOut } from "react-icons/fi";
import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import "../css/navbar.css"
import { useDispatch } from "react-redux";
import { addUser } from "../slices/userSlice";
import CurrencyFormatter from "../assets/CurrencyFormatter.js";
import dateFormat from "dateformat";

export function NavbarDefault() {
	return (
		<Navbar className="box-shadow " bg="light" expand="lg">
			<Container className="py-1">
				<Navbar.Brand
					id="navbar-brand"
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
	const [notif, setNotif] = useState([]);
	const [notifStatus, setNotifStatus] = useState([]);
	const dispatch = useDispatch();


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
					dispatch(
						addUser({
							user: currentUserResponse.data.user,
							token: token,
						})
					);
					localStorage.setItem("user", JSON.stringify(currentUserResponse.data.user))
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

	useEffect(() => {
		const notifData = async () => {
			try {

				const token = localStorage.getItem("token");
				const user_local = localStorage.getItem("user");
				const user = JSON.parse(user_local);
				// console.log(JSON.parse(user));
				const response = await axios.get(`http://localhost:2000/v1/transactions/notification/${user.id}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				console.log(response);
				const data = await response.data.data.get_transaction_notification;
				console.log(data);
				const dataStatus = await response.data.message;
				console.log(dataStatus);
				setNotif(data);
				setNotifStatus(dataStatus);
			} catch (err) {
				console.log(err);
			}
		};
		notifData();
	}, []);

	const popoverUser = (
		<Popover id="popover-basic">
			<Popover.Header >
				<div className="popover-profile d-flex align-items-center">
					<img src={`${user.picture}`} alt="" />
					<p className="my-auto">{user.name}</p>
				</div>
			</Popover.Header>
			<Popover.Body>
				<Button className="bg-color-primary border-0" href="/" onClick={(e) => logout(e)}> <FiLogOut className=" mb-1" /> Log Out </Button>
			</Popover.Body>
		</Popover>
	);

	const popoverNotif = (
		<Popover id="popover-basic" className="box-shadow radius-primary" style={{ maxWidth: "376px" }}>
			<Popover.Header className="radius-primary bg-white border-0">
				{notif.map((notif) =>
					user.id === notif.owner_id ? (
						<Row className="mb-0">
                <Link className="text-decoration-none text-black" to={`/infoPenawaran/${notif.id}`}>
							<Stack direction="horizontal" gap={3}>
								<img src={`${notif.Product.picture}`} alt=""
									style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "12px" }} />
								<Stack>
									<p className="m-0 text-black-50">Penawaran Produk</p>
									<p className="m-0 text-black">{notif.Product.name}</p>
									<p className="m-0 text-black">{CurrencyFormatter(notif.Product.price)}</p>
									<p className="m-0 text-black">Ditawar {CurrencyFormatter(notif.requestedPrice)}</p>
								</Stack>
								<Stack>
									<p className="m-0 ms-auto text-black-50 fs-8">{dateFormat(notif.createdAt, "d mmm, h:MM")}</p>
								</Stack>
							</Stack>
							</Link>
							<hr />
						</Row>
					) : ("")).reverse()
				}
			</Popover.Header>
		</Popover>
	);

	return (
		<Navbar className="box-shadow " bg="light" expand="lg">
			<Container className="py-1">
				<Navbar.Brand
					id="navbar-brand"
					href="/"
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
				<Navbar.Toggle aria-controls={`offcanvasNavbar-expand-expand`} />
				<Navbar.Offcanvas
					id={`offcanvasNavbar-expand-expand`}
					aria-labelledby={`offcanvasNavbarLabel-expand-expand`}
					placement="start"
				>
					<Offcanvas.Header closeButton>
						<Offcanvas.Title id={`offcanvasNavbarLabel-expand-expand`}>
							Offcanvas
						</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<Nav className="justify-content-end flex-grow-1 pe-3">
							<Link to={`/daftarJual/${user.id}`}>
								<Button variant="light"> <FiList className=" mb-1" />  </Button>
							</Link>
							<OverlayTrigger trigger="click" placement="bottom" overlay={popoverNotif}>
								<Button variant="light"> <FiBell className=" mb-1" />  </Button>
							</OverlayTrigger>
							<OverlayTrigger trigger="click" placement="bottom" overlay={popoverUser}>
								<Button variant="light"> <FiUser className=" mb-1" />  </Button>
							</OverlayTrigger>
						</Nav>
					</Offcanvas.Body>
				</Navbar.Offcanvas>
				{/* <Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav className="ms-auto">
						<Link to={`/daftarJual/${user.id}`}>
							<Button variant="light"> <FiList className=" mb-1" />  </Button>
						</Link>
						<OverlayTrigger trigger="click" placement="bottom" overlay={popoverNotif}>
							<Button variant="light"> <FiBell className=" mb-1" />  </Button>
						</OverlayTrigger>
						<OverlayTrigger trigger="click" placement="bottom" overlay={popoverUser}>
							<Button variant="light"> <FiUser className=" mb-1" />  </Button>
						</OverlayTrigger>
					</Nav>
				</Navbar.Collapse> */}
			</Container>
		</Navbar>
	);
};

export function NavbarInfo() {
	return (
		<Navbar className="box-shadow nav-info" bg="light" expand="lg">
			<Container className="py-1 ">
				<Navbar.Brand
					id="navbar-brand"
					href="/"
					className="brand bg-color-primary"
				></Navbar.Brand>
				<p className="navbar-info fw-bold">Lengkapi Info Akun</p>
			</Container>
		</Navbar>
	);
};

export function NavbarProduct() {
	return (
		<Navbar className="box-shadow nav-product" bg="light" expand="lg">
			<Container className="py-1 ">
				<Navbar.Brand
					id="navbar-brand"
					href="/"
					className="brand bg-color-primary"
				></Navbar.Brand>
			</Container>
		</Navbar>
	);
};

export function NavbarPenawaran() {
	return (
		<Navbar className="box-shadow " bg="light" expand="lg">
			<Container className="py-1 ">
				<Navbar.Brand
					id="navbar-brand"
					href="/"
					className="brand bg-color-primary"
				></Navbar.Brand>
				<p className="navbar-info fw-bold">Info Penawaran</p>
			</Container>
		</Navbar>
	);
};