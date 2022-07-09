import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import "../css/products.css"
import { Link } from "react-router-dom";
import CurrencyFormatter from "../assets/CurrencyFormatter.js";

function Product() {
	const [post, setPost] = useState([]);
	const [category, setCategory] = useState([""]);

	const categories = category ? `&category=${category}` : "";

	useEffect(() => {
		const postData = async () => {
			const response = await axios.get(`http://localhost:2000/v1/products/search?isPublish=true&&isSold=false${categories}`);
			console.log(response);
			const data = await response.data.data.get_all_product;
			console.log(data);

			setPost(data);
		};
		postData();
	}, [categories]);
	
	return (
		<Container className="pt-5" id="btn-category">
			<h5 className="fw-bold">Telusuri Kategori</h5>
			<div className="button-group">
				<Button onClick={() => setCategory(null)} className="me-4 radius-secondary bg-color-secondary border-0">
					<FiSearch className="me-1 mb-1" />
					Semua
				</Button>
				{/* {/* {category.map((c) =>  */}
				<Button onClick={() => setCategory("fashion")} className="me-4 radius-secondary bg-color-secondary border-0">
					<FiSearch className="me-1 mb-1" /> Fashion
				</Button>
			</div>
			<Container id="products" className="mt-5">
				<Row md={6}>
					{post.map((post) =>
						<Col md={2} key={post.id} className="mb-3 p-2" >
							<Link className="text-decoration-none text-black" to={`/produk/${post.id}`}>
								<Card >
									<Card.Img variant="top" className="p-2" src={`http://localhost:2000/public/files/${post.picture}`} style={{ maxHeight: "100px", objectFit: "cover" }} />
									<Card.Body>
										<Card.Title className="fs-7 ">{post.name}</Card.Title>
										<p className="text-black-50 fs-8  mb-0">{post.category}</p>
										<Card.Text className="fs-7 "> {CurrencyFormatter(post.price)} </Card.Text>
									</Card.Body>
								</Card>
							</Link>
						</Col>
					).reverse()}
				</Row>
			</Container>
		</Container>
	);
}

export default Product;
