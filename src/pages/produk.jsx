import { Link, useParams } from "react-router-dom";
// import Carousel from "react-elastic-carousel";
import "../css/produk.css";
import { useState, useEffect } from "react";
import { NavbarLogin } from "../components/navbar";
import CarouselProduct from "../components/CarouselProduct";
import jam from "../assets/images/jam1.png";
import { Container, Row, Col, Card, Stack } from "react-bootstrap";
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

export default function Produk() {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [post, setPost] = useState([]);


  useEffect(() => {
    const getUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const responseUser = await axios.get(
          `http://localhost:2000/v1/users/${post.user_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(responseUser)
        const dataUser = await responseUser.data.data.user;

        setUser(dataUser);
        console.log(dataUser);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, [post.user_id]);

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

  // const [displayClass, setDisplayClass] = useState(popupHide)

  // const changeDisplay = () => {
  //     if(displayClass == popupHide) {
  //         setDisplayClass(popupDisplay)
  //     }

  //     else {
  //         setDisplayClass(popupHide)
  //     }
  // }

  return (
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
                      <img src={`http://localhost:2000/public/files/${post.picture}`} style={{ width: '100%', borderRadius: '16px' }} alt="" />
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
                    {/* <button className='btnPurple' onClick={changeDisplay}>Saya tertarik dan ingin nego</button> */}
                  </Card.Body>
                </div>


                <Card className="mt-3 mb-5 productInfo box-shadow radius-primary">
                  <Card.Body>
                    <Stack direction="horizontal" gap={3}>
                      <img src={`http://localhost:2000/public/files/${user.picture}`} alt=""
                        style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "12px" }} />
                      <Stack>
                        <p className="m-0 fw-bold">{user.name}</p>
                        <p className="m-0 text-black-50">{user.city}</p>
                      </Stack>
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
    </>
  );
}
