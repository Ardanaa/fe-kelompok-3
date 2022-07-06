import { Link } from "react-router-dom";
// import Carousel from "react-elastic-carousel";
import "../css/produk.css";
import { useState } from "react";
import { NavbarLogin } from "../components/navbar";
import CarouselProduct from "../components/CarouselProduct";
import jam from "../assets/images/jam1.png";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export default function produk() {
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
              {/* <CarouselProduct></CarouselProduct> */}
              <div className="left">
                <CarouselProduct />
                {/* <Carousel>
              <div className="card-carousel">
                <img src={jam} style={{ width: '100%', borderRadius: '16px' }} alt="" />
                </div>
                <div className="card-carousel">
                <img src={jam} style={{ width: '100%', borderRadius: '16px' }} alt="" />
                </div>
                <div className="card-carousel">
                <img src={jam} style={{ width: '100%', borderRadius: '16px' }} alt="" />
                </div>
                <div className="card-carousel">
                <img src={jam} style={{ width: '100%', borderRadius: '16px' }} alt="" />
                </div>
              </Carousel> */}

                <div className="card-desc radius-primary box-shadow p-2 mt-4">
                  <h1>Deskripsi</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs={4}>
              <div className="right">
                <div className=" radius-primary box-shadow p-2 ps-0">
                  <Card.Body>
                    <Card.Title>Jam Tangan Casio</Card.Title>
                    <p>Aksesoris</p>
                    <h4>Rp. 250.000</h4>
                    {/* <button className='btnPurple' onClick={changeDisplay}>Saya tertarik dan ingin nego</button> */}
                  </Card.Body>
                </div>


                <Card className="mt-3 mb-5 productInfo box-shadow radius-primary">
                  <Card.Body>
                    <Row>
                      <Col xs={2}>
                        <img src={jam} className="seller" alt="" />
                      </Col>
                      <Col xs={8}>
                        <h5>Safira</h5>
                        <p>Jakarta</p>
                      </Col>
                      <Col xs={2}>
                        {/* <Link to=".profile">
                        <Button className="btn" variant="primary">
                          Edit
                        </Button>
                      </Link> */}
                      </Col>
                    </Row>
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
