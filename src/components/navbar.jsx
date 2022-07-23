import {
	Button,
	Container,
	Form,
	Nav,
	Navbar,
	NavDropdown,
} from "react-bootstrap";
import { FiSearch, FiLogIn } from "react-icons/fi";
import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function navbar() {
	return (
		<>
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
					<Button
						className="ms-auto radius-secondary bg-color-primary border-0"
						variant="primary"
					>
						<FiLogIn className="me-1 mb-1" />
						Masuk
					</Button>
				</Container>
			</Navbar>

			{/* carousel */}
			<div class="owl-carousel owl-theme mt-5">
				<div class="item">
					<div class="">
						<img src="" alt="Foto produk" />
					</div>
				</div>
				<div class="item">
					<div class="">
						<img src="" alt="Foto produk" />
					</div>
				</div>
				<div class="item">
					<div class="">
						<img src="" alt="Foto produk" />
					</div>
				</div>
			</div>
			{/* carousel end */}
		</>
	);
}

export default navbar;
