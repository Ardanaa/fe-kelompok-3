import React, { useState, useEffect } from 'react';
import { Button, Container, Stack, Row, Col, Card } from 'react-bootstrap';
import { NavbarDefault, NavbarInfo, NavbarLogin, NavbarProduct } from "../components/navbar";
import { FiBox, FiHeart, FiDollarSign, FiChevronRight } from "react-icons/fi";
import axios from "axios";

export default function Produk() {
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

  return (<>
    <NavbarProduct></NavbarProduct>;
    <Container style={{ padding: "0px 110px" }}>
      
    </Container>
  </>)
}