import { NavbarPenawaran } from "../components/navbar";
import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row, Form, Button, Alert, Stack } from "react-bootstrap";
import axios from "axios";
import CurrencyFormatter from "../assets/CurrencyFormatter.js";
import dateFormat from "dateformat";

export default function InfoProfile() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [user, setUser] = useState([]);
	const [interest, setInterest] = useState([]);



	const [errorResponse, setErrorResponse] = useState({
		isError: false,
		message: "",
	});

	const onUpdate = async (e) => {
		e.preventDefault();

		try {
			const token = localStorage.getItem("token");

			const userPayload = new FormData();

			// userPayload.append("picture", image);
			// userPayload.append("name", nameField.current.value);
			// userPayload.append("city", cityField.current.value);
			// userPayload.append("address", addressField.current.value);
			// userPayload.append("phoneNumber", phoneNumberField.current.value);

			const userRequest = await axios.put(
				`http://localhost:2000/v1/users/update/${id}`,
				userPayload,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "multipart/form-data",
					},
				}
			);

			const userResponse = userRequest.data;

			if (userResponse.status) navigate("/");
		} catch (err) {
			console.log(err);
			const response = err.response.data;

			setErrorResponse({
				isError: true,
				message: response.message,
			});
		}
	};

	useEffect(() => {
		const interestData = async () => {

			const token = localStorage.getItem("token");

			const response = await axios.get(`http://localhost:2000/v1/transaction/${id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
			console.log(response);
			const data = await response.data.data.transaction_by_id[0];
			console.log(data);

			setInterest(data);
		};
		interestData();
	}, [id]);



	return (
		<>
			<NavbarPenawaran></NavbarPenawaran>
			<Container className="my-5" style={{ padding: "0px 25%" }}>
				<div className=" radius-primary box-shadow p-2">
					<Stack direction="horizontal" gap={3}>
						<img src={`${interest.User ? interest.User.picture : ""}`} alt="buyer"
							style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "12px" }} />
						<Stack>
							<p className="m-0 fw-bold">{interest.User && interest.User.name}</p>
							<p className="m-0 text-black-50">{interest.User && interest.User.city}</p>
						</Stack>
					</Stack>
				</div>
				<p className="mt-3 mb-0 fw-bold">Daftar Produkmu yang Ditawar</p>
				<div className=" radius-primary box-shadow p-2">
					<Stack direction="horizontal" gap={3}>
						<img src={`${interest.Product ? interest.Product.picture : ""}`} alt="buyer"
							style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "12px" }} />
						<Stack>
							<p className="m-0 text-black-50 fs-8">Penawaran Produk</p>
							<p className="m-0">{interest.Product && interest.Product.name}</p>
							<p className="m-0">{CurrencyFormatter(interest.Product && interest.Product.price)}</p>
							<p className="m-0">Ditawar {CurrencyFormatter(interest.requestedPrice)}</p>
						</Stack>
						<Stack>
							<p className="m-0 ms-auto text-black-50 fs-8">{dateFormat(interest.createdAt, "d mmm, h:MM")}</p>
						</Stack>
					</Stack>
					<div className="d-flex">
							<Button
								className="ms-auto me-2 border-purple radius-primary bg-white color-primary"
								type="submit"
							>
								Tolak
							</Button>
						<Button
							className="border-purple radius-primary bg-color-secondary"
							type="submit"
						>
							Terima
						</Button>
					</div>
				</div>
			</Container>
		</>
	);
}
