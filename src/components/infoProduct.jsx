import { React, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Col, Container, Row, Form, Button, Alert, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import navbar from "../components/navbar";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "../css/infoProduct.css";

function infoProduct() {
//   const navigate = useNavigate();

// 	const emailField = useRef("");
// 	const passwordField = useRef("");

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
    <Container fluid className="ps-0">
      <Row>
        <Col className="pe-0 ">
            <AiOutlineArrowLeft className="icon-back" />
        </Col>
        <Col className="ps-0">
					<div className="center">
						<FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="name@example.com" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control type="password" placeholder="Password" />
      </FloatingLabel>
					</div>
				</Col>
      </Row>
    </Container>
  );
}

export default infoProduct;