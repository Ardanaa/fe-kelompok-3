import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import "../css/products.css"
import { Link } from "react-router-dom";
import CurrencyFormatter from "../assets/CurrencyFormatter.js";
import { useSelector } from "react-redux";

function Product() {
	const [post, setPost] = useState([]);
	const [category, setCategory] = useState([""]);

	const searching = useSelector(state => state.search.search);
	const categories = category ? `&category=${category}` : "";
	const searched = searching ? `&name=${searching}` : "";
	console.log(searching);

	useEffect(() => {
		const postData = async () => {
			const response = await axios.get(`http://binar-secondhand-be.herokuapp.com/v1/products/search?isPublish=true&&isSold=false${categories}${searched}`);
			console.log(response);
			const data = await response.data.data.get_all_product;
			console.log(data);

			setPost(data);
		};
		postData();
	}, [categories, searched]);

	return (
		<Container className="pt-5" id="btn-category">
			<h5 className="fw-bold">Telusuri Kategori</h5>
			<div className="button-group d-flex button-category">
				<Button onClick={() => setCategory(null)} className="d-flex me-4 radius-secondary bg-color-secondary border-0">
					<FiSearch className="me-1 mb-1" />
					Semua
				</Button>
				<Button onClick={() => setCategory("fashion")} className="d-flex me-4 radius-secondary bg-color-secondary border-0">
					<FiSearch className="me-1 mb-1" /> Fashion
				</Button>
				<Button onClick={() => setCategory("hobi")} className="d-flex me-4 radius-secondary bg-color-secondary border-0">
					<FiSearch className="me-1 mb-1" /> Hobi
				</Button>
				<Button onClick={() => setCategory("elektronik")} className="d-flex me-4 radius-secondary bg-color-secondary border-0">
					<FiSearch className="me-1 mb-1" /> Elektronik
				</Button>

			</div>
			<Container id="products" className="mt-5">
				<Row >
					{post.map((post) =>
						<Col key={post.id} className="col-6 col-md-2 mb-3 p-2" >
							<Link className="text-decoration-none text-black" to={`/produk/${post.id}`}>
								<Card >
									<Card.Img variant="top" className="p-2" src={`${post.picture}`} style={{ maxHeight: "100px", objectFit: "cover" }} />
									<Card.Body>
										<Card.Title className="fs-7 ">{post.name}</Card.Title>
										<p className="text-black-50 fs-8  mb-0">{post.category}</p>
										<Card.Text className="fs-7 ">{CurrencyFormatter(post.price)}</Card.Text>
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
