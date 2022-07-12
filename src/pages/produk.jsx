import { Link, useNavigate, useParams } from "react-router-dom";
// import Carousel from "react-elastic-carousel";
import "../css/produk.css";
import { useState, useEffect } from "react";
import { NavbarLogin } from "../components/navbar";
import CarouselProduct from "../components/CarouselProduct";
import jam from "../assets/images/jam1.png";
import { Container, Row, Col, Card, Stack, Button } from "react-bootstrap";
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
      console.log(data);

      setPost(data);
    };
    postData();
  }, [id]);
  

  useEffect(() => {
    const validateLogin = async () => {
      try {
        const token = localStorage.getItem("token");
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

  // const [displayClass, setDisplayClass] = useState(popupHide)

  // const changeDisplay = () => {
  //     if(displayClass == popupHide) {
  //         setDisplayClass(popupDisplay)
  //     }

  //     else {
  //         setDisplayClass(popupHide)
  //     }
  // }

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
                    <h4> {CurrencyFormatter(post.price)} </h4>
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
                        onClick={(e) => onPublish(e, true)}
                      >
                        {post.user_id === user.id ? "Terbitkan" : "Saya tertarik dan ingin nego"}
                      </Button>
                      {/* <button className='btnPurple' >Saya tertarik dan ingin nego</button> */}
                    </div>
                  </Card.Body>
                </div>


                <Card className="mt-3 mb-5 productInfo box-shadow radius-primary">
                  <Card.Body>
                    <Stack direction="horizontal" gap={3}></Stack>
                      <img src={`http://localhost:2000/public/files/${user.picture}`} alt=""
                        style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "12px" }} />
                      <Stack>
                        <p className="m-0 fw-bold">{user.name}</p>
                        <p className="m-0 text-black-50">{user.city}</p>
                      </Stack>
                  </Card.Body>
                </Card>

                {/* <div className='displayClass'>
                <div className='popupContainer'>
                    <div className='popup'>
                        <p onClick='changeDisplay'>X</p>

                        <h1>Masukkan Harga Tawarmu</h1>
                        <h2>Harga tawaranmu akan diketahui penjual. Jika penjual cocok, kamu akan segera dihubungi penjual.</h2>

                        <div className='info'>
                            <img src={jam} alt='profileImage'/>
                            
                            <div>
                                <h1>Jam Tangan Casio</h1>
                                <h3>Rp 250.000</h3>
                            </div>
                        </div>

                        <h3>Harga Tawar</h3>
                        <form action='/' method='POST'>
                            <input type='number' placeholder='Rp 0,00' required/>
                        </form>
                        <button type='button' className='btnPurple'>Kirim</button>
                    </div>
                </div>
            </div> */}
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>) : (
    <navigate to="/login" replace />
  );
}
