import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Stack,
  Row,
  Col,
  Card,
  Form,
  Modal,
} from "react-bootstrap";
import { NavbarInfo } from "../components/navbar";
import Profile from "../assets/images/profile.png";
import Jam from "../assets/images/jam1.png";
import axios from "axios";
import "../css/daftarJual.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";

export default function InfoPenawar() {
  //   const [post, setPost] = useState([]);

  //   useEffect(() => {
  //     const postData = async () => {
  //       const response = await axios.get(`http://localhost:2000/v1/products/search`);
  //       console.log(response);
  //       const data = await response.data.data.handle_get_all_product;
  //       console.log(data);

  //       setPost(data);
  //     };
  //     postData();
  //   }, []);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <NavbarInfo></NavbarInfo>
      <Container style={{ padding: "0px 110px" }}>
        <Row>
          <div className="col-3 text-center mt-3">
            <Button variant="light">
              <AiOutlineArrowLeft className="mb-1" />
            </Button>
          </div>
          <div className="col-8 mt-4">
            <div className=" radius-primary box-shadow p-2">
              <Stack direction="horizontal" gap={3}>
                <img src={Profile} alt="" />
                <Stack>
                  <p className="m-0 fw-bold">Nama Penjual</p>
                  <p className="m-0 text-black-50">Kota</p>
                </Stack>
              </Stack>
            </div>
            <div className="d-flex flex-row mt-3">
              <p className="m-0 fw-bold">Nama Penjual</p>
            </div>
            <div className=" radius-primary p-2 mt-3">
              <Stack direction="horizontal" gap={3}>
                <img src={Profile} alt="" />
                <Stack>
                  <p className="m-0 text-black-50">Kota</p>
                  <p className="m-0">Jam Tangan Casio</p>
                  <p className="m-0">Rp 250.000</p>
                  <p className="m-0">Ditawar Rp 200.000</p>
                </Stack>
                <Stack>
                  {" "}
                  <p className="m-0 text-black-50 text-end">20 Apr, 14:04</p>
                </Stack>
              </Stack>
            </div>
            <div className="col-6 d-flex mt-3 ms-auto">
              <Button
                variant="outline-primary"
                className=" w-50 radius-primary bg-color me-3"
                type="submit"
              >
                Status
              </Button>{" "}
              <Button
                className=" w-50 radius-primary bg-color-secondary"
                type="submit"
                onClick={handleShow}
              >
                Hubungi di
                <FaWhatsapp className="mx-2" />
              </Button>
            </div>

            <Modal show={show} onHide={handleClose}>
              <div className="p-3">
                <Modal.Header closeButton className="border-0">
                  <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p className="fw-bold">Perbarui status penjualan produkmu</p>
                  <Form>
                      <div key={`default`} className="mb-3">
                        <Form.Check
                          type={'radio'}
                          id={`default`}
                          label={`Berhasil terjual`}
                        />
                        <p className=" text-black-50 radioSubLabel">Kamu telah sepakat menjual produk ini kepada pembeli</p>

                        <Form.Check
                          type={'radio'}
                          label={`Batalkan transaksi`}
                          id={`default`}
                        />
                        <p className=" text-black-50 radioSubLabel">Kamu membatalkan transaksi produk ini dengan pembeli</p>
                      </div>
                  </Form>
                </Modal.Body>
                <Modal.Footer className="d-gird gap-2">
                  <Button
                    className="bg-color-primary w-100 radius-primary border-0"
                    onClick={handleClose}
                  > 
                    Kirim
                  </Button>
                </Modal.Footer>
              </div>
            </Modal>
          </div>
        </Row>
      </Container>
    </>
  );
}
