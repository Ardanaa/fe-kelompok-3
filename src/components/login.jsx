import React from "react";
import { Form, Col, Container, Row, Button } from "react-bootstrap";
import { AiOutlineEye } from "react-icons/ai";

function Login() {
  return (
    <Container>
      <Row>
        <Col className="mx-auto" md={9} lg={5}>
          <img src="/images/imgLogin.jpg" className="img-fluid bg" />
        </Col>
        <Col className="mt-5 mx-auto" xs={12} md={12} lg={6}>
          <>
            <div>
              <p style={{ fontSize: "30px" }}>
                <span style={{ fontWeight: "bold" }}>Masuk</span>
              </p>
            </div>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Contoh: johndee@gmail.com"
                />
              </Form.Group>
              <div className="mb-3">
                <input
                  className="formBasicPassword"
                  type="password"
                  placeholder="Masukkan Password"
                />
                <button className="btn">
                  <AiOutlineEye />
                </button>
              </div>
              <Form.Group className="mb-3 box" controlId="formBasicPassword">
                <Form.Label>
                  Password <AiOutlineEye />
                </Form.Label>
                <Form.Control type="password" placeholder="Masukkan password" />
                <button className="btn">
                  <AiOutlineEye />
                </button>
              </Form.Group>
              <Button
                className="ms-auto button-primary radius-secondary bg-color-primary border-0"
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
            </Form>
            <p className="">
              Belum punya akun?{" "}
              <span className=" text-primary color-primary auto-layout daftar">
                Daftar di sini
              </span>
            </p>
          </>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
