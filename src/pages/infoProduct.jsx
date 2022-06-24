import { NavbarProduct } from "../components/navbar";
import infoProduct from "../components/infoProduct";
import { NavbarInfo } from "../components/navbar";
import { React, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  Alert,
  FloatingLabel,
} from "react-bootstrap";
import axios from "axios";
import navbar from "../components/navbar";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function infoproduct() {
  // 	const [errorResponse, setErrorResponse] = useState({
  // 		isError: false,
  // 		message: "",
  // 	});

  // 	const onRegister = async (e) => {
  // 		e.preventDefault();

  // 		try {
  // 			const userToRegisterPayload = {
  // 				email: emailField.current.value,
  // 				password: passwordField.current.value,
  // 			};

  // 			const registerRequest = await axios.post(
  // 				"http://localhost:2000/v1/auth/login",
  // 				userToRegisterPayload
  // 			);

  // 			const registerResponse = registerRequest.data;

  // 			if (registerResponse.status) navigate("/");
  // 		} catch (err) {
  // 			console.log(err);
  // 			const response = err.response.data;

  // 			setErrorResponse({
  // 				isError: true,
  // 				message: response.message,
  // 			});
  // 		}
  // 	};
  return (
    <>
      <NavbarProduct></NavbarProduct>
      <Container className="justify-content-center mt-5">
        <Row>
          <div className="col-3 text-center">
          <Button variant="light">
            <AiOutlineArrowLeft className="icon-back" />
            </Button>
          </div>
          <div className="col-6">
            <Form className="">
              <Form.Group className="mb-3">
                <Form.Label>Nama Produk</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Contoh: johndee@gmail.com"
                  className="radius-primary"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Harga Produk</Form.Label>
                <Form.Control
                  type="harga"
                  placeholder="Rp 0,00"
                  className="radius-primary"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Kategori</Form.Label>
                <Form.Select aria-label="Default select example">
                  <option>Pilih Kategori</option>
                  <option value="fashion">Fashion</option>
                  <option value="elektronik">Elektronik</option>
                  <option value="otomotif">Otomotif</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Deskripsi</Form.Label>
                <textarea
                  class="form-control"
                  placeholder="Contoh: Jalan Ikan Hiu 33"
                  rows="3"
                ></textarea>
              </Form.Group>
              <p>Foto Produk</p>
              <form-group className="mb-3">
                <Form.Label
                  className="upload-button-product"
                  for="exampleFormControlFile1"
                ></Form.Label>
                <Form.Control
                  type="file"
                  class="form-control-file"
                  id="exampleFormControlFile1"
                  hidden
                />
              </form-group>
              <div className="mb-3 d-flex">
                <Button
                  variant="outline-primary"
                  className=" w-50 radius-primary bg-color-secondary"
                  type="submit"
                >
                  Preview
                </Button>{" "}
                <Button
                  className=" w-50 radius-primary bg-color-secondary"
                  type="submit"
                >
                  Terbitkan
                </Button>
              </div>
            </Form>
          </div>
        </Row>
      </Container>
    </>
  );
}
