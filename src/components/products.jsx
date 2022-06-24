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
	const [category, setCategory] = useState([""]);
	// const categories = category ? `&category= ${category}` : "";



	useEffect(() => {
		const postData = async () => {
			const response = await axios.get(`http://localhost:2000/v1/products/search?isPublish=true&&isSold=false`);
			console.log(response);
			const data = await response.data.data.handle_get_all_product;
			console.log(data);

			setPost(data);
		};
		postData();
	}, []);

	const categories = category ? `&category=${category}` : "";

	useEffect(() => {
		const postData = async () => {
			const response = await axios.get(`http://localhost:2000/v1/products/search?isPublish=true&&isSold=false${categories}`);
			console.log(response);
			const data = await response.data.data.handle_get_all_product;
			console.log(data);

			setPost(data);
		};
		postData();
	}, [categories]);

	// useEffect(() => {

	// 	const categoryData = async () => {
	// 		const response = await axios.get(`http://localhost:2000/v1/products/search?isPublish=true&&isSold=false${categories}`);
	// 		// console.log(response);
	// 		const data = await response.data.data.handle_get_all_product;
	// 		// console.log(data);

	// 		setCategory(data);
	// 	};
	// 	categoryData();
	// }, [categories]);

	return (
		<Container className="pt-5" id="btn-category">
			<h5 className="fw-bold">Telusuri Kategori</h5>
			<div className="button-group">
				<Button onClick={() => setCategory(null)} className="me-4 radius-secondary bg-color-secondary border-0 active">
					<FiSearch className="me-1 mb-1" />
					Semua
				</Button>
				{/* {/* {category.map((c) =>  */}
				<Button onClick={() => setCategory("Fashion")} className="me-4 radius-secondary bg-color-secondary border-0">
					<FiSearch className="me-1 mb-1" /> Fashion
				</Button>
			</div>
			<Container className="mt-5">
				<Row md={6}>
					{post.map((post) =>
						<Col key={post.id} className="mb-4">
							<Card >
								<Card.Img variant="top" className="p-2" src={`http://localhost:2000/public/files/${post.picture}`} style={{ maxHeight: "100px", objectFit: "cover" }} />
								<Card.Body>
									<Card.Title className="fs-7 cut-text">{post.name}</Card.Title>
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
