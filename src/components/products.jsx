import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import jam1 from "../assets/images/jam1.png";
import jam2 from "../assets/images/jam2.png";
import "../css/products.css"
// import Axios from "axios";

function Product() {
	const [post, setPost] = useState([]);

	useEffect(() => {
		const postData = async () => {
			const response = await axios.get(`https://fakestoreapi.com/products`);
			console.log(response);
			const data = await response.data;
			console.log(data);

			setPost(data);
		};
		postData();
	}, []);

	return (
		<Container className="pt-5" id="btn-category">
			<h5 className="fw-bold">Telusuri Kategori</h5>
			<div className="d-flex justify-content-start">
				<Button className="me-4 radius-secondary bg-color-secondary border-0 active">
					<FiSearch className="me-1 mb-1" />
					Semua
				</Button>
				<Button className="me-4 radius-secondary bg-color-secondary border-0">
					<FiSearch className="me-1 mb-1" />
					Hobi
				</Button>
				<Button className="me-4 radius-secondary bg-color-secondary border-0">
					<FiSearch className="me-1 mb-1" />
					Kendaraan
				</Button>
				<Button className="me-4 radius-secondary bg-color-secondary border-0">
					<FiSearch className="me-1 mb-1" />
					Baju
				</Button>
				<Button className="me-4 radius-secondary bg-color-secondary border-0">
					<FiSearch className="me-1 mb-1" />
					Elektronik
				</Button>
				<Button className="me-4 radius-secondary bg-color-secondary border-0">
					<FiSearch className="me-1 mb-1" />
					Kesehatan
				</Button>
			</div>
			<Container className="mt-5">
				<Row md={6}>
					{post.map((post) =>
						<Col key={post.id}>
							<Card >
								<Card.Img variant="top" className="p-2" src={post.image} style={{ maxHeight: "100px", objectFit: "cover" }} />
								<Card.Body>
									<Card.Title className="fs-7">{post.title}</Card.Title>
									<p className="text-black-50">{post.category}</p>
									<Card.Text>{post.price}</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					)}
					{/* <Col>
						<Card >
							<Card.Img variant="top" className="p-1" src={jam2} />
							<Card.Body>
								<Card.Title className="fs-7">Jam Tangan Casio</Card.Title>
								<p className="text-black-50">Aksesoris</p>
								<Card.Text>Rp. 250.000</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card >
							<Card.Img variant="top" className="p-1" src={jam1} />
							<Card.Body>
								<Card.Title className="fs-7">Jam Tangan Casio</Card.Title>
								<p className="text-black-50">Aksesoris</p>
								<Card.Text>Rp. 250.000</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card >
							<Card.Img variant="top" className="p-1" src={jam2} />
							<Card.Body>
								<Card.Title className="fs-7">Jam Tangan Casio</Card.Title>
								<p className="text-black-50">Aksesoris</p>
								<Card.Text>Rp. 250.000</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card >
							<Card.Img variant="top" className="p-1" src={jam1} />
							<Card.Body>
								<Card.Title className="fs-7">Jam Tangan Casio</Card.Title>
								<p className="text-black-50">Aksesoris</p>
								<Card.Text>Rp. 250.000</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card >
							<Card.Img variant="top" className="p-1" src={jam2} />
							<Card.Body>
								<Card.Title className="fs-7">Jam Tangan Casio</Card.Title>
								<p className="text-black-50">Aksesoris</p>
								<Card.Text>Rp. 250.000</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				</Row>
				<Row md={6}className="mt-2">
					<Col>
						<Card >
							<Card.Img variant="top" className="p-1" src={jam1} />
							<Card.Body>
								<Card.Title className="fs-7">Jam Tangan Casio</Card.Title>
								<p className="text-black-50">Aksesoris</p>
								<Card.Text>Rp. 250.000</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card >
							<Card.Img variant="top" className="p-1" src={jam2} />
							<Card.Body>
								<Card.Title className="fs-7">Jam Tangan Casio</Card.Title>
								<p className="text-black-50">Aksesoris</p>
								<Card.Text>Rp. 250.000</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card >
							<Card.Img variant="top" className="p-1" src={jam1} />
							<Card.Body>
								<Card.Title className="fs-7">Jam Tangan Casio</Card.Title>
								<p className="text-black-50">Aksesoris</p>
								<Card.Text>Rp. 250.000</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card >
							<Card.Img variant="top" className="p-1" src={jam2} />
							<Card.Body>
								<Card.Title className="fs-7">Jam Tangan Casio</Card.Title>
								<p className="text-black-50">Aksesoris</p>
								<Card.Text>Rp. 250.000</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card >
							<Card.Img variant="top" className="p-1" src={jam1} />
							<Card.Body>
								<Card.Title className="fs-7">Jam Tangan Casio</Card.Title>
								<p className="text-black-50">Aksesoris</p>
								<Card.Text>Rp. 250.000</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card >
							<Card.Img variant="top" className="p-1" src={jam2} />
							<Card.Body>
								<Card.Title className="fs-7">Jam Tangan Casio</Card.Title>
								<p className="text-black-50">Aksesoris</p>
								<Card.Text>Rp. 250.000</Card.Text>
							</Card.Body>
						</Card>
					</Col> */}
				</Row>
			</Container>
		</Container>
	);
}

export default Product;
