import { NavbarProduct } from "../components/navbar";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "../css/infoProduct.css";
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
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function InfoProduct() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const titleField = useRef("");
  const priceField = useRef("");
  const categoryField = useRef("");
  const descriptionField = useRef("");
  const [isSold, setIsSold] = useState(Boolean);

  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const fileInputRef = useRef();

  const [errorResponse, setErrorResponse] = useState({
    isError: false,
    message: "",
  });

  const getUsers = async () => {
    try {
			const token = localStorage.getItem("token");
      const responseUser = await axios.get(
        `http://localhost:2000/v1/auth/me`,
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
  useEffect(() => {
    getUsers();
  }, []);


  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      }
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const onPost = async (e, isPublish) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const postPayload = new FormData();

      postPayload.append("name", titleField.current.value);
      postPayload.append("price", priceField.current.value);
      postPayload.append("category", categoryField.current.value);
      postPayload.append("description", descriptionField.current.value);
      postPayload.append("picture", image);
      postPayload.append("isPublish", isPublish);
      postPayload.append("isSold", isSold);

      const postRequest = await axios.post(
        "http://localhost:2000/v1/products/create",
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

      if (postResponse.status) {
        if (isPublish) navigate(`/daftarJual/${user.id}`) 
        else navigate("/");
      };
    } catch (err) {
      console.log(err);
      const response = err.response.data;

      setErrorResponse({
        isError: true,
        message: response.message,
      });
    }
  };

  return (
    <>
      <NavbarProduct></NavbarProduct>
      <Container className="justify-content-center mt-5">
        <Row>
          <div className="col-3 text-center">
            <Link to="/daftarJual">
              <Button variant="light">
                <AiOutlineArrowLeft className="mb-1" />
              </Button>
            </Link>
          </div>
          <div className="col-6">
            <Form id="infoProduct" className="">
              <Form.Group className="mb-3">
                <Form.Label>Nama Produk</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Contoh: johndee@gmail.com"
                  className="radius-primary"
                  ref={titleField}
                // defaultValue={products.name}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Harga Produk</Form.Label>
                <Form.Control
                  type="harga"
                  placeholder="Rp 0,00"
                  className="radius-primary"
                  ref={priceField}
                // defaultValue={products.price}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Kategori</Form.Label>
                <Form.Select ref={categoryField} aria-label="Default select example">
                  <option>Pilih Kategori</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Elektronik">Elektronik</option>
                  <option value="Otomotif">Otomotif</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Deskripsi</Form.Label>
                <textarea
                  class="form-control"
                  placeholder="Contoh: Jalan Ikan Hiu 33"
                  rows="3"
                  ref={descriptionField}
                // defaultValue={products.description}
                ></textarea>
              </Form.Group>
              <p>Foto Produk</p>
              <form-group className="mb-3">
                <Form.Label
                  className="upload-button-product"
                  for="exampleFormControlFile1"
                  onClick={(e) => {
                    e.preventDefault();
                    fileInputRef.current.click();
                  }}
                >
                  {preview ? (
                    <img src={preview} onClick={() => setImage(null)} alt="preview" />
                  ) : ("")}
                </Form.Label>

                <Form.Control
                  type="file"
                  class="form-control-file"
                  id="exampleFormControlFile1"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file && file.type.substr(0, 5) === "image") {
                      setImage(file);
                    } else {
                      setImage(null);
                    }
                  }}
                  hidden
                />

              </form-group>
              <div className="mb-3 d-flex">
                <Button
                  className=" w-50 radius-primary bg-color-secondary"
                  type="submit"
                  onClick={(e) => onPost(e, false)}
                >
                  Preview
                </Button>
                <Button
                  className=" w-50 radius-primary bg-color-secondary"
                  type="submit"
                  onClick={(e) => onPost(e, true)}
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
