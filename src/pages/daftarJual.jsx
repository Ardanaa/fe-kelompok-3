import React, { useState, useEffect } from 'react';
import { Button, Container, Stack, Row, Col, Card, Badge, Alert } from 'react-bootstrap';
import { NavbarLogin } from "../components/navbar";
import { FiBox, FiHeart, FiDollarSign, FiChevronRight } from "react-icons/fi";
import Uploadproduct from '../assets/images/uploadProduct.png'
import { Navigate, Link, useParams, useNavigate } from 'react-router-dom';
import likedEmpty from '../assets/images/likedEmpty.png'
import axios from "axios";
import "../css/daftarJual.css"

export default function DaftarJual() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [interest, setInterest] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({});
  const [toogleCategory, setToogleCategory] = useState(1)

  useEffect(() => {
    const validateLogin = async () => {
      try {
        // Check status user login
        // 1. Get token from localStorage
        const token = localStorage.getItem("token");

        // 2. Check token validity from API
        const currentUserRequest = await axios.get(
          "http://localhost:2000/v1/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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

  useEffect(() => {
    const postData = async () => {

      const token = localStorage.getItem("token");

      const response = await axios.get(`http://localhost:2000/v1/users/${id}/products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      console.log(response);
      const data = await response.data.data.product_user_id;
      console.log(data);

      setPost(data);
    };
    postData();
  }, [id]);
  
  useEffect(() => {
    const interestData = async () => {

      const token = localStorage.getItem("token");

      const response = await axios.get(`http://localhost:2000/v1/transactios/owner/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      console.log(response);
      const data = await response.data.data.get_transaction_owner;
      console.log(data);

      setInterest(data);
    };
    interestData();
  }, [id]);

  const handleJual = () => {
    isLoggedIn ? user.picture ? user.city ? user.address ? user.phoneNumber ?
      navigate('/infoProduct') :
      navigate(`/infoProfile/${user.id}`) :
      navigate(`/infoProfile/${user.id}`) :
      navigate(`/infoProfile/${user.id}`) :
      navigate(`/infoProfile/${user.id}`) :
      navigate('/login')
  }

  return isLoggedIn ? (<>
    <NavbarLogin></NavbarLogin>;
    <Container style={{ padding: "0px 110px" }}>
      <p className="fw-bold fs-3">Daftar Jual Saya</p>
      <div className=" radius-primary box-shadow p-2">
        <Stack direction="horizontal" gap={3}>
          <img src={`${user.picture}`} alt=""
            style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "12px" }} />
          <Stack>
            <p className="m-0 fw-bold">{user.name}</p>
            <p className="m-0 text-black-50">{user.city}</p>
          </Stack>
          <Link className="" to={`/infoProfile/${user.id}`}>
            <Button className="ms-auto radius-secondary bg-white text-black border-purple">
              Edit
            </Button>
          </Link>
        </Stack>
      </div>
      <div className="d-flex flex-row mt-3">
        <div>
          <div className="box-shadow me-2">
            <Card id="daftar-jual" classname="radius-primary" style={{ width: '248px' }}>
              <Card.Body>
                <p className="fw-bold">Kategori</p>
                <Button
                  variant="light"
                  className={toogleCategory === 1 ? "active" : "" & "bg-transparent border-0 w-100 text-start"}
                  onClick={() => setToogleCategory(1)}
                >
                  <FiBox /> Semua Produk <FiChevronRight className="" />
                </Button>
                <hr className="m-1"></hr>
                <Button
                  variant="light"
                  className={toogleCategory === 2 ? "active" : "" & "bg-transparent border-0 w-100 text-start"}
                  onClick={() => setToogleCategory(2)}
                >
                  <FiHeart /> Diminati <FiChevronRight className="" />
                </Button>
                <hr className="m-1"></hr>
                <Button
                  variant="light"
                  className={toogleCategory === 3 ? "active" : "" & "bg-transparent border-0 w-100 text-start"}
                  onClick={() => setToogleCategory(3)}
                >
                  <FiDollarSign /> Terjual <FiChevronRight className="" />
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
        <div className={toogleCategory === 1 ? "active-content flex-fill" : "content"}>
          <Row className="" >
            <Col md={4} className="">
              {/* <Link to="/infoProduct"> */}
              <Card onClick={handleJual} className="border-0" role="button">
                <img src={Uploadproduct} alt="" />
              </Card>
              {/* </Link> */}
            </Col>
            {post.map((post) =>
              <Col md={4} key={post.id} className="mb-3">
                <Link className="text-decoration-none text-black" to={`/produk/${post.id}`}>
                  <Card >
                    <Card.Img variant="top" className="p-2" src={`${post.picture}`} style={{ maxHeight: "100px", objectFit: "cover" }} />
                    <Card.Body>
                      <Card.Title className="fs-7 cut-text">{post.name}</Card.Title>
                      <p className="text-black-50 fs-8  mb-0">{post.category}</p>
                      <Card.Text className="fs-7 ">Rp.{post.price}</Card.Text>
                      <Badge bg={post.isPublish === true ? "primary" : "warning"}>
                        {post.isPublish === true ? "Produk sudah di publish" : "Produk belum di publish"}
                      </Badge>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ).reverse()}
          </Row>
        </div>
        <div
          className={toogleCategory === 2 ? "active-content" : "content"}
          // style={{marginLeft: "200px", alignItems: "center !important"}}
        >
          {interest ? (
          <Row className="" >
            {interest.map((interest) =>
              <Col key={interest.id} className="mb-3">
                <Link className="text-decoration-none text-black" to={`/infoPenawaran/${interest.id}`}>
                  <Card >
                    <Card.Img variant="top" className="p-2" src={`${interest.Product.picture}`} style={{ maxHeight: "100px", objectFit: "cover" }} />
                    <Card.Body>
                      <Card.Title className="fs-7 cut-text">{interest.Product.name}</Card.Title>
                      <p className="text-black-50 fs-8  mb-0">{interest.Product.category}</p>
                      <Card.Text className="fs-7 ">Rp.{interest.Product.price}</Card.Text>
                      {/* <Badge bg={interest.isPublish === true ? "primary" : "warning"}>
                        {interest.isPublish === true ? "Produk sudah di publish" : "Produk belum di publish"}
                      </Badge> */}
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ).reverse()}
          </Row>
          ) : (
          <img src={likedEmpty} alt="" />
          )}
        </div>
      </div>
    </Container>
  </>) : (
    <Navigate to="/login" replace />
  )
}