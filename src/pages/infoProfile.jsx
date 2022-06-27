import { NavbarInfo } from "../components/navbar";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import "../css/infoProfile.css";

export default function InfoProfile() {
	const navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { id } = useParams();
	const [user, setUser] = useState([]);

	const [image, setImage] = useState();
	const [preview, setPreview] = useState();

	const fileInputRef = useRef();
	const nameField = useRef("");
	const cityField = useRef("");
	const addressField = useRef("");
	const phoneNumberField = useRef("");


	const [errorResponse, setErrorResponse] = useState({
		isError: false,
		message: "",
	});

	const onUpdate = async (e) => {
		e.preventDefault();

		try {
			const token = localStorage.getItem("token");

			const userPayload = new FormData();

			userPayload.append("picture", image);
			userPayload.append("name", nameField.current.value);
			userPayload.append("city", cityField.current.value);
			userPayload.append("address", addressField.current.value);
			userPayload.append("phoneNumber", phoneNumberField.current.value);

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

	const getUsers = async () => {
    try {
			const token = localStorage.getItem("token");
      const responsePosts = await axios.get(
        `http://localhost:2000/v1/auth/me`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
      );
			console.log(responsePosts)
      const dataPosts = await responsePosts.data.data.user;

      setUser(dataPosts);
      console.log(dataPosts);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

	useEffect(() => {
		if (image) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result);
			}
			reader.readAsDataURL(image);
		} else {
			setPreview(null);
		}
	}, [image]);

	return (
		<>
			<NavbarInfo></NavbarInfo>
			<Container id="infoProfile" className="d-flex justify-content-center pt-3 my-5">
				<Form onSubmit={onUpdate} className="w-50">
					<form-group className="">
						{preview ? (
							<img src={preview} onClick={() => setImage(null)} alt="preview" />
						) : (
							<Form.Label
								className="upload-button"
								onClick={(e) => {
									e.preventDefault();
									fileInputRef.current.click();
								}}
							></Form.Label>
						)}
						<Form.Control
							type="file"
							class="form-control-file"
							ref={fileInputRef}
							accept="image/*"
							onChange={(e) => {
								const file = e.target.files[0];
								if (file && file.type.substr(0, 5) === "image") {
									setImage(file);
								} else {
									setImage(null);
								}
							}}
							hidden
						/>
					</form-group>
					<Form.Group className="mb-3" controlId="formBasicText">
						<Form.Label>Nama*</Form.Label>
						<Form.Control
							type="text"
							className="radius-primary"
							placeholder="Nama"
							ref={nameField}
							defaultValue={user.name}
						/>
					</Form.Group>
					<Form.Label>Kota*</Form.Label>
					<Form.Select ref={cityField} aria-label="Default select example">
						<option defaultValue={user.city}>Pilih Kota</option>
						<option value="jakarta">Jakarta</option>
						<option value="semarang">Semarang</option>
						<option value="bekasi">Bekasi</option>
					</Form.Select>
					<Form.Group className="mb-3" controlId="formBasicText">
						<Form.Label
						>Alamat*</Form.Label>
						<textarea
							class="form-control"
							placeholder="Contoh: Jalan Ikan Hiu 33"
							rows="3"
							ref={addressField}
							defaultValue={user.address}
						></textarea>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicText">
						<Form.Label
						>No Handphone*</Form.Label>
						<Form.Control
							type="number"
							className="radius-primary"
							placeholder="contoh: +628123456789"
							ref={phoneNumberField}
							defaultValue={user.phoneNumber}
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
