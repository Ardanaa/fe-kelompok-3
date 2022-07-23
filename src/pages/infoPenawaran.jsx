import { NavbarPenawaran } from "../components/navbar";
import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row, Form, Button, Alert, Stack, Modal } from "react-bootstrap";
import axios from "axios";
import CurrencyFormatter from "../assets/CurrencyFormatter.js";
import dateFormat from "dateformat";
import { FaWhatsapp } from "react-icons/fa";

export default function InfoProfile() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [user, setUser] = useState([]);
	const [interest, setInterest] = useState([]);

	// modal
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [showStatus, setShowStatus] = useState(false);
	const handleCloseStatus = () => setShowStatus(false);
	const handleShowStatus = () => setShowStatus(true);

	const [successResponse, setSuccessResponse] = useState({
		isSuccess: false,
		message: "",
});

	const [errorResponse, setErrorResponse] = useState({
		isError: false,
		message: "",
	});

	const onAccept = async (e, isAccepted, isRejected) => {
		e.preventDefault();

		try {
			const token = localStorage.getItem("token");

			const acceptPayload = {
				isAccepted: isAccepted,
				isRejected: isRejected,
			}

			const acceptRequest = await axios.put(
				`http://localhost:2000/v1/transactions/update/${id}`,
				acceptPayload,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const acceptResponse = acceptRequest.data.data.updated_transaction;

			const response = await axios.get(`http://localhost:2000/v1/transactions/${id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
			console.log(response);
			const data = await response.data.data.transaction_by_id;
			console.log(data);

			setInterest(data);

			if (acceptResponse.status) navigate(`/infoPenawaran/${interest.id}`);
		} catch (err) {
			console.log(err);
			const response = err.response.data;

			setErrorResponse({
				isError: true,
				message: response.message,
			});
		}
	};

	const [selectedSold, setSelectedSold] = useState();
	const [selectedReject, setSelectedReject] = useState();
	const [selectedAccept, setSelectedAccept] = useState();

	const selectedButton = (e) => {
		console.log(e.target.value);
	};

	const selectedButtonSold = (e) => {
		setSelectedSold(e.target.value);
	}

	const selectedButtonReject = (e) => {
		setSelectedAccept(false)
		setSelectedReject(e.target.value);
	}

	const onChangeStatus = async (e) => {
		e.preventDefault();

		try {
			const token = localStorage.getItem("token");

			const acceptPayload = {
				isSold: selectedSold,
				isRejected: selectedReject,
				isAccepted: selectedAccept,
			}

			const acceptRequest = await axios.put(
				`http://localhost:2000/v1/transactions/update/${id}`,
				acceptPayload,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const acceptResponse = acceptRequest.data;

			console.log(acceptResponse);

			const response = await axios.get(`http://localhost:2000/v1/transactions/${id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
			console.log(response);
			const data = await response.data.data.transaction_by_id;
			console.log(data);

			setInterest(data);

			if (acceptResponse.status) navigate(`/infoPenawaran/${interest.id}`);
		} catch (err) {
			console.log(err);
			const response = err.response.data;

			setErrorResponse({
				isError: true,
				message: response.message,
			});
		}
	};

	useEffect(() => {
		const interestData = async () => {

			const token = localStorage.getItem("token");

			const response = await axios.get(`http://localhost:2000/v1/transactions/${id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
			console.log(response);
			const data = await response.data.data.transaction_by_id;
			console.log(data);

			setInterest(data);
		};
		interestData();
	}, [id]);



	return (
		<>
			<NavbarPenawaran></NavbarPenawaran>
			<Container className="my-5" style={{ padding: "0px 25%" }}>
				<div className=" radius-primary box-shadow p-2">
					<Stack direction="horizontal" gap={3}>
						<img src={`${interest.User ? interest.User.picture : ""}`} alt="buyer"
							style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "12px" }} />
						<Stack>
							<p className="m-0 fw-bold">{interest.User && interest.User.name}</p>
							<p className="m-0 text-black-50">{interest.User && interest.User.city}</p>
						</Stack>
					</Stack>
				</div>
				<p className="mt-3 mb-0 fw-bold">Daftar Produkmu yang Ditawar</p>
				<div className=" radius-primary box-shadow p-2">
					<Stack direction="horizontal" gap={3}>
						<img src={`${interest.Product ? interest.Product.picture : ""}`} alt="buyer"
							style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "12px" }} />
						<Stack>
							<p className="m-0 text-black-50 fs-8">{interest.Product && interest.Product.isSold === true ? "Berhasil Terjual" : "Penawaran Produk"}</p>
							<p className="m-0">{interest.Product && interest.Product.name}</p>
							<p className="m-0">{CurrencyFormatter(interest.Product && interest.Product.price)}</p>
							<p className="m-0">Ditawar {CurrencyFormatter(interest.requestedPrice)}</p>
						</Stack>
						<Stack>
							<p className="m-0 ms-auto text-black-50 fs-8">{dateFormat(interest.updatedAt, "d mmm, HH:MM")}</p>
						</Stack>
					</Stack>
					<div className="d-flex">
						<Button
							className="ms-auto me-2 border-purple radius-primary bg-white color-primary"
							type="submit"
							onClick={interest.isAccepted === true ? (e) => handleShowStatus(e) : (e) => onAccept(e, false, true)}
							hidden={interest.isRejected === true || (interest.Product && interest.Product.isSold) === true ? true : false}
						>
							{interest.isAccepted === true ? "Status" : "Tolak"}
						</Button>
						<Button
							className="border-purple radius-primary bg-color-secondary"
							type="submit"
							onClick={(e) => { onAccept(e, true, false); handleShow() }}
							hidden={interest.isRejected === true || (interest.Product && interest.Product.isSold) === true ? true : false}
						>
							{interest.isAccepted === true ? "Hubungi di " : "Terima"}
						</Button>
					</div>
				</div>

				{/* Modal Terima */}
				<Modal show={show} onHide={handleClose} centered size="sm" dialogClassName="modal-30w">
					<div className="p-3">
						<Modal.Header closeButton className="border-0">
							<Modal.Title></Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<p className="fw-bold">Yeay kamu berhasil mendapat harga yang sesuai</p>
							<p className="text-black-50">Segera hubungi pembeli melalui whatsapp untuk transaksi selanjutnya</p>
							<div className="bg-color-grey radius-secondary p-2">
								<p className="text-center fw-bold">Product Match</p>
								<Stack className="mb-3" direction="horizontal" gap={3}>
									<img src={`${interest.User ? interest.User.picture : ""}`} alt="buyer"
										style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "12px" }} />
									<Stack>
										<p className="m-0 fw-bold">{interest.User && interest.User.name}</p>
										<p className="m-0 text-black-50">{interest.User && interest.User.city}</p>
									</Stack>
								</Stack>
								<Stack direction="horizontal" gap={3}>
									<img src={`${interest.Product ? interest.Product.picture : ""}`} alt="buyer"
										style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "12px" }} />
									<Stack>
										<p className="m-0">{interest.Product && interest.Product.name}</p>
										<p className="m-0 text-decoration-line-through">{CurrencyFormatter(interest.Product && interest.Product.price)}</p>
										<p className="m-0">Ditawar {CurrencyFormatter(interest.requestedPrice)}</p>
									</Stack>
								</Stack>
							</div>

						</Modal.Body>
						<Modal.Footer className="border-0">
							<Button
								type="submit"
								className="bg-color-primary w-100 radius-primary border-0">
								Hubungi via Whatsapp <FaWhatsapp />
							</Button>
						</Modal.Footer>
					</div>
				</Modal>


				{/* Modal status */}
				<Modal show={showStatus} onHide={handleCloseStatus} centered size="sm" dialogClassName="modal-30w">
					<div className="p-3">
						<Modal.Header closeButton className="border-0">
							<Modal.Title></Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<p className="fw-bold">Perbarui status penjualan produkmu</p>
							<Form>
								<div key={`radio`} onChange={selectedButton} className="mb-3">
									<Form.Check
										name="status"
										type="radio"
										id={`radio-1`}
										label={`Berhasil terjual`}
										value={true}
										onChange={selectedButtonSold}
										checked={selectedButtonSold === true}
									/>
									<p className=" text-black-50">Kamu telah sepakat menjual produk ini kepada pembeli</p>

									<Form.Check
										name="status"
										type="radio"
										label={`Batalkan transaksi`}
										id={`radio-2`}
										value={true}
										onChange={selectedButtonReject}
										checked={selectedButtonReject === false}
										
									/>
									<p className=" text-black-50">Kamu membatalkan transaksi produk ini dengan pembeli</p>
								</div>
							</Form>
						</Modal.Body>
						<Modal.Footer className="border-0">
							<Button
								className="bg-color-primary w-100 radius-primary border-0"
								onClick={(e) => {onChangeStatus(e); handleCloseStatus()}}
							>
								Kirim
							</Button>
						</Modal.Footer>
					</div>
				</Modal>
			</Container>
		</>
	);
}
