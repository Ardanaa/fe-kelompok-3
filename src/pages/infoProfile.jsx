import { NavbarInfo } from "../components/navbar";
import { React, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import "../css/infoProfile.css";

export default function infoProfile() {
	// const navigate = useNavigate();

	// const nameField = useRef("");
	// const emailField = useRef("");
	// const passwordField = useRef("");

	// const [errorResponse, setErrorResponse] = useState({
	// 	isError: false,
	// 	message: "",
	// });

	// const onRegister = async (e) => {
	// 	e.preventDefault();

	// 	try {
	// 		const userToRegisterPayload = {
	// 			name: nameField.current.value,
	// 			email: emailField.current.value,
	// 			password: passwordField.current.value,
	// 		};

	// 		const registerRequest = await axios.post(
	// 			"http://localhost:2000/v1/auth/register",
	// 			userToRegisterPayload
	// 		);

	// 		const registerResponse = registerRequest.data;

	// 		if (registerResponse.status) navigate("/login");
	// 	} catch (err) {
	// 		console.log(err);
	// 		const response = err.response.data;

	// 		setErrorResponse({
	// 			isError: true,
	// 			message: response.message,
	// 		});
	// 	}
	// };

	return (
		<>
			<NavbarInfo></NavbarInfo>
			<Container className="d-flex justify-content-center pt-3 my-5">
				<Form className="w-50">
					<form-group className="">
						<Form.Label className="upload-button" for="exampleFormControlFile1"></Form.Label>
						<Form.Control
							type="file"
							class="form-control-file"
							id="exampleFormControlFile1"
							hidden
						/>
					</form-group>
					<Form.Group className="mb-3" controlId="formBasicText">
						<Form.Label>Nama*</Form.Label>
						<Form.Control
							type="text"
							className="radius-primary"
							placeholder="Nama"
						/>
					</Form.Group>
					<Form.Label>Kota*</Form.Label>
					<Form.Select aria-label="Default select example">
						<option>Pilih Kota</option>
						<option value="jakarta">Jakarta</option>
						<option value="semarang">Semarang</option>
						<option value="bekasi">Bekasi</option>
					</Form.Select>
					<Form.Group className="mb-3" controlId="formBasicText">
						<Form.Label>Alamat*</Form.Label>
						<textarea
							class="form-control"
							placeholder="Contoh: Jalan Ikan Hiu 33"
							rows="3"
						></textarea>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicText">
						<Form.Label>No Handphone*</Form.Label>
						<Form.Control
							type="number"
							className="radius-primary"
							placeholder="contoh: +628123456789"
						/>
					</Form.Group>
					<Button
						className="w-100 radius-primary bg-color-secondary"
						type="submit"
					>
						Simpan
					</Button>
				</Form>
			</Container>
		</>
	);
}
