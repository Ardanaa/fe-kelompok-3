import { Link, useNavigate, useParams } from "react-router-dom";
import "../css/produk.css";
import { useState, useEffect, useRef } from "react";
import { NavbarLogin } from "../components/navbar";
import { Container, Row, Col, Card, Stack, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
  Navigation, Pagination, Mousewheel, Keyboard,
} from 'swiper';
import CurrencyFormatter from "../assets/CurrencyFormatter.js";

export default function Produk() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [post, setPost] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const requestedPriceField = useRef("")
  const [isAccepted, setisAccepted] = useState(Boolean);
  const [isRejected, setisRejected] = useState(Boolean);
  const [isOpened, setisOpened] = useState(Boolean);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const [errorResponse, setErrorResponse] = useState({
    isError: false,
    message: "",
  });

  useEffect(() => {
    const postData = async () => {

      const token = localStorage.getItem("token");

      const response = await axios.get(`http://localhost:2000/v1/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      console.log(response);
      const data = await response.data.data.product_by_id;
      console.log(data.User.picture);

      setPost(data);
    };
    postData();
  }, [id]);

  // const sellerID = post.user_id;
  // console.log(sellerID)

  useEffect(() => {
    const validateLogin = async () => {
      try {
        const token = localStorage.getItem("token");
        const currentUserRequest = await axios.get(
          `http://localhost:2000/v1/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(currentUserRequest)
        const currentUserResponse = currentUserRequest.data;

        if (currentUserResponse.status) {
          setUser(currentUserResponse.data.user);
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    };

    validateLogin();
  }, []);

  const onPublish = async (e, isPublish) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const postPayload = new FormData();
      postPayload.append("isPublish", isPublish);

      const postRequest = await axios.put(
        `http://localhost:2000/v1/products/update/${id}`,
        postPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(postRequest);
      const postResponse = postRequest.data;
      console.log(postResponse)

      if (postResponse.status) navigate(`/daftarJual/${user.id}`);
    } catch (err) {
      console.log(err);
      const response = err.response.data;

      setErrorResponse({
        isError: true,
        message: response.message,
      });
    }
  };

  const onBid = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const bidPayload = new FormData();

      bidPayload.append("owner_id", post.user_id);
      bidPayload.append("product_id", post.id);
      bidPayload.append("requestedPrice", requestedPriceField.current.value);
      bidPayload.append("isAccepted", isAccepted);
      bidPayload.append("isRejected", isRejected);
      bidPayload.append("isOpened", isOpened);

      const bidRequest = await axios.post(
        "http://localhost:2000/v1/transactions/create",
        bidPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(bidRequest);
      const bidResponse = bidRequest.data;
      console.log(bidResponse)

      if (bidResponse.status) navigate(`/daftarJual/${user.id}`)
    } catch (err) {
      console.log(err);
      const response = err.response.data;

      setErrorResponse({
        isError: true,
        message: response.message,
      });
    }
  };

  return isLoggedIn ? (
    <>
      <NavbarLogin></NavbarLogin>
      <Container style={{ padding: "0px 110px" }} className="mt-5">
        <div className="ps-0 d-flex">
          <Row>
            <Col xs={6}>
              <div className="left">
                <Swiper
                  cssMode
                  navigation
                  pagination
                  mousewheel
                  keyboard
                  modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <div className="card-carousel">
                      <img src={`${post.picture}`} style={{ width: '100%', borderRadius: '16px' }} alt="" />
                    </div>
                  </SwiperSlide>

                </Swiper>

                <div className="card-desc radius-primary box-shadow p-2 mt-4">
                  <h1>Deskripsi</h1>
                  <p>{post.description}</p>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs={4}>
              <div className="right">
                <div className=" radius-primary box-shadow p-2 ps-0">
                  <Card.Body>
                    <Card.Title>{post.name}</Card.Title>
                    <p>{post.category}</p>
                    <h4>Rp. {post.price}</h4>
                    <div>
                      <Link to={`/updateProduct/${post.id}`} >
                        <Button
                          className=" w-100 border-purple radius-primary bg-white color-primary mb-2"
                          type="submit"
                          hidden={post.user_id === user.id ? false : true}
                        >
                          Edit
                        </Button>
                      </Link>
                      <Button
                        className=" w-100 border-purple radius-primary bg-color-secondary"
                        type="submit"
                        onClick={post.user_id === user.id ?  (e) => onPublish(e, true) : handleShow}
                      >
                        {post.user_id === user.id ? "Terbitkan" : "Saya tertarik dan ingin nego"}
                      </Button>
                    </div>
                  </Card.Body>
                </div>


                <Card className="mt-3 mb-5 productInfo box-shadow radius-primary">
                  <Card.Body>
                    <Stack direction="horizontal" gap={3}>
                      <img src={`${post.User ? post.User.picture : ""}`} alt=""
                        style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "12px" }} />
                      <Stack>
                        <p className="m-0 fw-bold">{post.User && post.User.name}</p>
                        <p className="m-0 text-black-50">{post.User && post.User.city}</p>
                      </Stack>
                    </Stack>
                  </Card.Body>
                </Card>


                <Modal show={show} onHide={handleClose} centered size="sm" dialogClassName="modal-30w">
                  <div className="p-3">
                    <Modal.Header closeButton className="border-0">
                      <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p className="fw-bold">Masukan Harga Tawarmu</p>
                      <p className="text-black-50">Harga tawaranmu akan diketahui penual, jika penjual cocok kamu akan segera dihubungi penjual.</p>
                      <Stack direction="horizontal" gap={3} className="bg-color-grey radius-secondary p-2">
                        <img src={`${post.picture}`} alt=""
                          style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "12px" }} />
                        <Stack>
                          <p className="m-0 fw-bold">{post.name}</p>
                          <p className="m-0 text-black-50">{CurrencyFormatter(post.price)}</p>
                        </Stack>
                      </Stack>
                      <Form className="">
                        <Form.Group className="mt-3">
                          <Form.Label className="fs-7">Harga Tawar</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Rp. 0,00"
                            className="radius-primary box-shadow"
                            ref={requestedPriceField}
                          />
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer className="border-0">
                      <Button
                        type="submit"
                        onClick={(e) => onBid(e)}
                        className="bg-color-primary w-100 radius-primary border-0">
                        Kirim
                      </Button>
                    </Modal.Footer>
                  </div>
                </Modal>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>) : (
    <navigate to="/login" replace />
  );
}
